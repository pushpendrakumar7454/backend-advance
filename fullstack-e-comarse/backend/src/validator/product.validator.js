import {body,validationResult,param} from 'express-validator'

export const createProductValidator=[
    body("title")
    .exists().withMessage("title is required").bail()
    .isString().withMessage("title must be strinng").bail()
    .trim()
    .isLength({min:2,max:100}).withMessage("title must be cantain minimum 10 character and maximum 100 character")
    .isAlpha("en-US",{ignore:" "}).withMessage("title can only have small letters and capital letters"),

    body("description")
    .exists().withMessage("description is required").bail()
    .isString().withMessage("description must be String").bail()
    .trim()
    .isLength({min:20,max:500}).withMessage("description must be cantain minimum 20 character and maximum 500 character"),

    body("price.amount")
    .exists().withMessage("amount is required").bail()
    .isFloat({min:0}).withMessage("amount must be a positive number"),

    body("price.currency")
    .exists().withMessage("currency is required").bail()
    .isString().withMessage("currency must be string").bail()
    .isIn(["INR","USD"]).withMessage("currency must be either USD or INR"),

  

    body("sizes.*.stock")
    .exists().withMessage("stock is required").bail()
    .isInt({min:0}).withMessage("stock must be a non-negative number"),

    body("brand")
    .exists().withMessage("brand is required").bail()
    .isString().withMessage("brand is must be string").bail()
    .trim(),

    body("category")
    .exists().withMessage("categorry must be required").bail()
    .isString().withMessage("string must be string").bail()
    .trim(),

    (req,res,next)=>{
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid required",
                errors:errors.array()
            })
        }
        next()
    }

]

export const listProductValidator=[
    param("id")
    .exists().withMessage("product id is required in req params").bail()
    .isMongoId().withMessage("product is must be  a valid mongo object id"),

    (req,res,next)=>{
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]

export const unlistProductValidator=[
    param('id')
    .exists().withMessage("product id must be required").bail()
    .isMongoId().withMessage("product must be a valid mongo object id"),

    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]