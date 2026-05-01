import { generateJoiningToken, getJoiningTokenHTML } from "../Libs/libs.js";
import Manager from "../models/manager.model.js";
import sendEmail from "../services/emailService.js";
import bcrypt from "bcrypt";
import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";

//DONE
export async function addManager(req, res) {
  try {
    const { name, email, type } = req.body;

    // 1. Check if manager already exists
    const isUser = await Manager.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Generate and Hash the Token
    const joiningToken = generateJoiningToken();
    const joiningTokenHash = await bcrypt.hash(joiningToken, 10);

    const manager = await Manager.create({
      admin_id: req.user.id,
      name: name,
      company_name: req.user.company_name,
      email: email,
      type: type,
      joiningTokenHash: joiningTokenHash,
    });

    if (manager) {
      sendEmail(
        email,
        "REN Joining Token",
        "",
        getJoiningTokenHTML(joiningToken, type),
      );
    }

    return res.status(201).json({
      message: "Manager created, Joining Token sent",
      data: manager,
    });
  } catch (error) {
    console.error("Add Manager Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
}

export async function getAllManagers(req, res) {
  try {
    const managers = await Manager.find({
      admin_id: req.user.id,
      verified: true,
    });
    return res.status(200).json({
      message: "Managers fetched successfully",
      data: managers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function resendManagerInvitation(req, res) {
  try {
    const { id } = req.params;
    const manager = await Manager.findById({
      _id: id,
      admin_id: req.user.id,
      verified: false,
    });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    const joiningToken = generateJoiningToken();
    const joiningTokenHash = await bcrypt.hash(joiningToken, 10);
    manager.joiningTokenHash = joiningTokenHash;
    manager.verified = false;
    await manager.save();
    console.log(joiningToken);
    console.log(manager.email);
    console.log(joiningTokenHash);

    if (manager) {
      sendEmail(
        manager.email,
        "REN Joining Token",
        "",
        getJoiningTokenHTML(joiningToken, manager.type),
      );
    }

    return res.status(200).json({
      message: "Manager Invitation Resent Successfully",
      data: manager,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getPendingManagers(req, res) {
  try {
    const managers = await Manager.find({
      admin_id: req.user.id,
      joined: false,
    });
    return res.status(200).json({
      message: "Pending Managers fetched successfully",
      data: managers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addMultipleManager(req, res) {
  try {
    const { managers } = req.body;

    if (!managers || managers.length === 0) {
      return res.status(400).json({ message: "No managers provided" });
    }

    // 1. Extract all incoming emails to check at once
    const incomingEmails = managers.map((m) => m.email);

    // 2. Perform ONE database query to find all existing matches
    const existingManagers = await Manager.find({
      company_name: req.user.company_name, // Ensuring scope is within the company
      email: { $in: incomingEmails },
    });

    // 3. Create a Set of found emails for instant O(1) lookup
    const existingEmailSet = new Set(existingManagers.map((m) => m.email));

    const managersToSave = [];
    const emailQueue = [];
    const skipped = [];

    // 4. Filter and process
    for (const manager of managers) {
      if (existingEmailSet.has(manager.email)) {
        skipped.push(manager.email);
        continue; // Skip duplicates
      }

      const joiningToken = generateJoiningToken();
      const joiningTokenHash = await bcrypt.hash(joiningToken, 10);

      managersToSave.push({
        admin_id: req.user.id,
        company_name: req.user.company_name,
        name: manager.name,
        email: manager.email,
        type: manager.type,
        joiningTokenHash,
      });

      emailQueue.push({
        email: manager.email,
        joiningToken,
        type: manager.type,
      });
    }

    // 5. Batch Insert
    if (managersToSave.length > 0) {
      await Manager.insertMany(managersToSave);

      // 6. Send Emails
      emailQueue.forEach((entry) => {
        sendEmail(
          entry.email,
          "REN Joining Token",
          "",
          getJoiningTokenHTML(entry.joiningToken, entry.type),
        );
      });
    }

    return res.status(201).json({
      message: "Bulk processing finished",
      createdCount: managersToSave.length,
      skippedCount: skipped.length,
      skippedEmails: skipped,
    });
  } catch (error) {
    console.error("Add Multiple Manager Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getManagerById(req, res) {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({
      message: "Manager fetched successfully",
      manager,
    });
  } catch (error) {
    console.error("Get Manager By ID Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateManager(req, res) {
  try {
    const { id } = req.params;
    const { name, email, type } = req.body;
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    manager.name = name;
    manager.email = email;
    manager.type = type;
    await manager.save();
    return res.status(200).json({
      message: "Manager updated successfully",
      manager,
    });
  } catch (error) {
    console.error("Update Manager Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteManager(req, res) {
  try {
    const { id } = req.params;
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    await manager.deleteOne();
    return res.status(200).json({
      message: "Manager deleted successfully",
      manager,
    });
  } catch (error) {
    console.error("Delete Manager Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getManagerEmployee(req, res) {
  try {
    const { id } = req.params;
    const ManagerId = id;

    const employees = await Employee.find({
      admin_id: req.user.id,
      manager_id: id,
    });

    if (employees.length === 0 || !employees) {
      return res.status(200).json({
        message: "No employees found",
        data: [],
      });
    }
    console.log(employees);

    return res.status(200).json({
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    console.error("Get Manager Employee Error:", error.message);
  }
}

export async function getManagerLeaveRequests(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can view this" });
    }

    const leaves = await Leave.find({
      applicant_role: "manager",
      reviewer_role: "admin",
      reviewer_id: req.user.id,
    })
      .populate("applicant_id", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Manager leave requests fetched successfully",
      data: leaves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function respondToManagerLeave(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can respond" });
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
      applicant_role: "manager",
      reviewer_role: "admin",
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
      const manager = await Manager.findById(leave.applicant_id);
      if (manager) {
        manager.leave_balance = (manager.leave_balance ?? 0) + 1;
        await manager.save();
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
