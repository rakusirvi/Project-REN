import Admin from "../models/admin.model.js";
import OtpModel from "../models/Otp.model.js";
import { generateOtp, getOtpHtml } from "../Libs/libs.js";
import bcrypt from "bcrypt";
import sendEmail from "../services/emailService.js";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import Manager from "../models/manager.model.js";
import Employee from "../models/employee.model.js";

// DONE
export async function AdminSignUP(req, res) {
  const {
    name,
    company_name,
    company_location,
    company_email,
    password,
    phone,
  } = req.body;

  if (
    !name ||
    !company_name ||
    !company_location ||
    !company_email ||
    !password ||
    !phone
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isAdminExists = await Admin.findOne({ company_email });

    if (isAdminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      company_name,
      company_location,
      company_email,
      password_hash,
      phone,
    });

    await admin.save();

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const adminOtp = new OtpModel({
      email: company_email,
      otpHash,
    });

    await adminOtp.save();
    await sendEmail(company_email, "Welcome to REN.", "", getOtpHtml(otp));

    return res.status(200).json({ success: true, message: "OTP Sent", otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// DONE
export async function AdminAuthenticate(req, res) {
  const { email, otp } = req.body;

  try {
    const otpDoc = await OtpModel.findOne({ email });
    if (!otpDoc)
      return res.status(400).json({ message: "OTP expired or not found" });

    const isOtpValid = await bcrypt.compare(otp, otpDoc.otpHash);
    if (!isOtpValid) return res.status(400).json({ message: "Invalid OTP" });

    const admin = await Admin.findOneAndUpdate(
      { company_email: email },
      { verified: true },
      { returnDocument: "after" },
    );

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    await OtpModel.deleteOne({ email });

    const payload = {
      id: admin._id,
      company_name: admin.company_name,
      role: admin.role,
    };

    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      accessToken,
      data: admin ,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// DONE
export async function AdminLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await Admin.findOne({ company_email: email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (!admin.verified) {
      return res.status(400).json({
        message: "You are not verified.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      id: admin._id,
      company_name: admin.company_name,
      role: admin.role,
    };
    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
      data: admin,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// DONE
export async function getMe(req, res) {
  try {
    const decoded = req.user;

    let user;

    if (decoded.role === "admin") user = await Admin.findById(decoded.id);
    else if (decoded.role === "manager")
      user = await Manager.findById(decoded.id);
    else if (decoded.role === "employee")
      user = await Employee.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

//UPDATE NEDDED
export async function ReloadToken(req, res) {
  try {
    // 1. Get the current Refresh Token
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "UnAuthorized" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    // 3. Find the user based on role
    let user;
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const payload = {
        id: user._id,
        role: user.role,
      };

      const newAccessToken = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "15m",
      });
      const newRefreshToken = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "7d",
      });
      // 6. Overwrite the old cookie with the NEW Refresh Token
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // 7. Send the new Access Token in the response body
      return res.status(200).json({
        accessToken: newAccessToken,
        message: "Tokens refreshed successfully",
      });
    } else if (decoded.role === "manager") {
      user = await Manager.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const payload = {
        id: user._id,
        admin_id: user.admin_id,
        company_name: user.company_name,
        role: user.role,
      };

      const newAccessToken = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "15m",
      });

      const newRefreshToken = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "7d",
      });

      // 6. Overwrite the old cookie with the NEW Refresh Token
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // 7. Send the new Access Token in the response body
      return res.status(200).json({
        accessToken: newAccessToken,
        message: "Tokens refreshed successfully",
      });
    } else if (decoded.role === "employee") {
      user = await Employee.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const payload = {
        id: user._id,
        manager_id: user.manager_id,
        admin_id: user.admin_id,
        role: user.role,
      };

      const newAccessToken = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "15m",
      });

      const newRefreshToken = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "7d",
      });

      // 6. Overwrite the old cookie with the NEW Refresh Token
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // 7. Send the new Access Token in the response body
      return res.status(200).json({
        accessToken: newAccessToken,
        message: "Tokens refreshed successfully",
      });
    }
  } catch (error) {
    // If verify fails (expired or tampered), clear the cookie and reject
    res.clearCookie("refreshToken");
    return res.status(403).json({
      message: "Session expired, please login again",
    });
  }
}

//DONE
export async function ManagerAuthenticate(req, res) {
  const { email, joiningToken } = req.body;

  try {
    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(404).json({ message: "Email not found" });

    const isTokenValid = await bcrypt.compare(
      joiningToken,
      manager.joiningTokenHash,
    );
    if (!isTokenValid)
      return res.status(400).json({ message: "Invalid Joining Token" });

    // FIX: Renamed variable to avoid shadowing the Model name
    manager.joiningTokenHash = null;
    manager.joined = true;
    await manager.save();

    const payload = {
      id: manager._id,
      admin_id: manager.admin_id,
      company_name: manager.company_name,
      role: manager.role,
    };
    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      manager: manager,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//DONE
export async function ManagerSetPassword(req, res) {
  const { password, confirmPassword } = req.body;
  try {
    const manager = await Manager.findOne({
      _id: req.user.id,
      email: req.user.email,
    });

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    manager.password_hash = await bcrypt.hash(password, 10);
    manager.verified = true;
    await manager.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//DONE
export async function ManagerLogin(req, res) {
  const { email, password } = req.body;
  try {
    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(404).json({ message: "Manager not found" });

    if (!manager.joined) {
      return res.status(400).json({
        message: "You are not verified Ask Admin to Resend the Request",
      });
    }
    if (!manager.password_hash) {
      return res.status(400).json({
        message:
          "You Have Not Set Password Yet. Please Ask Admin to Resend the Request",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      manager.password_hash,
    );
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Password" });

    const payload = {
      id: manager._id,
      admin_id: manager.admin_id,
      company_name: manager.company_name,
      role: manager.role,
    };
    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
      data: manager,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function EmployeeAuthenticate(req, res) {
  const { email, joiningToken } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: "Email not found" });

    const isTokenValid = await bcrypt.compare(
      joiningToken,
      employee.joiningTokenHash,
    );
    if (!isTokenValid)
      return res.status(400).json({ message: "Invalid Joining Token" });

    employee.joiningTokenHash = null;
    employee.joined = true;
    await employee.save();

    const payload = {
      id: employee._id,
      admin_id: employee.admin_id,
      manager_id: employee.manager_id,
      role: employee.role,
    };

    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      employee: employee,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function EmployeeSetPassword(req, res) {
  const { password, confirmPassword } = req.body;
  try {
    const employee = await Employee.findOne({
      _id: req.user.id,
    });

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    employee.password_hash = await bcrypt.hash(password, 10);
    employee.verified = true;
    await employee.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function EmployeeLogin(req, res) {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (!employee.joined) {
      return res.status(400).json({
        message: "You are not verified Ask Admin to Resend the Request",
      });
    }
    if (!employee.password_hash) {
      return res.status(400).json({
        message:
          "You Have Not Set Password Yet. Please Ask Admin to Resend the Request",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      employee.password_hash,
    );
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Password" });

    const payload = {
      id: employee._id,
      admin_id: employee.admin_id,
      manager_id: employee.manager_id,
      role: employee.role,
    };
    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
      data: employee,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function Logout(req, res) {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
