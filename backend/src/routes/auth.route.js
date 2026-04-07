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
  EmployeeAuthenticate,
  EmployeeSetPassword,
  EmployeeLogin,
  Logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const AuthRoute = Router();

// Admin
AuthRoute.post("/admin/signup", AdminSignUP);
AuthRoute.post("/admin/login", AdminLogin);
AuthRoute.post("/admin/authenticate", AdminAuthenticate);

// // All
AuthRoute.get("/get-me", getMe);
AuthRoute.get("/reload-token", authMiddleware, ReloadToken);

// Manager
AuthRoute.post("/manager/authenticate", ManagerAuthenticate);
AuthRoute.post("/manager/set-password", authMiddleware, ManagerSetPassword);
AuthRoute.post("/manager/login", ManagerLogin);

// Employee

AuthRoute.post("/employee/authenticate", EmployeeAuthenticate);
AuthRoute.post("/employee/set-password", authMiddleware, EmployeeSetPassword);
AuthRoute.post("/employee/login", EmployeeLogin);

//LOGOUT
AuthRoute.post("/logout", Logout);

export default AuthRoute;
