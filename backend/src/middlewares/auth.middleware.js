import config from "../config/env.config.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    // If the token is expired, send 401 so the frontend knows to call /ReloadToken
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired", code: "TOKEN_EXPIRED" });
    }

    console.log("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
