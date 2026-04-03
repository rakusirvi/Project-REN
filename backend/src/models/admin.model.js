import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    profile_pic: {
      type: String,
      default: "", // Or an empty string
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
      default : ""
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "CEO",
    },
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
