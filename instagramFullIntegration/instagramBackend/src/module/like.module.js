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
})


const likeModel=mongoose.model("fullInstagramModelLikeMODEL",likeSchema)

export default likeModel