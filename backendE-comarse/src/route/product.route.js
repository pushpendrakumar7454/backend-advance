import {Router} from 'express'
import { authenticate, selllerAuthencticate } from '../middleware/auth.middlerware.js';
import {upload} from '../config/multer.js'
import { createProductController } from '../controller/product.controller.js';
import {createProductValidator} from '../validator/product.validator.js'
const router=Router()


router.post("/",authenticate,selllerAuthencticate,upload.array("images"),(req,res,next)=>{
    ((req.body.price)=JSON.parse(req.body.price)),
    ((req.body.sizes))=JSON.parse(req.body.sizes),
    next()
},createProductValidator,createProductController)

export default router;