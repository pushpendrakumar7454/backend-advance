import {Router} from 'express'
import { authRegisterValidator } from '../validator/auth.validator.js'
import { authRegisterController } from '../controller/auth.controller.js'

const router=Router()

router.post("/register",authRegisterValidator,authRegisterController)

export default router