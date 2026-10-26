import express from 'express'
import ratelimit from 'express-rate-limit'

const app=express()


const loginLimiter=ratelimit({
    windowMs:1*60*1000 ,//1 minite
    limit:5,
    message:{message:"to many login attempts, try again in 1 minute "}  
})

app.get("/api/login",loginLimiter,(req,res)=>{
    res.send("Login endpoint")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})