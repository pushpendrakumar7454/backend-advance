import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import { createCommentController, deleteCommentController, findCommentController, likeCommentController, updateCommentController,replyCommentController } from '../controllers/comment.controller.js'

const router=Router()

router.post("/comment/:postId",authenticate,createCommentController)
router.get("/findcomment/:postId",authenticate,findCommentController)
router.delete("/deletecomment/:commentId",authenticate,deleteCommentController)
router.post("/commentlike/:commentId",authenticate,likeCommentController)
router.put("/updatecomment/:commentId",authenticate,updateCommentController)
router.post("/replycomment/:commentId",authenticate,replyCommentController)


export default router