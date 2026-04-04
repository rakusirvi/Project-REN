import Admin from "../models/admin.model.js";
import OtpModel from "../models/Otp.model.js";
import { generateOtp, getOtpHtml } from "../Libs/libs.js";
import bcrypt from "bcrypt";
import sendEmail from "../services/emailService.js";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

// DONE
export async function AdminSignUP(req, res) {
  const {
    full_name,
    company_name,
    email,
    profile_pic,
    password,
    phone,
    company_profile,
  } = req.body;

  if (!full_name || !company_name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isAdminExists = await Admin.findOne({ email });

    if (isAdminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const admin = new Admin({
      full_name,
      company_name,
      email,
      profile_pic,
      password_hash,
      phone,
      company_profile,
    });

    await admin.save();

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const adminOtp = new OtpModel({
      email,
      otpHash,
    });
    await adminOtp.save();
    await sendEmail(email, "Welcome to REN.", "", getOtpHtml(otp));
    return res
      .status(200)
      .json({ message: "OTP sent successfully", admin, otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// DONE
export async function AdminVerify(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const otpDoc = await OtpModel.findOne({ email });

    if (!otpDoc) {
      return res.status(400).json({ message: "OTP expired or not found User" });
    }

    // 2. Use bcrypt.compare (This is the only way to check a salted hash)
    const isOtpValid = await bcrypt.compare(otp, otpDoc.otpHash);

    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    admin.verified = true;
    await admin.save();

    // 4. Cleanup and Tokens
    await OtpModel.deleteOne({ email });

    const accessToken = jwt.sign(
      { id: admin._id, company_name: admin.company_name, role: admin.role },
      config.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: admin._id, company_name: admin.company_name, role: admin.role },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      accessToken,
      admin,
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
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const accessToken = jwt.sign(
      { id: admin._id, company_name: admin.company_name, role: admin.role },
      config.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: admin._id, company_name: admin.company_name, role: admin.role },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      admin,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// DONE
export async function getMe(req, res) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "token not Provided",
    });
  }

  const decoded = jwt.verify(accessToken, config.JWT_SECRET);
  const user = await Admin.findById(decoded.id);

  res.status(200).json({
    message: "User Fetch Success",
    data: user,
  });
}

export async function ManagerAuthenticate(req, res) {
  const { email, joiningToken } = req.body;

  if (!email || !joiningToken) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: "Manager not found" });
    }

    const isJoiningTokenValid = await bcrypt.compare(
      joiningToken,
      manager.joiningTokenHash,
    );
    if (!isJoiningTokenValid) {
      return res.status(400).json({ message: "Invalid Joining Token" });
    }

    const accessToken = jwt.sign(
      { id: manager._id, role: manager.role },
      config.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: manager._id, role: manager.role },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      manager,
    });
  } catch (error) {}
}

export async function ManagerChangePassword(req, res) {
  try {
  } catch (error) {}
}

export async function ManagerLogin(req, res) {
  try {
  } catch (error) {}
}

// UPDATE NEDDED
export async function refreshAccessToken(req, res) {
  try {
    // 1. Get the Refresh Token from the cookies
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No Refresh Token provided" });
    }

    // 2. Verify the Refresh Token
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    // 3. Find the user in your 3 tables (CEO, Manager, or Employee)
    // Tip: If you put 'role' in the Refresh Token too, it's even faster!
    const user = await Admin.findById(decoded.id);

    // TODO;
    // ||
    // (await Manager.findById(decoded.id)) ||
    // (await Employee.findById(decoded.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Generate a NEW Access Token (15 mins)
    const newAccessToken = jwt.sign(
      { id: user._id, company_name: user.company_name, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign(
      { id: user._id, company_name: user.company_name, role: user.role },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // 5. Overwrite the old cookie with the new one
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 5. Return only the new Access Token
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired Refresh Token",
      refreshToken,
    });
  }
}
