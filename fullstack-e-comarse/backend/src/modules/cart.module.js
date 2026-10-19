import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fullStack-e-comarseProject",
        required: true,
      },

      quantity: {
        type: Number,
        min: 1,
        default: 1,
      },

      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authModelE-comarseProjectFull",
    required: true,
  },
});

const cartModel = mongoose.model(
  "fullstackEecomarseCartModel",
  cartSchema
);

export default cartModel;