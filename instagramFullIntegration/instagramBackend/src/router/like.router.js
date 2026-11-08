import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import { likePostController } from '../controllers/like.controller.js'

const router=Router()

router.post("/like/:postId",authenticate,likePostController)

export default router