import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  AddEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  ApplyLeave,
  getManagerLeaves,
  getEmployeeLeaveRequests,
  respondToEmployeeLeave,
} from "../controllers/manager.controller.js";

const ManagerRoute = Router();

ManagerRoute.post("/add-employee", authMiddleware, AddEmployee);
ManagerRoute.get("/get-all-employees", authMiddleware, getAllEmployees);
ManagerRoute.get("/get-employee/:id", authMiddleware, getEmployeeById);
ManagerRoute.put("/update-employee/:id", authMiddleware, updateEmployee);
ManagerRoute.delete("/delete-employee/:id", authMiddleware, deleteEmployee);
ManagerRoute.post("/apply-leave", authMiddleware, ApplyLeave);
ManagerRoute.get("/my-leaves", authMiddleware, getManagerLeaves);
ManagerRoute.get(
  "/employee-leave-requests",
  authMiddleware,
  getEmployeeLeaveRequests,
);
ManagerRoute.put(
  "/respond-employee-leave/:id",
  authMiddleware,
  respondToEmployeeLeave,
);

export default ManagerRoute;
