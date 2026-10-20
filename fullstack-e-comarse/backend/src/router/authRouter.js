import {Router} from 'express'
import { loginValidator, registerValidator } from '../validator/auth.validator.js'
import { authLoginController, authRefreshController, authRegisterController,authMeController, authLogoutController } from '../controllers/authControllers.js'
import { authenticate } from '../middleware/auth.middleware.js'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

const router=Router()

router.post("/register",registerValidator,authRegisterController)
router.post("/login",loginValidator,authLoginController)
router.post("/refresh",authRefreshController)
router.get("/me",authenticate,authMeController)
router.post("/logout",authenticate,authLogoutController)



//google route

router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
    session:false,
    prompt:"select_account"
}))


router.get("/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"http://localhost:5173/login"
}),
  (req,res)=>{
    try {
        const accessToken=jwt.sign({userId:req.user._id},config.ACCEESS_TOKEN,{expiresIn:"15m"})
        const user={
            _id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }

        const params=new URLSearchParams({
            accessToken,
            user:JSON.stringify(user)
        })

        res.redirect(`http://localhost:5173/google/callback?${params.toString()}`)
    } catch (error) {
        res.redirect("http://localhost:5173/login")
    }
  }
)

export default router