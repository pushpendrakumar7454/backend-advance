import express from 'express'
import { loginvalidator, registerValidator } from '../validator/auth.validator.js'
import { authLoginController, authLogoutController, authMeController, authRefreshController, authRegisterController } from '../controllers/user.controllers.js'
import { authenticate } from '../middleware/user.middleware.js'

const router = express.Router()


router.post("/register",registerValidator,authRegisterController)
router.post("/login",loginvalidator,authLoginController)
router.post("/refresh",authRefreshController)
router.get("/me",authenticate,authMeController)
router.post("/logout",authenticate,authLogoutController)

export default router