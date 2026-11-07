import { uploadFile } from "../services/storage.services.js"

export const createProductController=async(req,res)=>{
    try {
    const {title,description,brand,category}=req.body

    const fileUrl=await Promise.all(
       req.files.map(async(file)=>{
        const res=await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname
        })
         return res.url
       })
    )

        
    } catch (error) {
        return res.status(500).json({
            messages:"invalid request"
        })
    }
}