import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

import AuthRoute from "./routes/auth.route.js";
import AdminRoute from "./routes/admin.route.js";
import ManagerRoute from "./routes/manager.route.js";

app.use("/api/auth", AuthRoute);
// This is For CEO
app.use("/api/admin", AdminRoute);
// This is For Manager
app.use("/api/manager", ManagerRoute);
// app.use("/api/message")

// app.use("/api/employee", EmployeeRoute);

export default app;
