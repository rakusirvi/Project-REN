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
  resendManagerInvitation,
  getManagerLeaveRequests,
  respondToManagerLeave,
} from "../controllers/admin.controller.js";
const AdminRoute = Router();

AdminRoute.post("/add-manager", authMiddleware, addManager);
AdminRoute.get("/get-all-managers", authMiddleware, getAllManagers);
AdminRoute.get("/get-pending-managers", authMiddleware, getPendingManagers);
AdminRoute.post(
  "/resend-manager-invitation/:id",
  authMiddleware,
  resendManagerInvitation,
);

AdminRoute.get("/getManagerEmployee/:id", authMiddleware, getManagerEmployee);
AdminRoute.get("/get-manager/:id", authMiddleware, getManagerById);



AdminRoute.put("/update-manager/:id", authMiddleware, updateManager);
AdminRoute.get("/manager-leave-requests", authMiddleware, getManagerLeaveRequests);
AdminRoute.put(
  "/respond-manager-leave/:id",
  authMiddleware,
  respondToManagerLeave,
);

AdminRoute.delete("/delete-manager/:id", authMiddleware, deleteManager);

export default AdminRoute;
