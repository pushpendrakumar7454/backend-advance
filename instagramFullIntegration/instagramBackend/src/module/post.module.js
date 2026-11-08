import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fullIntegretionInstagramusers",
      required: true,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 2200,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        fileId: String,
      },
    ],

    videos: [
      {
        url: String,
        fileId: String,
      },
    ],

    song: {
      title: String,
      artist: String,
      audioUrl: String,
      duration: Number,
      startTime: {
        type: Number,
        default: 0,
      },
    },

    hashtags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    location: {
      name: String,
      latitude: Number,
      longitude: Number,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("FullInstagramPostM<odel", postSchema);

export default postModel;