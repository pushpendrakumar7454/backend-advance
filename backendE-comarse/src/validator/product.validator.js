import { body, validationResult } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be string")
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage(
      "title must be at least minimum 2 character and maximum 500 character",
    ),

  body("description")
    .exists()
    .withMessage("description is required")
    .isString()
    .withMessage("description")
    .isString()
    .withMessage("description must be string")
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage(
      "description must be at least minimum 2 character and maximum 500 character",
    ),

  body("price.amount")
    .exists()
    .withMessage("amount is required")
    .isFloat({ min: 0 })
    .withMessage("amount must be a positive number"),

  body("price.currency")
    .exists()
    .withMessage("currency is required")
    .bail()
    .isString()
    .withMessage("currency must be string")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("currency must be either USD or INR"),
  ,
  body("sizes.*.size")
    .exists()
    .withMessage("size is required")
    .bail()
    .isString()
    .withMessage("size must be string")
    .bail()
    .isIn(["S", "M", "L", "XL", "XXL"])
    .withMessage("sizes must be S,M,L,XL,XXL"),

  body("sizes.*.stock")
    .exists()
    .withMessage("stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("stock must be a non-negative number"),

  body("brand")
    .exists()
    .withMessage("brand is required")
    .bail()
    .isString()
    .withMessage("brand is must be string")
    .bail()
    .trim(),

  body("category")
    .exists()
    .withMessage("categorry must be required")
    .bail()
    .isString()
    .withMessage("string must be string")
    .bail()
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        messages: "invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];
