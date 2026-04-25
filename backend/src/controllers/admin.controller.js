import { generateJoiningToken, getJoiningTokenHTML } from "../Libs/libs.js";
import Manager from "../models/manager.model.js";
import sendEmail from "../services/emailService.js";
import bcrypt from "bcrypt";
import Employee from "../models/employee.model.js";

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
        getJoiningTokenHTML(joiningToken, type, type),
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

export async function getPendingManagers(req, res) {
  try {
    const managers = await Manager.find({
      admin_id: req.user.id,
      verified: false,
    });
    return res.status(200).json({
      message: "Pending Managers fetched successfully",
      data: managers,
    });
  } catch (error) {
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
