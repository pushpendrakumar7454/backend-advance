import {body,validationResult} from 'express-validator'


export const createProductValidator=[
    body("title")
    .exists().withMessage("title is required")
    .isString().withMessage("title must be string")
    .trim()
    .isLength({min:2,max:500}).withMessage("title must be at least minimum 2 character and maximum 500 character"),

    body("")

]