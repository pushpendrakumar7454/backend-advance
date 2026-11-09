import {Router} from 'express'
import {authenticate} from '../middleware/user.middleware.js'
import upload from '../app/config/multer.js'
import { createStoryController, getAllStoriesController, getUserStoriesController, viewStoryController,getStoryViewersController } from '../controllers/story.controller.js'
import {createStoryValidator} from '../validator/story.validator.js'

const router=Router()

router.post("/create",authenticate,upload.fields([
    { name: "media", maxCount: 1 },
    { name: "music", maxCount: 1 }
  ]),createStoryValidator,createStoryController)

router.get("/all",authenticate,getAllStoriesController)
router.get("/getuser/:userId",authenticate,getUserStoriesController)
router.post("/view/:storyId",authenticate,viewStoryController);
router.get( "/viewers/:storyId",authenticate,getStoryViewersController);

export default router