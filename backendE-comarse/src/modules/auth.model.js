import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 60
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "seller"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken:{
        required:true
    }
}, {
    timestamps: true
})

const authModel = mongoose.model("users", authSchema)

export default authModel