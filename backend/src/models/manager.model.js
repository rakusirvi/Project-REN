import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema(
  {
    ceo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    name: {
      type: String,
      required: [true, "Manager name is required"],
      trim: true,
    },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Manager email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Manager type is required"],
      trim: true,
    },
    profile_pic: {
      type: String,
      default: "", // Or an empty string
    },
    role: {
      type: String,
      default: "MANAGER",
    },
    joiningTokenHash: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Manager = mongoose.model("Manager", ManagerSchema);

export default Manager;
