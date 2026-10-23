import { Router } from "express";
import productModel from "../modules/product.module.js";
import razorpayInstance from "../config/razorpay.js";
import razorpayModel from "../modules/razorpay.module.js";

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

export default router;
