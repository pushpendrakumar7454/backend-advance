import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const generateAccessToken=({userId,role})=>{
    return jwt.sign({userId,role},config.ACCEESS_TOKEN,{expiresIn:"15m"})
}

export const generateRefreshToken=({userId,role})=>{
    return jwt.sign({userId,role},config.REFRESH_TOKEN,{expiresIn:"7d"})
}

export const readAccessToken=(accessToken)=>{
    return jwt.verify(accessToken,config.ACCEESS_TOKEN)
}

export const readRefreshToken=(refreshToken)=>{
    return jwt.verify(refreshToken,config.REFRESH_TOKEN)
}