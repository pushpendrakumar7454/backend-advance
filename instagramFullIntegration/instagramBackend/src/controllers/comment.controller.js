import commentModel from "../module/comment.module.js";
import postModel from "../module/post.module.js";

export const createCommentController = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;
    const { comment } = req.body;

    const post = await postModel.findOne({ _id: postId, isDeleted: false });

    if (!post) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    const comments = await commentModel.create({
      user: userId,
      post: postId,
      comment,
    });

    await postModel.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    return res.status(201).json({
      message: "comment added successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const findCommentController = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await commentModel
      .find({
        post: postId,
      })
      .populate("user", "username profileImage");

    return res.status(200).json({
      message: "post fetched successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    const comment = await commentModel.findOneAndDelete({
      _id: commentId,
      user: userId,
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    await postModel.findByIdAndUpdate(comment.post, {
      $inc: { commentsCount: -1 },
    });

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log("Delete Comment Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const likeCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const allreadyLiked = comment.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    if (allreadyLiked) {
      await commentModel.findByIdAndUpdate(commentId, {
        $pull: { likes: userId },
      });

      return res.status(200).json({
        message: "comment unliked successfully",
      });
    }

    await commentModel.findByIdAndUpdate(commentId, {
      $addToSet: { likes: userId },
    });

    return res.status(200).json({
      message: "comment liked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};


export const updateCommentController=async(req,res)=>{
    try {
        
        const { commentId } = req.params;
        const userId = req.user.userId;
        const { comment } = req.body;

        const updatedComment=await commentModel.findOneAndUpdate({_id:commentId,user:userId},{comment},{new:true,runValidators:true})


          if (!updatedComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

         return res.status(200).json({
            message: "Comment updated successfully",
            updatedComment
        });



    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}