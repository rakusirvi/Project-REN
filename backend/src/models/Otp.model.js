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
  },
  {
    timestamps: true,
  },
);

const OtpModel = mongoose.model("Otp", OtpSchema);

export default OtpModel;
