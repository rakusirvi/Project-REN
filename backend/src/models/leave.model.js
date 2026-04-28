import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    applicant_role: {
      type: String,
      enum: ["manager", "employee"],
      required: true,
    },
    applicant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "applicant_role_model",
    },
    applicant_role_model: {
      type: String,
      enum: ["Manager", "Employee"],
      required: true,
    },
    reviewer_role: {
      type: String,
      enum: ["admin", "manager"],
      required: true,
    },
    reviewer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "reviewer_role_model",
    },
    reviewer_role_model: {
      type: String,
      enum: ["Admin", "Manager"],
      required: true,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    file: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    response: {
      type: String,
      default: "",
      trim: true,
    },
    responded_at: {
      type: Date,
      default: null,
    },
    reason: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Leave = mongoose.model("Leave", LeaveSchema);

export default Leave;
