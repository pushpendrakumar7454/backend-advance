import { Router } from "express";
import productModel from "../modules/product.module.js";
import razorpayInstance from "../config/razorpay.js";
import razorpayModel from "../modules/razorpay.module.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config";

const router = Router();

router.post("/:productId/order", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    if (
      !product.price ||
      typeof product.price.amount !== "number" ||
      !product.price.currency
    ) {
      return res.status(400).json({
        message: "product price and currency invalid",
      });
    }

    const order=await razorpayInstance.orders.create({
        amount:Math.round(product.price.amount*100),
        currency:product.price.currency,
        receipt:`order_rcptid_${productId}`,
        notes:{
            productId:productId,
            productTitle:product.title
        }
    })

    const payment=await razorpayModel.create({
        orderId:order._id,
        product:product._id,
        amount:product.price.amount,
        currency:product.price.currency,
        status:"pending"
    })

    return res.status(201).json({
       message:"order created succefully",
       order,
       payment
    })



  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});



router.post("/verfiy",async(req,res)=>{
    try {
        
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body

      if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        return res.status(400).json({
            messgae:"payment detail are required"
        })
      }

      const isValid=validatePaymentVerification({
        order_id:razorpay_order_id,
        payment_id:razorpay_payment_id
      },
      razorpay_signature,
      config.RAZORPAY_KEY_SECRET,
    )

    if(!isValid){
        return res.status(400).json({
            status:false,
            message:"invalid payment signature"
        })
    }

    const payment=await productModel.findOneAndUpdate(
         {orderId:razorpay_order_id},
         {
            paymentId:razorpay_payment_id,
            signature:razorpay_signature,
            status:"completed"
         },{new:true}
     )

        if(!payment){
            return res.status(404).json({
                messgae:"payment record not found"
            })
         }

         return res.status(200).json({
            status:true,
            message:"payment verify succefully",
            payment
         })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
})


export default router;
