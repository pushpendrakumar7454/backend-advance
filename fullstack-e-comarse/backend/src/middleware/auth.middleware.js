import { readAccessToken } from "../utils/auth.js";

export const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        messae: "Authorization header not found",
      });
    }

    const accessToken = authorization.split(" ")[1];

    const decoded = readAccessToken(accessToken);

    if (!decoded) {
      return res.status(401).json({
        message: "invalid access token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "token expire",
    });
  }
};

export const sellerAuthencticate = async (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      messae: "user is not unauthorized to do this action",
    });
  }
  next();
};
