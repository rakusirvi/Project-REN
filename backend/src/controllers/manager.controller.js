import { generateJoiningToken, getJoiningTokenHTML } from "../Libs/libs.js";
import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";
import sendEmail from "../services/emailService.js";
import bcrypt from "bcrypt";

export async function AddEmployee(req, res) {
  const { name, email, type } = req.body;
  try {
    const employee = await Employee.findOne({ email });

    if (employee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const joiningToken = generateJoiningToken();
    const joiningTokenHash = await bcrypt.hash(joiningToken, 10);
    const emp = await Employee.create({
      admin_id: req.user.admin_id,
      manager_id: req.user.id,
      name: name,
      company_name: req.user.company_name,
      email: email,
      type: type,
      joiningTokenHash: joiningTokenHash,
    });

    if (emp) {
      sendEmail(
        email,
        "REN Joining Token",
        "",
        getJoiningTokenHTML(joiningToken, type),
      );
    }

    return res.status(201).json({
      message: "Employee created successfully Joining Token send",
      emp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find({ manager_id: req.user.id });
    if (employees) {
      return res.status(200).json({ message: "Success", employees });
    }
    return res.status(404).json({ message: "No Employee Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getEmployeeById(req, res) {
  try {
    const { id } = req.params;
    const emp = await find(id);
    if (emp) {
      return res.status(200).json({
        message: "Employee Found",
        data: emp,
      });
    }
    return res.status(404).json({
      message: "No Employee Found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { name, email, type } = req.body;
    const emp = await Employee.findById(id);
    if (emp) {
      emp.name = name;
      emp.email = email;
      emp.type = type;
      await emp.save();
      return res.status(200).json({
        message: "Employee updated successfully",
        emp,
      });
    }
    return res.status(404).json({
      message: "No Employee Found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const emp = await Employee.findById(id);
    if (emp) {
      await emp.deleteOne();
      return res.status(200).json({
        message: "Employee deleted successfully",
        emp,
      });
    }
    return res.status(404).json({
      message: "No Employee Found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function ApplyLeave(req, res){
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can apply leave" });
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
      applicant_role: "manager",
      applicant_id: req.user.id,
      applicant_role_model: "Manager",
      reviewer_role: "admin",
      reviewer_id: req.user.admin_id,
      reviewer_role_model: "Admin",
      admin_id: req.user.admin_id,
      manager_id: req.user.id,
      start_date: start,
      end_date: end,
      file: file ?? null,
      reason:  reason ?? "",
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

export async function getManagerLeaves(req, res) {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can view this" });
    }

    const leaves = await Leave.find({
      applicant_role: "manager",
      applicant_id: req.user.id,
      admin_id: req.user.admin_id,
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

export async function getEmployeeLeaveRequests(req, res) {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can view this" });
    }

    const leaves = await Leave.find({
      applicant_role: "employee",
      reviewer_role: "manager",
      reviewer_id: req.user.id,
    })
      .populate("applicant_id", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Employee leave requests fetched successfully",
      data: leaves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function respondToEmployeeLeave(req, res) {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can respond" });
    }

    const { id } = req.params;
    const { status, response } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "status must be either approved or rejected" });
    }

    const leave = await Leave.findOne({
      _id: id,
      applicant_role: "employee",
      reviewer_role: "manager",
      reviewer_id: req.user.id,
    });

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const wasApproved = leave.status === "approved";

    leave.status = status;
    leave.response = response ?? "";
    leave.responded_at = new Date();
    await leave.save();

    if (status === "approved" && !wasApproved) {
      const employee = await Employee.findById(leave.applicant_id);
      if (employee) {
        employee.leave_balance = (employee.leave_balance ?? 0) + 1;
        await employee.save();
      }
    }

    return res.status(200).json({
      message: "Leave response submitted successfully",
      data: leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
