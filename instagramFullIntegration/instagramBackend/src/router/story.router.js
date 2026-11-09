import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import upload from '../app/config/multer.js'
import { createStoryController } from '../controllers/story.controller.js'
import {createStoryValidator} from '../validator/story.validator.js'

const router=Router()

router.post("/create",authenticate,upload.fields([
    { name: "media", maxCount: 1 },
    { name: "music", maxCount: 1 }
  ]),createStoryValidator,createStoryController)

export default router