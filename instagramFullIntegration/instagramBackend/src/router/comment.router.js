import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import { createCommentController } from '../controllers/comment.controller.js'

const router=Router()

router.post("/comment/:postId",authenticate,createCommentController)

export default router