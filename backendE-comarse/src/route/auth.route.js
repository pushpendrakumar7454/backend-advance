import {Router} from 'express'
import { authLoginValidator, authRegisterValidator } from '../validator/auth.validator.js'
import { authLoginController, authLogoutController, authMeConteroller, authRefreshConteroller, authRegisterController } from '../controller/auth.controller.js'
import { authenticate } from '../middleware/auth.middlerware.js'

const router=Router()

router.post("/register",authRegisterValidator,authRegisterController)
router.post("/login",authLoginValidator,authLoginController)
router.post("/refresh",authenticate,authRefreshConteroller)
router.get("/me",authenticate,authMeConteroller)
router.post("/logout",authenticate,authLogoutController)

export default router