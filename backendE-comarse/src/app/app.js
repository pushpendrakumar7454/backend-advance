import express from 'express'
import authRouter from '../route/auth.route.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import productRouter from '../route/product.route.js'

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)


export default app;