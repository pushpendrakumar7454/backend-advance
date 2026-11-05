import { verifyAccessToken } from "../utils/auth.utils.js";

export const authenticate = async (req, res) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        messages: "Authorization header not found",
      });
    }

    const accessToken = authorization.split(" ")[1];

    const decoded = verifyAccessToken(accessToken);

    if (!decoded) {
      return res.status(401).json({
        message: "invalid access token",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      messages: "refresh token expire",
    });
  }
};
