
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../router/authRouter.js";
import productRouter from "../router/product.route.js";
import cartRouter from "../router/cart.router.js";
import cors from "cors";
import passport from "../config/passport.js";
import paymentRoute from '../router/razorpayment.route.js'
import messageRoutes from "../router/message.route.js";
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://backend-advance.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use('/api/payment',paymentRoute)
app.use("/api/messages",messageRoutes)

// Test route
app.get("/test", (req, res) => {
  res.json({
    message: "Backend is working",
  });
});

export default app;
