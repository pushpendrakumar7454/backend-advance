import {Router} from 'express'
import { authenticate } from '../middleware/user.middleware.js'
import { followUserValidator,getFollowValidator,unfollowUserValidator } from '../validator/follow.validator.js'
import { followUserController, getFollowersController,getFollowingController, unfollowUserController } from '../controllers/follow.controller.js'


const router=Router()

router.post("/follow/:userId",authenticate,followUserValidator,followUserController)
router.delete("/unfollow/:userId",authenticate, unfollowUserValidator, unfollowUserController);
router.get("/getfollowers/:userId",authenticate,getFollowValidator,getFollowersController)
router.get("/getfollowing/:userId",authenticate,getFollowValidator,getFollowingController)


export default router