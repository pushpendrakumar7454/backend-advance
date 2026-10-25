import express from "express";
import messageModel from "../modules/message.module.js";

const router = express.Router();

router.get("/", async (req, res) => {
  
  try {
    const messages = await messageModel
      .find()
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});

export default router;