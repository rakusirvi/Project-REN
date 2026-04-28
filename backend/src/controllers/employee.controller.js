import Leave from "../models/leave.model.js";

export async function applyEmployeeLeave(req, res) {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Only employee can apply leave" });
    }

    const { startDate, endDate, file ,reason } = req.body;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (end < start) {
      return res
        .status(400)
        .json({ message: "endDate must be after or equal to startDate" });
    }

    const leave = await Leave.create({
      applicant_role: "employee",
      applicant_id: req.user.id,
      applicant_role_model: "Employee",
      reviewer_role: "manager",
      reviewer_id: req.user.manager_id,
      reviewer_role_model: "Manager",
      admin_id: req.user.admin_id,
      manager_id: req.user.manager_id,
      start_date: start,
      end_date: end,
      file: file ?? null,
      reason: reason ?? "",
    });

    return res.status(201).json({
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getEmployeeLeaves(req, res) {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Only employee can view this" });
    }

    const leaves = await Leave.find({
      applicant_role: "employee",
      applicant_id: req.user.id,
      manager_id: req.user.manager_id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Leaves fetched successfully",
      data: leaves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
