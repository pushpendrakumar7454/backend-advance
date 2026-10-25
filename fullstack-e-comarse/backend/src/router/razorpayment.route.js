
import { Router } from "express";
import productModel from "../modules/product.module.js";
import cartModel from "../modules/cart.module.js";
import razorpayInstance from "../config/razorpay.js";
import razorpayModel from "../modules/razorpay.module.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// 1. CART ORDER
// Important: Keep this route before /:productId/order
router.post("/cart/order", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    let totalAmount = 0;
    let currency = null;
    const purchasedProducts = [];

    for (const item of cart.products) {
      const product = item.product;
      const quantity = Number(item.quantity);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "A product in your cart no longer exists",
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      const price = Number(product.price?.amount);
      const productCurrency = product.price?.currency || "INR";

      if (!Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid price for ${product.title || "product"}`,
        });
      }

      if (currency && currency !== productCurrency) {
        return res.status(400).json({
          success: false,
          message: "All cart products must use the same currency",
        });
      }

      currency = productCurrency;
      totalAmount += price * quantity;

      purchasedProducts.push({
        product: product._id,
        quantity,
        price,
      });
    }

    // Razorpay expects the amount in the currency's smallest unit.
    // For INR, 1 rupee = 100 paise.

    const amountInPaise = Math.round(totalAmount * 100);

    
    if (!Number.isSafeInteger(amountInPaise) || amountInPaise < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `cart_${Date.now()}`,
      notes: {
        userId: String(userId),
        itemCount: String(purchasedProducts.length),
        orderType: "cart",
      },
    });

    const payment = await razorpayModel.create({
      orderId: order.id,
      user: userId,
      products: purchasedProducts,
      amount: amountInPaise,
      currency,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Cart order created successfully",
      order,
      payment,
    });
  } catch (error) {
    console.error("Create cart order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create cart order",
      error: error.message,
    });
  }
});


// 2. SINGLE PRODUCT ORDER
router.post("/:productId/order", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;
    const quantity = Number(req.body?.quantity ?? 1);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    if (!/^[a-fA-F0-9]{24}$/.test(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid product quantity",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const price = Number(product.price?.amount);
    const currency = product.price?.currency || "INR";

    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product price",
      });
    }

    const totalAmount = price * quantity;
    const amountInPaise = Math.round(totalAmount * 100);

    if (!Number.isSafeInteger(amountInPaise) || amountInPaise < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `product_${Date.now()}`,
      notes: {
        userId: String(userId),
        itemCount: "1",
        orderType: "product",
      },
    });

    const payment = await razorpayModel.create({
      orderId: order.id,
      user: userId,
      products: [
        {
          product: product._id,
          quantity,
          price,
        },
      ],
      amount: amountInPaise,
      currency,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Product order created successfully",
      order,
      payment,
    });
  } catch (error) {
    console.error("Create product order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product order",
      error: error.message,
    });
  }
});


// 3. VERIFY PAYMENT
router.post("/verify", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are missing",
      });
    }

    // Find the order belonging to the logged-in user.
    const savedPayment = await razorpayModel.findOne({
      orderId: razorpay_order_id,
      user: userId,
    });

    if (!savedPayment) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Verify Razorpay signature.
    const isSignatureValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      config.RAZORPAY_KEY_SECRET
    );

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Fetch payment details directly from Razorpay.
    const razorpayPayment =
      await razorpayInstance.payments.fetch(razorpay_payment_id);

    if (razorpayPayment.order_id !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Payment does not match this order",
      });
    }

    if (razorpayPayment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message: "Payment has not been captured yet",
        paymentStatus: razorpayPayment.status,
      });
    }

    if (
      Number(razorpayPayment.amount) !== Number(savedPayment.amount) ||
      razorpayPayment.currency !== savedPayment.currency
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment amount or currency does not match",
      });
    }

    // Update the database only after successful verification.
    savedPayment.status = "completed";
    savedPayment.paymentId = razorpay_payment_id;
    savedPayment.signature = razorpay_signature;

    await savedPayment.save();

    // Read the original order notes to determine whether it was
    // created from the cart.
    const razorpayOrder =
      await razorpayInstance.orders.fetch(razorpay_order_id);

    const isCartOrder =
      razorpayOrder.notes?.orderType === "cart";

    if (isCartOrder) {
      await cartModel.findOneAndUpdate(
        { user: userId },
        { $set: { products: [] } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
});


// 4. GET MY ORDERS
router.get("/my-orders", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const orders = await razorpayModel
      .find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch my orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

export default router;
