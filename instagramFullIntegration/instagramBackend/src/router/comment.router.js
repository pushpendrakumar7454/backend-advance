import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import { createCommentController, deleteCommentConteroller, findCommentController } from '../controllers/comment.controller.js'

const router=Router()

router.post("/comment/:postId",authenticate,createCommentController)
router.get("/findcomment/:postId",authenticate,findCommentController)
router.delete("/deletecomment/:postId",authenticate,deleteCommentConteroller)

export default router