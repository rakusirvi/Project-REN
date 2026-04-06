import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  AddEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/manager.controller.js";

const ManagerRoute = Router();

ManagerRoute.post("/add-employee", authMiddleware, AddEmployee);
ManagerRoute.get("/get-all-employees", authMiddleware, getAllEmployees);
ManagerRoute.get("/get-employee/:id", authMiddleware, getEmployeeById);
ManagerRoute.put("/update-employee/:id", authMiddleware, updateEmployee);
ManagerRoute.delete("/delete-employee/:id", authMiddleware, deleteEmployee);

export default ManagerRoute;
