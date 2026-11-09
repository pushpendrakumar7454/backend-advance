import mongoose from 'mongoose'

const commentSchema=new mongoose.Schema({
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


commentSchema.index({user:1,post:1},{unique:true})

const likeModel=mongoose.model("fullInstgramcommentModelMODELUSER",commentSchema)

export default likeModel

