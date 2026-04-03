import { Router } from "express";
import { addManager } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const AdminRoute = Router();

AdminRoute.post("/add-manager", authMiddleware, addManager);


export default AdminRoute;
