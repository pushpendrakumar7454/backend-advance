import commentModel from "../module/comment.module.js"
import postModel from "../module/post.module.js"

export const createCommentController=async(req,res)=>{
    try {
        
      const {postId}=req.params
      const userId=req.user.userId
      const {comment}=req.body

      const post=await postModel.findOne({_id:postId,isDeleted:false})

      if(!post){
        return res.status(404).json({
            message:"post not found"
        })
      }

      const comments=await commentModel.create({
       user:userId,post:postId,comment
      })

      await postModel.findByIdAndUpdate(postId,{$inc:{commentsCount: 1}})

      return res.status(201).json({
        message:"comment added successfully",
        comments
      })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

export const findCommentController=async(req,res)=>{
    try {
        
    const {postId}=req.params

    const post=await commentModel.find({
        post:postId
    }).populate("user","username profileImage")


    return res.status(200).json({
        message:"post fetched successfully",
        post
    })
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}
