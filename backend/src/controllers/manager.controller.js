import { generateJoiningToken, getJoiningTokenHTML } from "../Libs/libs.js";
import Employee from "../models/employee.model.js";
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
