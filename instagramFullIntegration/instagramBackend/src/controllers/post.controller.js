import postModel from "../module/post.module.js";
import { uploadFile } from "../services/storage.service.js";

export const createPostController = async (req, res) => {
  try {
    const { caption, song, hashtags, location } = req.body;

    const userId = req.user.userId;

    const imageFiles = req.files?.images || [];
    const videoFiles = req.files?.videos || [];

    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await uploadFile(file.buffer, file.originalname);

        return {
          url: result.url,
          fileId: result.fileId,
        };
      }),
    );

    const uploadedVideos = await Promise.all(
      videoFiles.map(async (file) => {
        const result = await uploadFile(file.buffer, file.originalname);

        return {
          url: result.url,
          fileId: result.fileId,
        };
      }),
    );

    const post = await postModel.create({
      user: userId,
      caption,
      images: uploadedImages,
      videos: uploadedVideos,
      song,
      hashtags,
      location,
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log("Create Post Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const findAllPostController=async(req,res)=>{
    try {
        
        const post=await postModel.find()

        return res.status(200).json({
            message:"find all posts",
            data:post
        })

    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}


export const deletePostController=async(req,res)=>{
    try {
        
        const {id}=req.params

        const post=await postModel.findByIdAndDelete(id)


        return res.status(200).json({
            message:"post deleted succefully",
            data:post
        })


    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}