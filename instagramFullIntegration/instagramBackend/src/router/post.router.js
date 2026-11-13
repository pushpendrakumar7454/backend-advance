import {Router} from 'express'
import { authenticate } from '../middleware/user.middleware.js'
import upload from '../app/config/multer.js'
import { createPostController,deletePostController, findAllPostController, getOnePostController, updatePostController } from '../controllers/post.controller.js'
import { createPostValidator } from '../validator/post.validator.js'

const router=Router()

router.post("/create",authenticate,upload.fields([
        { name: "images", maxCount: 10 },
        { name: "videos", maxCount: 5 }
    ]),createPostValidator,createPostController)

router.get("/find",findAllPostController)    
router.delete("/delete/:id",authenticate,deletePostController)
router.put(
    "/update/:id",
    authenticate,
    upload.fields([
        { name: "images", maxCount: 10 },
        { name: "videos", maxCount: 5 }
    ]),
    updatePostController
);
router.get("/findone/:id",authenticate,getOnePostController)

export default router