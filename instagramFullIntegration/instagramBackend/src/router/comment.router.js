import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import { createCommentController, findCommentController } from '../controllers/comment.controller.js'

const router=Router()

router.post("/comment/:postId",authenticate,createCommentController)
router.get("/find/:postId",authenticate,findCommentController)

export default router