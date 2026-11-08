import likeModel from "../module/like.module.js"
import postModel from "../module/post.module.js"

export const likePostController=async(req,res)=>{
    try {

        const {postId}=req.params
        const userId=req.user.userId

        const post=await postModel.findOne({_id:postId,isDeleted:false})

        if(!post){
            return res.status(404).json({
                message:"post not found"
            })
        }

        const existingLike=await likeModel.findOne({user:userId,post:postId})

        if(existingLike){
            return res.status(400).json({
                message:"post allready liked"
            })
        }

        await likeModel.create({user:userId,post:postId})

        await postModel.findByIdAndUpdate(postId,{$inc:{likesCount:1}})

        return res.status(201).json({
            message:"post like successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}


export const unlikePostController=async(req,res)=>{
    try{
        
       const {postId}=req.params
       const userId=req.params.userId

       const post=await postModel.findOne({_id:postId,isDeleted:false})

       if(!post){
        return res.status(404).json({
            message:"post not found"
        })
       }

       const like=await likeModel.findOneAndDelete({user:userId,post:postId})

       if(!like){
        return res.status(401).json({
            message:"you have not liked this post"
        })
       }

       await postModel.findByIdAndUpdate(postId,{$inc:{likesCount:-1}})

       return res.status(200).json({
        message:"post unlikeSuccessfully"
       })

    }catch(error){
        return res.status(500).json({
            message:"internal server error"
        })
    }
}