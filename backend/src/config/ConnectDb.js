import mongoose from "mongoose";
import config from "./env.config.js";

const ConnectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDb;
