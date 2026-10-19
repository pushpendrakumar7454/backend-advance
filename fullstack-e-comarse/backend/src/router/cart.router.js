import {Router} from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
import { addToCartController, getCartController, updateCartQunatityController,removeCartProductController } from '../controllers/cart.controller.js'
import { addToCartValidator } from '../validator/cart.validator.js'

const router = Router()

router.post("/add",authenticate,addToCartValidator,addToCartController)
router.get("/",authenticate,getCartController)
router.patch("/quantity",authenticate,updateCartQunatityController);
router.delete("/remove",authenticate,removeCartProductController)
export default router