import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:2,
        maxLength:200
    },
    description:{
        type:String,
        requered:true,
        minLength:5,
        maxLength:500
    },
    images:{
        type:[{type:String}],
        validate:{
            validator:(images)=>images.length<=5,
            message:"images contaion at least 5 images"
        }
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        amount:{
           type:Number,
           required:true
        },
        currency:{
           type:String,
           enum:["INR","USD"],
           default:"INR"
        }
    },
    sizes:[
        {
            size:{
                type:String,
                enum:["S","M","L","XL","XXL"]
            },
            stock:{
                type:Number,
                min:0,
                default:0
            }
        }
    ],
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    published:{
        type:Boolean,
        default:false

    },
},{timestamps:true})

const productModel=mongoose.model("productModel",productSchema)
export default productSchema