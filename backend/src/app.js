import express from "express";
import cookieParser from "cookie-parser";
const app = express();

import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

import AuthRoute from "./routes/auth.route.js";
import AdminRoute from "./routes/admin.route.js";
import ManagerRoute from "./routes/manager.route.js";

import EmployeeRoute from "./routes/employee.route.js";


app.use("/api/auth", AuthRoute);
// This is For CEO
app.use("/api/admin", AdminRoute);
// This is For Manager
app.use("/api/manager", ManagerRoute);
// app.use("/api/message")
app.use("/api/employee", EmployeeRoute);

export default app;
