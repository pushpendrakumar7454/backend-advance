
import mongoose from "mongoose";

const purchasedProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fullStack-e-comarseProject",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const razorpaySchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    paymentId: {
      type: String,
    },

    signature: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authModelE-comarseProjectFull",
      required: true,
    },

    // Multiple products in one payment
    products: {
      type: [purchasedProductSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const razorpayModel = mongoose.model(
  "fullStackRazorpay",
  razorpaySchema
);

export default razorpayModel;
