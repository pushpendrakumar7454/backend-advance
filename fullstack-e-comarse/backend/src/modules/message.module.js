
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("ChatMessage", messageSchema);

export default messageModel;
