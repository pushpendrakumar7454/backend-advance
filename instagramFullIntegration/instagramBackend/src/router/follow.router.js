import {Router} from 'express'
import { authenticate } from '../middleware/user.middleware.js'
import { followUserValidator } from '../validator/follow.validator.js'
import { followUserController } from '../controllers/follow.controller.js'


const router=Router()

router.post("/follow/:userId",authenticate,followUserValidator,followUserController)

export default router