import  mongoose from 'mongoose'

const razorpaySchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String
    },
    signature:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },currency:{
        type:String,
        default:"INR"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authModelE-comarseProjectFull"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"fullStack-e-comarseProject",
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    }
},{
    timestamps:true
})


const razorpayModel=mongoose.model("fullStackRazorpay",razorpaySchema)
export default razorpayModel