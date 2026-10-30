
import { Router } from "express";

import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";

import {
  authLoginController,
  authRefreshController,
  authRegisterController,
  authMeController,
  authLogoutController,
} from "../controllers/authControllers.js";

import { authenticate } from "../middleware/auth.middleware.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const router = Router();

// Normal authentication routes

router.post("/register", registerValidator, authRegisterController);
router.post("/login", loginValidator, authLoginController);
router.post("/refresh", authRefreshController);
router.get("/me", authenticate, authMeController);
router.post("/logout", authenticate, authLogoutController);

// Google OAuth route

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  })
);

// Google OAuth callback route

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://backend-advance.vercel.app/login",
  }),
  (req, res) => {
    try {
      const accessToken = jwt.sign(
        { userId: req.user._id },
        config.ACCEESS_TOKEN,
        { expiresIn: "15m" }
      );

      const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      };

      const params = new URLSearchParams({
        accessToken,
        user: JSON.stringify(user),
      });

      // Redirect to deployed frontend

      res.redirect(
        `https://backend-advance.vercel.app/google/callback?${params.toString()}`
      );

    } catch (error) {
      console.error("Google OAuth callback error:", error);

      res.redirect("https://backend-advance.vercel.app/login");
    }
  }
);

export default router;
