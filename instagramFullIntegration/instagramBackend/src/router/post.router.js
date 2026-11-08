import {Router} from 'express'
import { authenticate } from '../middleware/user.middleware.js'
import upload from '../app/config/multer.js'
import { createPostController } from '../controllers/post.controller.js'
import { createPostValidator } from '../validator/post.validator.js'

const router=Router()

router.post("/",authenticate,upload.array("images"),createPostValidator,createPostController)

export default router