import { Router } from "express";
import {
  authenticate,
  sellerAuthencticate,
} from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";
import {
  createProductController,
  deleteProductController,
  updateProductController,
  findAllProductsControler,
  listAllProductBySellerController,
  listAllProductController,
  unlistProductController,
  findProductByIdController,
} from "../controllers/product.controller.js";
import {
  createProductValidator,
  listProductValidator,
  unlistProductValidator,
} from "../validator/product.validator.js";
const router = Router();

router.post(
  "/",
  authenticate,
  sellerAuthencticate,
  upload.array("images"),
  (req, res, next) => {
    ((req.body.sizes = JSON.parse(req.body.sizes)),
      (req.body.price = JSON.parse(req.body.price)));
    next();
  },
  createProductValidator,
  createProductController,
);
router.get("/find", authenticate, findAllProductsControler); //for user find router
router.get("/findone/:id",authenticate,findProductByIdController)
router.delete(
  "/delete/:id",
  authenticate,
  sellerAuthencticate,
  deleteProductController,
); //delete the product by only seller

router.put(
  "/update/:id",
  authenticate,
  sellerAuthencticate,
  upload.array("images"),
  updateProductController,
); //update the product by only seller

router.get(
  "/findseller",
  authenticate,
  sellerAuthencticate,
  listAllProductBySellerController,
);

///seller usess

router.patch(
  "/list/:id",
  authenticate,
  sellerAuthencticate,
  listProductValidator,
  listAllProductController,
);

router.patch(
  "/unlist/:id",
  authenticate,
  sellerAuthencticate,
  unlistProductValidator,
  unlistProductController,
);

export default router;
