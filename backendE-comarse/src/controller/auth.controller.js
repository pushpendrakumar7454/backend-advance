import authModel from "../modules/auth.model.js"
import bycypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js"

export const authRegisterController=async(req,res)=>{
    try {
        const {name,email,password,number}=req.body

        const isAllreadyExistEmail=await authModel.findOne({email})

        if(isAllreadyExistEmail){
            return res.status(400).json({
                messages:"email is allready exisest"
            })
        }

        const user=await authModel.create({
            name,
            email,
            number,
            password:await bycypt.hash(password,6)
        })

       const accessToken=generateAccessToken({userId:user._id,role:user.role})
       const refreshToken= generateRefreshToken({userId:user._id,role:user.role})
        
       res.cookie("refreshToken",refreshToken,{
        httpOnly:true
       })

    await authModel.findByIdAndUpdate(user._id,{refreshToken})

    return res.status(201).json({
        messages:"user register succefully",
        data:{
            accessToken,
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                userId:user._id
            }
        }
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            messages:"internal server errror"
        })
    }
}


export const authLoginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        
        const user=await authModel.findOne({email})
        if(!user){
            return res.status(404).json({
                messages:"user not found"
            })
        }

        const isValidPassword=await bycypt.compare(password,user.password)

        if(!isValidPassword){
            return res.status(400).json({
                messages:"password is wrong"
            })
        }

        
       const accessToken=generateAccessToken({userId:user._id,role:user.role})
       const refreshToken= generateRefreshToken({userId:user._id,role:user.role})
        
       res.cookie("refreshToken",refreshToken,{
        httpOnly:true
       })

    await authModel.findByIdAndUpdate(user._id,{refreshToken})

     return res.status(200).json({
        messages:"user login succefully",
        data:{
            accessToken,
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                userId:user._id
            }
        }
    })

    } catch (error) {
        return res.status(500).json(({
            messages:"internal server erorr"
        }))
    }
}

export const authRefreshConteroller=async(req,res)=>{

    const refreshToken=res.cookies.refreshToken
    if(!refreshToken){
        return res.status(400).json({
            message:"refresh token not found"
        })
    }

    try {
        
   

    } catch (error) {
        return res.status(500).json({
            messages:"internal server error"
        })
    }
}