import {Router} from 'express'
import { authLoginValidator, authRegisterValidator } from '../validator/auth.validator.js'
import { authLoginController, authRegisterController } from '../controller/auth.controller.js'

const router=Router()

router.post("/register",authRegisterValidator,authRegisterController)
router.post("/login",authLoginValidator,authLoginController)

export default router