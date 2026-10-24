import razorpay from "razorpay";
import { config } from "./config.js";

const razorpayInstance = new razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

export default razorpayInstance
