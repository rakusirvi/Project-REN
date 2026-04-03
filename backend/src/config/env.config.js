import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_USER = process.env.GOOGLE_USER;

if (
  !PORT ||
  !MONGO_URI ||
  !JWT_SECRET ||
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !GOOGLE_REFRESH_TOKEN ||
  !GOOGLE_USER
) {
  new Error("Some thing is not defined in Env");
}

const config = {
  PORT: PORT,
  MONGO_URI: MONGO_URI,
  JWT_SECRET: JWT_SECRET,
  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: GOOGLE_REFRESH_TOKEN,
  GOOGLE_USER: GOOGLE_USER,
};

export default config;
