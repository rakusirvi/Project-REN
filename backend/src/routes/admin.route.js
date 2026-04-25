import { Router } from "express";
import { addManager } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllManagers,
  getManagerById,
  updateManager,
  deleteManager,
  getManagerEmployee,
  getPendingManagers,
} from "../controllers/admin.controller.js";
const AdminRoute = Router();

AdminRoute.post("/add-manager", authMiddleware, addManager);
AdminRoute.get("/get-all-managers", authMiddleware, getAllManagers);
AdminRoute.get("/get-pending-managers", authMiddleware, getPendingManagers);
AdminRoute.get("/getManagerEmployee/:id", authMiddleware, getManagerEmployee);
AdminRoute.get("/get-manager/:id", authMiddleware, getManagerById);
AdminRoute.put("/update-manager/:id", authMiddleware, updateManager);
AdminRoute.delete("/delete-manager/:id", authMiddleware, deleteManager);

export default AdminRoute;
