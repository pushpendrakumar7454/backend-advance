import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fullIntegretionInstagramusers",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FullInstagramPostModel",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("FullInstagramCommentModel", commentSchema);

export default commentModel;
