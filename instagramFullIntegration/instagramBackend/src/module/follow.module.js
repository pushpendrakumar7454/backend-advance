import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fullIntegretionInstagramusers",
      required: true,
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fullIntegretionInstagramusers",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("FullInstagramFollowModel", followSchema);

export default followModel;
