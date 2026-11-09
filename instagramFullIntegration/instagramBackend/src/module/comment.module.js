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
        comment: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "fullIntegretionInstagramusers",
            }
        ],
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FullInstagramCommentModel",
            default: null,
        },
    },
    { timestamps: true }
);

const commentModel = mongoose.model(
    "FullInstagramCommentModel",
    commentSchema
);

export default commentModel;