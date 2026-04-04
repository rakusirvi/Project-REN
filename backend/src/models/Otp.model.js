import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 600 },
  },
  {
    timestamps: true,
  },
);

const OtpModel = mongoose.model("Otp", OtpSchema);

export default OtpModel;
