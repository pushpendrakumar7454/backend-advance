import storyModel from "../module/story.module.js";
import { uploadFile } from "../services/storage.service.js";




export const createStoryController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { mediaType } = req.body;

    const mediaFile = req.files?.media?.[0];
    const musicFile = req.files?.music?.[0];

    if (!mediaFile) {
      return res.status(400).json({
        message: "Story photo or video is required"
      });
    }

    if (!["image", "video"].includes(mediaType)) {
      return res.status(400).json({
        message: "Media type must be image or video"
      });
    }

    // Promise.all se parallel upload
    const [mediaResponse, musicResponse] = await Promise.all([
      uploadFile(mediaFile.buffer, mediaFile.originalname),

      musicFile
        ? uploadFile(musicFile.buffer, musicFile.originalname)
        : Promise.resolve(null)
    ]);

    const story = await storyModel.create({
      user: userId,
      media: mediaResponse.url,
      mediaType,

      music: musicResponse
        ? {
            url: musicResponse.url,
            title: req.body.musicTitle || null,
            artist: req.body.musicArtist || null,
            startTime: Number(req.body.startTime) || 0,
            duration: Number(req.body.duration) || 15
          }
        : undefined
    });

    return res.status(201).json({
      message: "Story created successfully",
      story
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating story",
      error: error.message
    });
  }
};
