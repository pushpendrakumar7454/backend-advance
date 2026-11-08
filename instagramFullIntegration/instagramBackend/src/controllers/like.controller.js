import likeModel from "../module/like.module.js"
import postModel from "../module/post.module.js"

export const likePostController=async(req,res)=>{
    try{
     
        const {postId}=req.params
        const userId=req.user.userId

        const post=await postModel.findOne({_id:postId,isDeleted:false})
        if(!post){
            return res.status(404).json({
                message:"post not found"
            })
        }

        const existingLike=await likeModel.findOne({post:postId,user:userId})

        if(existingLike){
            return res.status(401).json({
                message:"post allready liked"
            })
        }

        await likeModel.create({post:postId,user:userId})

        await postModel.findByIdAndUpdate(postId,{$inc:{likesCount:1}})

        return res.status(201).json({
            message:"post liked successfully"
        })

    }catch(error){
        return res.status(500).json({
            message:"internal server error"
        })
    }
}


export const unlikePostController=async(req,res)=>{
    try {
        
        const {postId}=req.params
        const userId=req.user.userId

        const post=await postModel.findOne({_id:postId,isDeleted:false})

        if(!post){
            return res.status(404).json({
                message:"post not found"
            })
        }

        const like=await likeModel.findOneAndDelete({user:userId,user:userId})

        if(!like){
            return res.status(400).json({
                message:"yo have not liked this post"
            })
        }

        await postModel.findByIdAndUpdate(postId,{$inc:{likesCount:-1}})

        return res.status(201).json({
            message:"post unlike successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}