import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const generateAccessToken=({userId,role})=>{
    return jwt.sign({userId,role},config.JWT_ACCESS_TOKEN,{expiresIn:"15m"})
    
}

export const generateRefreshToken=({userId,role})=>{
    return jwt.sign({userId,role},config.JWT_REFRESH_TOKEN,{expiresIn:"15d"})
}

export const verifyAccessToken=(accessToken)=>{
    return jwt.verify(accessToken,config.JWT_ACCESS_TOKEN)
}

export const verifyRefreshToken=(refreshToken)=>{
    return jwt.verify(refreshToken,config.JWT_REFRESH_TOKEN)
}