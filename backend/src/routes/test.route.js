import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(201).json({ isSuccess: true, data: "Test Route" });
});

export default router;
