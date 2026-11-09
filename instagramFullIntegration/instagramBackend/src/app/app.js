import express from "express"
import userRouter from "../router/user.router.js"
import cookieParser from "cookie-parser"
import postRouter from '../router/post.router.js'
import likeRouter from '../router/like.router.js'
import commentRouter from '../router/comment.router.js'

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", userRouter)
app.use("/api/post",postRouter)
app.use("/api/post",likeRouter)
app.use("/api/post",commentRouter)

export default app