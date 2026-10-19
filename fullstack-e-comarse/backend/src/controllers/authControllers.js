import { decode } from "jsonwebtoken";
import userModel from "../../../../BasicEcomraseProjectWithFullIntegration/backend/src/modules/auth.module.js";
import authModel from "../modules/auth.module.js";
import {
  generateAccessToken,
  generateRefreshToken,
  readRefreshToken,
} from "../utils/auth.js";
import bycrpt from "bcryptjs";
export const authRegisterController = async (req, res) => {
  try {
    const { email, password, number, name,role } = req.body;

    const allReadyExistEmail = await authModel.findOne({ email });

    if (allReadyExistEmail) {
      return res.status(401).json({
        message: "email allready exist",
      });
    }

    const user = await authModel.create({
      name,
      email,
      number,
      role,
      password: await bycrpt.hash(password, 6),
    });

    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user._id,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await authModel.findByIdAndUpdate(user._id, { refreshToken });

    return res.status(201).json({
      message: "user register succesfully",
      data: {
        accessToken,
        user: {
          name: user.name,
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isValidPassword = await bycrpt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "password is wrong",
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await authModel.findOneAndUpdate({ email }, { refreshToken });

    return res.status(200).json({
      message: "user login succefully",
      data: {
        accessToken,
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          role:user.role
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const authRefreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(404).json({
      message: "refresh token not found",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);

    const { userId, role } = decoded;

    const user = await authModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (refreshToken !== user.refreshToken) {
      await authModel.findByIdAndUpdate(user._id, { refreshToken: null });

      return res.status(400).json({
        message: "refresh token mismatch",
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

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    await authModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    return res.status(200).json({
      message: "refresh token rotated",
      data: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const authMeController = async (req, res) => {
  try {
    const { userId, role } = req.user;

    const user = await authModel.findById(userId);

    return res.status(200).json({
      message: "user find succefully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const authLogoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "invalid refreshToken",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);
    const { userId } = decoded;
    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    await authModel.findByIdAndUpdate(user._id, { refreshToken: null });

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "user logOut succefully",
      data: {
        name: user.name,
        email: user.email,
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
