
import mongoose from 'mongoose'
import { config } from './config.js'
const connectDb=async()=>{
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("connectDb")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb