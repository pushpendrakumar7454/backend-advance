import mongoose from "mongoose";

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fullIntegretionInstagramusers",
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FullInstagramPostM<odel",
        required:true
    }
},{timestamps:true})

likeSchema.index({ user: 1, post: 1 }, { unique: true });

const likeModel = mongoose.model("FullInstagramLIKELikeModel", likeSchema);

export default likeModel;