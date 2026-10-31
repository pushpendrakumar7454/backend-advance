
import authModel from "../modules/auth.module.js";
import {
    generateAccessToken,
    generateRefreshToken,
    readRefreshToken,
} from "../utils/auth.js";

import bcrypt from "bcryptjs";

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
};

// REGISTER
export const authRegisterController = async (req, res) => {
    try {
        const { email, password, number, name, role } = req.body;

        const alreadyExistEmail = await authModel.findOne({ email });

        if (alreadyExistEmail) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authModel.create({
            name,
            email,
            number,
            role,
            password: hashedPassword,
        });

        const accessToken = generateAccessToken({
            userId: user._id,
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            userId: user._id,
            role: user.role,
        });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.log("Register Error:", error.message);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


// LOGIN
export const authLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Password is wrong",
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

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(200).json({
            message: "User login successfully",
            data: {
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.log("Login Error:", error.message);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


// REFRESH TOKEN
export const authRefreshController = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        console.log("Refresh cookie received:", !!refreshToken);

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token not found",
            });
        }

        const decoded = readRefreshToken(refreshToken);
        const { userId } = decoded;

        const user = await authModel.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        if (refreshToken !== user.refreshToken) {
            console.log("Refresh token mismatch");

            return res.status(401).json({
                message: "Refresh token mismatch",
            });
        }

        const accessToken = generateAccessToken({
            userId: user._id,
            role: user.role,
        });

        const newRefreshToken = generateRefreshToken({
            userId: user._id,
            role: user.role,
        });

        // Save new refresh token first
        user.refreshToken = newRefreshToken;
        await user.save();

        // Then update browser cookie
        res.cookie(
            "refreshToken",
            newRefreshToken,
            cookieOptions
        );

        return res.status(200).json({
            message: "Refresh token rotated successfully",
            accessToken,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.log("Refresh Error:", error.message);

        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }
};


// GET CURRENT USER
export const authMeController = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await authModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User found successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.log("Me Error:", error.message);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


// LOGOUT
export const authLogoutController = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            try {
                const decoded = readRefreshToken(refreshToken);

                const user = await authModel.findById(decoded.userId);

                // Clear DB token only if it matches this browser's token
                if (user && user.refreshToken === refreshToken) {
                    user.refreshToken = null;
                    await user.save();
                }
            } catch (error) {
                console.log("Logout token error:", error.message);
            }
        }

        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log("Logout Error:", error.message);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
