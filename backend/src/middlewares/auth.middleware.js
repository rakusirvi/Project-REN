import config from "../config/env.config.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
