import  {body, param, validationResult } from 'express-validator';


export const followUserValidator =[
   param("userId")
   .isMongoId().withMessage("Invalid user ID"),

     (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
]

export const unfollowUserValidator=[
     param("userId")
        .isMongoId()
        .withMessage("Invalid user ID"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
]

export const getFollowValidator=[
     param("userId")
        .isMongoId()
        .withMessage("Invalid user ID"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
]
