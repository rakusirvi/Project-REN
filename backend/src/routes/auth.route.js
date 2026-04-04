import { Router } from "express";
import {
  AdminLogin,
  AdminSignUP,
  ManagerAuthenticate,
  ManagerSetPassword,
  AdminAuthenticate,
  ReloadToken,
  getMe,
  ManagerLogin,
} from "../controllers/auth.controller.js";

const AuthRoute = Router();

// Admin
AuthRoute.post("/admin-signup", AdminSignUP);
AuthRoute.post("/admin-login", AdminLogin);
AuthRoute.post("/admin-authenticate", AdminAuthenticate);

// All
AuthRoute.get("/get-me", getMe);
AuthRoute.get("/reload-token", ReloadToken);

// Manager

AuthRoute.post("/manager-authenticate", ManagerAuthenticate);
AuthRoute.post("/manager-set-password", ManagerSetPassword);
AuthRoute.post("/manager-login", ManagerLogin);

// Employee

export default AuthRoute;
