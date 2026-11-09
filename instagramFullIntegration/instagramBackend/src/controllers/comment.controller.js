import commentModel from "../module/comment.module.js"
import postModel from "../module/post.module.js"

export const createCommentController=async(req,res)=>{
    try {
        
      const {postId}=req.params
      const userId=req.user.userId
      const {text}=req.body

      const post=await postModel.findOne({_id:postId,isDeleted:false})

      if(!post){
        return res.status(404).json({
            message:"post not found"
        })
      }

      const comment=await commentModel.create({
       user:userId,post:postId,text
      })

      await postModel.findByIdAndUpdate(postId,{$inc:{commentsCount: 1}})

      return res.status(201).json({
        message:"comment added successfully",
        comment
      })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}