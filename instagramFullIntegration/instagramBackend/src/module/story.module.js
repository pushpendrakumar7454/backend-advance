import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "",
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["images", "videos"],
      requred: true,
    },
    music: {
      url: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        default: null,
      },
      artist: {
        type: String,
        default: null,
      },
      startTime: {
        type: Number,
        default: 0,
      },
      duration: {
        type: Number,
        default: 60,
      },
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fullIntegretionInstagramusers",
      },
    ],
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true },
);

storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const storyModel = mongoose.model("FullInstagramStoryModel", storySchema);

export default storyModel;
