import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 500,
    },
    images: {
      type: [{ type: String }],
      validate: {
        validator: (images) => images.length <= 5,
        message: "images contaion at least 5 images",
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
      },
    },
    sizes: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "L", "XL", "M", "XL", "XXL"],
        },
        stock: {
          type: Number,
          min: 0,
          default: 0,
        },
      },
    ],
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "authModelE-comarseProjectFull",
    },
    publiashed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model(
  "fullStack-e-comarseProject",
  productSchema,
);

export default productModel;
