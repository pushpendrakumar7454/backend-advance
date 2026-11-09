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




export const viewStoryController = async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.user.userId;

    const story = await storyModel.findById(storyId);

    if (!story) {
      return res.status(404).json({
        message: "Story not found"
      });
    }

    if (story.expiresAt <= new Date()) {
      return res.status(400).json({
        message: "Story has expired"
      });
    }

    const alreadyViewed = story.viewers.find(
      (viewer) => viewer.toString() === userId.toString()
    );

    if (alreadyViewed) {
      return res.status(200).json({
        message: "You have already viewed this story"
      });
    }

    story.viewers.push(userId);

    await story.save();

    return res.status(200).json({
      message: "Story viewed successfully",
      story
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export const getStoryViewersController=async(req,res)=>{
  try {
     
    const { storyId } = req.params;
    const userId = req.user.userId;

    const story=await storyModel.findById(storyId)

    if(!story){
      return res.status(404).json({
        message:"story not found"
      })
    }

    if(story.user.toString()!==userId.toString()){
       return res.status(403).json({
        message: "You are not allowed to see story viewers"
      });
    }

    const viewers=await storyModel.populate(
      story,
      {
        path:"viewers",
        select:"username profileImage"
      }
    )

    return res.status(200).json({
      message: "Story viewers fetched successfully",
      totalViewers: viewers.viewers.length,
      viewers: viewers.viewers
    })

  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })
  }
}


export const deleteStoryController=async(req,res)=>{
  try {
     
    const { storyId } = req.params;
    const userId = req.user.userId;

   const story = await storyModel.findById(storyId);

   if(!story){
    return res.status(404).json({
      message:"internal server error"
    })
   }


   //check the story is owner or not is current user
  
   if(story.user.toString()!==userId.toString()){
        return res.status(403).json({
        message: "You are not allowed to delete this story"
      });
   }

   await storyModel.findByIdAndDelete(storyId)

  return res.status(200).json({
      message: "Story deleted successfully"
    });


  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })
  }
}