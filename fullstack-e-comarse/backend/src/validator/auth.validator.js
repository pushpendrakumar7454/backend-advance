import {body,validationResult} from 'express-validator'

export const registerValidator=[
    body("name")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name must be String").bail()
    .trim()
    .isLength({min:2}).withMessage("name must be at least 22 character"),

    body("email")
    .exists().withMessage("email is required").bail()
    .isEmail().withMessage("please enter valid email").bail()
    .isString().withMessage("email must be string").bail()
    .trim()
    .isLength({min:6}).withMessage("email must be at least 6 character"),

    body("number")
    .exists().withMessage("number is required").bail()
    .isMobilePhone().withMessage("please enter valid phone number").bail()
    .isLength({min:10,max:10}).withMessage("please enter al least minimun 10 charactr and maximu 10 character").bail(),

    body("password")
    .exists().withMessage('password is required').bail()
    .isString().withMessage("password must be string").bail()
    .trim()
    .isLength({min:6}).withMessage("paaswword must be at least 6 character"),

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


export const loginValidator=[
    body("email")
    .exists().withMessage("email is required").bail()
    .isEmail().withMessage("please enter a valid enter").bail()
    .isString().withMessage("emeail must be string")
    .trim(),

    body("password")
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password is string").bail()
    .trim()
    .isLength({min:6}).withMessage("password must bee at reast 6 character"),

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