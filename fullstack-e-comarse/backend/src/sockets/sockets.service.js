import { Server } from "socket.io";
import { readAccessToken } from "../utils/auth.js";
import messageModel from "../modules/message.module.js";

const initializeServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://backend-advance.vercel.app",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Authenticate socket connection
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization
          ?.replace("Bearer ", "");

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = readAccessToken(token);

      const userId =
        decoded.userId ||
        decoded.id ||
        decoded._id;

      if (!userId) {
        return next(new Error("Invalid token payload"));
      }

      socket.user = {
        userId: String(userId),
        role: decoded.role,
      };

      next();
    } catch (error) {
      console.error("Socket authentication error:", error.message);

      next(new Error("Invalid or expired access token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.userId);

    // Receive and save message
    socket.on("message", async (data, callback) => {
      try {
        const text =
          typeof data === "string"
            ? data
            : data?.message;

        if (
          typeof text !== "string" ||
          !text.trim()
        ) {
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

        // Broadcast saved message to all connected clients
        io.emit("message", savedMessage);

        // Send acknowledgement to sender
        return callback?.({
          success: true,
          message: "Message saved successfully",
          data: savedMessage,
        });
      } catch (error) {
        console.error("Message save error:", error);

        return callback?.({
          success: false,
          message: "Unable to save message",
        });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(
        "User disconnected:",
        socket.user.userId,
        reason
      );
    });
  });

  return io;
};

export default initializeServer;