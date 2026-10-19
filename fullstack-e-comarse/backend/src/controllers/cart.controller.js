import productModel from "../modules/product.module.js";
import cartModel from "../modules/cart.module.js";

export const addToCartController = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    const selectedSize = product.sizes.find((s) => s.size == size);

    if (!selectedSize) {
      return res.status(400).json({
        message: "size is not valid",
      });
    }

    if (selectedSize.stock < quantity) {
      return res.status(400).json({
        message: "insufficient stock",
      });
    }

    const cart =
      (await cartModel.findOne({
        user: req.user.userId,
      })) ||
      (await cartModel.create({
        user: req.user.userId,
      }));

    const productInCart = cart.products.find(
      (p) => p.product.toString() === productId && p.size == size,
    );

    if (productInCart) {
      if (productInCart.quantity + quantity > selectedSize.stock) {
        return res.status(400).json({
          message: "insufficient stock",
        });
      }

      await cartModel.updateOne(
        {
          user: req.user.userId,
          "products.product": productId,
          "products.size": size,
        },
        {
          $inc: {
            "products.$.quantity": quantity,
          },
        },
      );

      return res.status(200).json({
        message: "product quantity is update in cart",
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user.userId,
      },
      {
        $push: {
          products: {
            product: productId,
            quantity: quantity,
            size: size,
          },
        },
      },
    );

    return res.status(200).json({
      message: "product added to a cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    let cart = await cartModel
      .findOne({ user: req.user.userId })
      .populate("products.product");

    if (!cart) {
      cart = await cartModel.create({
        user: req.user.userId,
      });
    }

    return res.status(200).json({
      message: "cart receive succefully",
      data: {
        cart: cart,
      },
    });
  } catch (error) {
    console.log("GET CART ERROR:", error);

    return res.status(500).json({
      message: "internal server error",
    });
  }
};


export const updateCartQunatityController=async(req,res)=>{
  try {

    const {productId,quantity}=req.body
    if(!productId || quantity=== undefined){
      return res.status(400).json({
        message:"product id and quntity is required"
      })
    }

    if(quantity<1){
      return res.status(400).json({
        message:"quantity can not less then 1"
      })
    }

    const cart=await cartModel.findOne({user:req.user.userId})
     
     if(!cart){
      return res.status(404).json({
        message:"product not found"
      })
     }

     const item=cart.products.find((p)=>p.product.toString()==productId)
     if(!item){
      return res.status(404).json({
        message:"product not found in cart"
      })
     }

     item.quantity=quantity
     await cart.save()

     return res.status(200).json({
      message: "quantity updated successfully",
      data: {
        cart,
      },
    });



  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })
  }
}



export const removeCartProductController = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "product id is required",
      });
    }

    const cart = await cartModel.findOne({
      user: req.user.userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        message: "product not found in cart",
      });
    }

    cart.products.splice(productIndex, 1);

    await cart.save();

    return res.status(200).json({
      message: "product removed from cart successfully",
      data: {
        cart: cart,
      },
    });
  } catch (error) {
    console.log("REMOVE CART PRODUCT ERROR:", error);

    return res.status(500).json({
      message: "internal server error",
    });
  }
};