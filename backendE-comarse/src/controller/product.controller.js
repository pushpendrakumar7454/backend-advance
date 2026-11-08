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
             return res.url
        })
    )

    const product=await productModel.create({
        title,
        description,
        brand,
        category,
        prices:{
            amount:req.body.prices.amount,
            currency:req.body.prices.currency
        },
        sizes:req.body.sizes,
        images:fileUrl
    })

    return res.status(201).json({
        messages:"product created succefully",
        data:product
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            messages:"internal server error"
        })
    }
}