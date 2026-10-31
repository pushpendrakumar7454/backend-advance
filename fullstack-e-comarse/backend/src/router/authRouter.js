
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
import {generateAccessToken,generateRefreshToken} from '../utils/auth.js'
const router = Router();

// Normal authentication routes

router.post("/register", registerValidator, authRegisterController);
router.post("/login", loginValidator, authLoginController);
router.post("/refresh", authRefreshController);
router.get("/me", authenticate, authMeController);
router.post("/logout", authenticate, authLogoutController);
router.get("/refresh-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Refresh route is working",
  });
});

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
  async (req, res) => {
    try {
      const user = req.user;

      // Generate Access Token
      const accessToken = generateAccessToken({
        userId: user._id,
        role: user.role,
      });

      // Generate Refresh Token
      const refreshToken = generateRefreshToken({
        userId: user._id,
        role: user.role,
      });

      // Save Refresh Token in MongoDB
      user.refreshToken = refreshToken;
      await user.save();

      // Set Refresh Token Cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      // Redirect to frontend
      const params = new URLSearchParams({
        accessToken,
        user: JSON.stringify({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      });

      return res.redirect(
        `https://backend-advance.vercel.app/google/callback?${params.toString()}`
      );

    } catch (error) {
      console.error("Google OAuth callback error:", error);

      return res.redirect(
        "https://backend-advance.vercel.app/login"
      );
    }
  }
);
export default router;
