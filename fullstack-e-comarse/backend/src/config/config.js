import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  ACCEESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_SECRET_ID,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

  RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET:process.env.RAZORPAY_KEY_SECRET
};