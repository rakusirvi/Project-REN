import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    company_location: {
      type: String,
      required: [true, "Company location is required"],
      trim: true,
    },
    company_email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password_hash: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      trim: true,
    },
    company_profile: {
      type: String,
      trim: true,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
