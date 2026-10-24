
import { Router } from "express";
import productModel from "../modules/product.module.js";
import cartModel from "../modules/cart.module.js";
import razorpayInstance from "../config/razorpay.js";
import razorpayModel from "../modules/razorpay.module.js";
import {
  validatePaymentVerification,
} from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();


router.post("/:productId/order", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const quantity = Number(req.body?.quantity || 1);
    const price = product.price?.amount;
    const currency = product.price?.currency;

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
      return res.status(400).json({
        message: "Invalid quantity",
      });
    }

    if (
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !currency
    ) {
      return res.status(400).json({
        message: "Invalid product price",
      });
    }

    const amountInPaise = Math.round(price * quantity * 100);

    if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({
        message: "Invalid order amount",
      });
    }

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `buy_${Date.now()}`,
      notes: {
        userId: String(userId),
        productId: String(product._id),
        quantity: String(quantity),
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
      message: "Payment order created successfully",
      order,
      payment,
    });
  } catch (error) {
    console.error("Create product order error:", error);

    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
});

// ============================================
// 2. CART CHECKOUT - ALL CART PRODUCTS
// POST /api/payment/cart/order
// ============================================
router.post("/cart/order", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    const purchasedProducts = [];
    let totalAmount = 0;
    let currency = "";

    for (const item of cart.products) {
      const product = item.product;
      const quantity = Number(item.quantity);

      if (!product) {
        return res.status(400).json({
          message: "A product in your cart was not found",
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: "Invalid product quantity",
        });
      }

      const price = product.price?.amount;
      const productCurrency = product.price?.currency;

      if (
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !productCurrency
      ) {
        return res.status(400).json({
          message: `Invalid price for ${product.title || "a product"}`,
        });
      }

      if (!currency) {
        currency = productCurrency;
      } else if (currency !== productCurrency) {
        return res.status(400).json({
          message: "All cart products must use the same currency",
        });
      }

      purchasedProducts.push({
        product: product._id,
        quantity,
        price,
      });

      totalAmount += price * quantity;
    }

    const amountInPaise = Math.round(totalAmount * 100);

    if (!Number.isSafeInteger(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({
        message: "Invalid total amount",
      });
    }

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `cart_${Date.now()}`,
      notes: {
        userId: String(userId),
        itemCount: String(purchasedProducts.length),
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
      message: "Cart payment order created successfully",
      order,
      payment,
    });
  } catch (error) {
    console.error("Create cart order error:", error);

    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
});

// ============================================
// 3. VERIFY PAYMENT
// POST /api/payment/verify
// ============================================
router.post("/verify", authenticate, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "Please login first",
      });
    }

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        status: false,
        message: "Payment details are required",
      });
    }

    const existingPayment = await razorpayModel.findOne({
      orderId: razorpay_order_id,
      user: userId,
    });

    if (!existingPayment) {
      return res.status(404).json({
        status: false,
        message: "Payment order not found",
      });
    }

    if (existingPayment.status === "completed") {
      return res.status(200).json({
        status: true,
        message: "Payment already verified",
        payment: existingPayment,
      });
    }

    const isValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      config.RAZORPAY_KEY_SECRET
    );

    if (!isValid) {
      return res.status(400).json({
        status: false,
        message: "Invalid payment signature",
      });
    }

    const razorpayPayment =
      await razorpayInstance.payments.fetch(razorpay_payment_id);

    if (
      razorpayPayment.order_id !== razorpay_order_id ||
      razorpayPayment.status !== "captured" ||
      razorpayPayment.amount !== existingPayment.amount ||
      razorpayPayment.currency !== existingPayment.currency
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Payment is not captured or payment details do not match",
      });
    }

    const payment = await razorpayModel.findOneAndUpdate(
      {
        orderId: razorpay_order_id,
        user: userId,
        status: "pending",
      },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "completed",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!payment) {
      return res.status(409).json({
        status: false,
        message: "Payment record could not be updated",
      });
    }

    // Clear cart only if this was a cart checkout.
    // Do not clear cart after buying a single product.
    const isCartOrder = razorpayPayment.notes?.itemCount !== undefined;

    if (isCartOrder) {
      await cartModel.findOneAndUpdate(
        { user: userId },
        { $set: { products: [] } }
      );
    }

    return res.status(200).json({
      status: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      status: false,
      message: "Unable to verify payment",
    });
  }
});

// ============================================
// 4. MY ORDERS
// GET /api/payment/my-orders
// ============================================
router.get("/my-orders", authenticate, async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
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
    console.error("Fetch orders error:", error);

    return res.status(500).json({
      message: "Unable to fetch orders",
    });
  }
});

export default router;
