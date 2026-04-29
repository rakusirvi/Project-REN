import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
    },

    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Employee email is required"],
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
    },
    role: {
      type: String,
      default: "employee",
    },
    joiningTokenHash: {
      type: String,
    },
    joined: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password_hash: {
      type: String,
    },

    // Leave Management Fields
    leave_balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    leave_history: [
      {
        leave_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LeaveRequest",
        },
        status: {
          type: String,
          enum: ["approved", "rejected"],
        },
        start_date: {
          type: Date,
          required: true,
        },
        end_date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
