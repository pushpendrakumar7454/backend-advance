import mongoose from "mongoose";

const hashTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  posts: [
    {
      type: mongoose.Types.Schema.objectId,
      ref: "fullInstagramPostModel",
    },
  ],

  postCount:{
    type:Number,
    default:0
  }
},{timestamps:true});

const hashTagModel=mongoose.model("FullInstagramhashTagModel",hashTagSchema)
export default hashTagModel
