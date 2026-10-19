import mongoose from "mongoose";

const authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50

    },
    email:{
        type:String,
        required:true,
        minLength:10,
        maxLength:100,
          unique: true,
    },
    number:{
        type:String,
        required:true,
        minLength:10,
        maxLength:10,
          unique: true,
    },
    password:{
        type:String,
        required:true
    },role:{
        type:String,
        enum:["user","seller"],
        default:"user"
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
}
)

const authModel=mongoose.model("authModelE-comarseProjectFull",authSchema)
export default authModel