import { Router } from "express";
import productModel from "../modules/product.module.js";
import razorpayInstance from "../config/razorpay.js";
import razorpayModel from "../modules/razorpay.module.js";
import {
  validatePaymentVerification,
} from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";
import { authenticate } from "../middleware/auth.middleware.js";

// Is import path ko apne actual middleware path se match karo.


const router = Router();

// Create Razorpay order
router.post("/:productId/order", authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user?.userId;

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

    if (
      !product.price ||
      typeof product.price.amount !== "number" ||
      !Number.isFinite(product.price.amount) ||
      product.price.amount <= 0 ||
      !product.price.currency
    ) {
      return res.status(400).json({
        message: "Product price or currency is invalid",
      });
    }

    // Razorpay amount paise mein leta hai.
    const order = await razorpayInstance.orders.create({
      amount: Math.round(product.price.amount * 100),
      currency: product.price.currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId: String(product._id),
        productTitle: product.title || "Product",
      },
    });

    // Pending payment record database mein save karo.
    const payment = await razorpayModel.create({
      orderId: order.id,
      user: userId,
      product: product._id,
      amount: product.price.amount,
      currency: product.price.currency,
      status: "pending",
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
      payment,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
});

// Verify Razorpay payment
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

    // Order isi logged-in user ka hona chahiye.
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

    // Already completed payment ko dobara process mat karo.
    if (existingPayment.status === "completed") {
      return res.status(200).json({
        status: true,
        message: "Payment already verified",
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

// Logged-in user ke orders fetch karo
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
      .populate("product")
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