
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
      console.log("Google callback executed");

      const user = req.user;

      console.log("User found:", !!user);
      console.log("User ID:", user?._id);

      if (!user) {
        return res.status(401).json({
          message: "Google user not found",
        });
      }

      const accessToken = generateAccessToken({
        userId: user._id,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        userId: user._id,
        role: user.role,
      });

      console.log("Access token generated:", !!accessToken);
      console.log("Refresh token generated:", !!refreshToken);

      user.refreshToken = refreshToken;

      await user.save();

      console.log(
        "Refresh token saved in DB:",
        !!user.refreshToken
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      console.log("Refresh cookie set");

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
      console.error("GOOGLE CALLBACK ERROR:", error);

      return res.redirect(
        "https://backend-advance.vercel.app/login"
      );
    }
  }
);
export default router;
