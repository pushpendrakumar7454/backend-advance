import app from "./app/app.js";
import connectDb from "./config/db.js";
import {createServer} from 'node:http'
import inisilizeServer from "./sockets/sockets.service.js";


await connectDb()
const htttpServer=createServer(app)
inisilizeServer(htttpServer)
htttpServer.listen(3000,()=>{
    console.log(`server is running on port 3000`)
})