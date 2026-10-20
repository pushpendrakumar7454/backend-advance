import {Server} from 'socket.io'
import { readAccessToken } from '../utils/auth.js';


const inisilizeServer=(httpServer)=>{
    const io=new Server(httpServer)

    io.use((socket,next)=>{
       const token = socket.handshake.headers?.authorization?.split(" ")[1];


       if(!token){
        return next(new Error("authenticate error"))
       }
       try {
        const decoded=readAccessToken(token,"access")
        socket.user=decoded
        next()
       } catch (error) {
        return next(new Error("authenticate error"))
       }
    
    })

    io.on("connection",(socket)=>{
        console.log("a user connected")

        socket.on("message",(msg)=>{
            socket.broadcast.emit("message",msg)
        })

        socket.on("disconnect",()=>{
            console.log("a user disconnected")
        })
    })
}


export default inisilizeServer