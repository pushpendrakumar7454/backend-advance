
import { Server } from "socket.io";
import {readAccessToken} from '../utils/auth.js'

const initializeServer= (httpServer) => {
  const io = new Server(httpServer);

  io.use((socket,next)=>{
    const token=socket.handshake.headers?.authorization?.split(" ")[1]

    if(!token){
        return next(new Error("authenticated error"))
    }
    try {
        const decoded=readAccessToken(token,'access')
        socket.user=decoded
        next()
    } catch (error) {
        return next(new Error("authencticated error"))
    }
  })

  // Connection event
  io.on("connection", (socket) => {
    console.log("A user is connected:", socket.id);

    socket.on("message",(msg)=>{
    socket.broadcast.emit('message',msg)
    })

    
    socket.on("disconnect", () => {
      console.log("A user is disconnected:", socket.id);
    });
  });

  return io;
};

export default initializeServer;







