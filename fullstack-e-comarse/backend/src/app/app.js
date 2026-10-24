
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../router/authRouter.js";
import productRouter from "../router/product.route.js";
import cartRouter from "../router/cart.router.js";
import cors from "cors";
import passport from "../config/passport.js";
import paymentRoute from '../router/razorpayment.route.js'
import messageRoutes from "./routes/message.routes.js";
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
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
