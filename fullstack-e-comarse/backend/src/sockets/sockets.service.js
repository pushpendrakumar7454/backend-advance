
import { Server } from "socket.io";
import { readAccessToken } from "../utils/auth.js";
import messageModel from "../modules/message.module.js";

const initializeServer = (httpServer) => {
  
  const io = new Server(httpServer);

  // Verify access token
  io.use((socket, next) => {
    const authorization =
      socket.handshake.headers?.authorization ||
      socket.handshake.auth?.token;

    const token = authorization?.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    try {
      const decoded = readAccessToken(token);

      socket.user = decoded;

      next();
    } catch (error) {
      next(new Error("Invalid or expired access token"));
    }
  });

  // Connection event
  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.userId);

    // Receive and save message
    socket.on("message", async (data, callback) => {
      try {
        const text =
          typeof data === "string" ? data : data?.message;

        if (typeof text !== "string" || !text.trim()) {
          return callback?.({
            success: false,
            message: "Message cannot be empty",
          });
        }

        // Save message in MongoDB
        const savedMessage = await messageModel.create({
          senderId: socket.user.userId,
          message: text.trim(),
        });

        // Send saved message to connected clients
        io.emit("message", savedMessage);

        callback?.({
          success: true,
          message: "Message saved successfully",
          data: savedMessage,
        });
      } catch (error) {
        console.error("Message save error:", error);

        callback?.({
          success: false,
          message: "Unable to save message",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.userId);
    });
  });

  return io;
};

export default initializeServer;
