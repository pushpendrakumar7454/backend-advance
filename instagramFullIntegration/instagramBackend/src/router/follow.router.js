import {Router} from 'express'
import { authenticate } from '../middleware/user.middleware.js'
import { followUserValidator,unfollowUserValidator } from '../validator/follow.validator.js'
import { followUserController, unfollowUserController } from '../controllers/follow.controller.js'


const router=Router()

router.post("/follow/:userId",authenticate,followUserValidator,followUserController)
router.delete("unfollow/:userId",authenticate,unfollowUserValidator,unfollowUserController)

export default router