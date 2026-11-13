import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import { likePostController,unlikePostController } from '../controllers/like.controller.js'

const router=Router()

router.post("/like/:postId",authenticate,likePostController)
router.delete("/unlike/:postId",authenticate,unlikePostController)

export default router