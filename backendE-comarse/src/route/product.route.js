
import { Router } from 'express'
import { authenticate, selllerAuthencticate,parseProductData } from '../middleware/auth.middlerware.js'
import upload from '../config/multer.js'
import {
    createProductController,
    updateProductController
} from '../controller/product.controller.js'
import { createProductValidator } from '../validator/product.validator.js'

const router = Router()



router.post(
    "/",
    authenticate,
    selllerAuthencticate,
    upload.array("images"),
    parseProductData,
    createProductValidator,
    createProductController
)


router.put(
    "/update/:id",
    authenticate,
    selllerAuthencticate,
    upload.array("images"),
    parseProductData,
    updateProductController
)

export default router
