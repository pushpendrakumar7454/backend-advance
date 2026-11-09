import upload from "../app/config/multer.js";
import followModel from "../module/follow.module.js";
import storyModel from "../module/story.module.js";
import { uploadFile } from "../services/storage.service.js";


export const createStoryController=async(req,res)=>{
  try {
    
   const userId=req.user.userId
   const {mediaType}=req.body

   const mediaFile=req.files?.media?.[0]
   const musicFile=req.files?.music?.[0]

   if(!mediaFile){
    return res.status(400).json({
       message: "Story photo or video is required"
    })
   }

  if(!["image","video"].includes(mediaType)){
    return res.status(400).json({
      message:"Media type must be image or video"
    })
  }

  //promise.all

   const [mediaResponse,musicResponse]=await Promise.all([
    uploadFile(mediaFile.buffer,mediaFile.originalname),
     
    musicFile?uploadFile(musicFile.buffer,musicFile.originalname):Promise.resolve(null)
   ]);


   const story=await storyModel.create({
    user:userId,
    media:mediaResponse.url,
    mediaType,
    music:musicResponse?{
            url: musicResponse.url,
            title: req.body.musicTitle || null,
            artist: req.body.musicArtist || null,
            startTime: Number(req.body.startTime) || 0,
            duration: Number(req.body.duration) || 15
          }:undefined
   })
   
   return res.status(201).json({
    message:"story created successfully",
    story
   })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"internal server error"
    })
  }
}




export const getAllStoriesController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const following = await followModel.find({
      follower: userId
    });

    const userIds = [userId];

    for (let i = 0; i < following.length; i++) {
      userIds.push(following[i].following);
    }

    const stories = await storyModel.find({
      user: { $in: userIds }
    }).populate("user", "username profileImage");

    return res.status(200).json({
      message: "All stories fetched successfully",
      totalStories: stories.length,
      stories
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching stories",
      error: error.message
    });
  }
};



export const getUserStoriesController = async (req, res) => {
  try {
    const { userId } = req.params;

    const stories = await storyModel.find({
      user: userId
    }).sort({ createdAt: -1 });


    return res.status(200).json({
      message: "User stories fetched successfully",
      totalStories: stories.length,
      stories
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


export const viewStoryController=async(req,res)=>{
  try {
    
   const { storyId } = req.params;
   const userId = req.user.userId;

  const story=await storyModel.findOneAndUpdate({_id:storyId,expiresAt:{$gt:new Date()},viewers:{$ne:userId}},{$addToSet:{viewers:userId}},{returnDocument: "after"})

  if(!story){
    const existingStory=await storyModel.findById(storyId)
    if(!existingStory){
      return res.status(404).json({
        message:"story not found"
      })
    }

    if(existingStory.expiresAt<=new Date()){
      return res.status(400).json({
        message:"story expire"
      })
    }

    return res.status(200).json({
      message:"you allredy viewed this story"
    })
  }

    return res.status(200).json({
      message: "Story viewed successfully",
      story
    });



  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })
  }
}