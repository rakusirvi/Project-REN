import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  applyEmployeeLeave,
  getEmployeeLeaves,
} from "../controllers/employee.controller.js";

const EmployeeRoute = Router();

EmployeeRoute.post("/apply-leave", authMiddleware, applyEmployeeLeave);
EmployeeRoute.get("/my-leaves", authMiddleware, getEmployeeLeaves);

export default EmployeeRoute;
