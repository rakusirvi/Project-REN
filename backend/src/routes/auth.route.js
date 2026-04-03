import { Router } from "express";
import {
  AdminLogin,
  AdminSignUP,
  ManagerAuthenticate,
  ManagerChangePassword,
  AdminVerify,
  refreshAccessToken,
  getMe,
} from "../controllers/auth.controller.js";

const AuthRoute = Router();

AuthRoute.post("/admin-signup", AdminSignUP);
AuthRoute.post("/admin-login", AdminLogin);
AuthRoute.post("/admin-verify", AdminVerify);

AuthRoute.get("/get-me", getMe);
AuthRoute.get("/reload-token", refreshAccessToken);

AuthRoute.post("/manager-authenticate", ManagerAuthenticate);
AuthRoute.post("/manager-change-password", ManagerChangePassword);

export default AuthRoute;
