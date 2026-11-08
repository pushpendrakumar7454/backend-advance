import {Router} from 'express'
import { authenticate } from '../middleware/user.middleware.js'
import upload from '../app/config/multer.js'
import { createPostController, findAllPostController } from '../controllers/post.controller.js'
import { createPostValidator } from '../validator/post.validator.js'

const router=Router()

router.post("/create",authenticate,upload.fields([
        { name: "images", maxCount: 10 },
        { name: "videos", maxCount: 5 }
    ]),createPostValidator,createPostController)

router.get("/find",findAllPostController)    

export default router