
import { Router } from "express";
import productModel from "../modules/product.module.js";
import razorpayInstance from "../config/razorpay.js";
import razorpayModel from "../modules/razorpay.module.js";
import {
  validatePaymentVerification,
} from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";

const router = Router();

// Create Order
router.post("/:productId/order", async (req, res) => {
  try {
    const { productId } = req.params;

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
        message: "Product price and currency are invalid",
      });
    }

    const order = await razorpayInstance.orders.create({
      amount: Math.round(product.price.amount * 100),
      currency: product.price.currency,
      receipt: `order_rcptid_${productId}`,
      notes: {
        productId: productId,
        productTitle: product.title,
      },
    });

    const payment = await razorpayModel.create({
      orderId: order.id,
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
      message: "Internal server error",
    });
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment details are required",
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
      },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "completed",
      },
      {
        new: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found",
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
      message: "Internal server error",
    });
  }
});

export default router;
