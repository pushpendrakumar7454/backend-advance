import productModel from "../modules/product.module.js"
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
        })
    )

    const product=await productModel.create({
        title,
        description,
        brand,
        category,
        price:{
            amount:req.price.amount,
            currency:req.price.currency
        },
        sizes:req.body.sizes,
        image:fileUrl
    })

    return res.status(201).json({
        messages:"product created succefully",
        data:product
    })
        
    } catch (error) {
        return res.status(500).json({
            messages:"invalid request"
        })
    }
}