import { validationResult, body } from "express-validator";

export const authRegisterValidator = [
  body("name")
    .exists()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be string")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("number must minimum 2 and maximum 60 character"),

  body("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please enter valid email")
    .isString()
    .withMessage("email must be string")
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage("emial must be minimum 6 and maximum 100 character"),

  body("number")
    .exists()
    .withMessage("number is required")
    .isMobilePhone()
    .withMessage("please enter valid phone number")
    .isString()
    .withMessage("number must be string")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage(
      "number must be minimum 10 character and maximum 10 character",
    ),

  body("password")
    .exists()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .trim()
    .isLength({ min: 4, max: 100 })
    .withMessage(
      "password must be at least minimum 4 character and maximum 100 character",
    ),

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

export const authLoginValidator = [
  body("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please enter valid email")
    .isString()
    .withMessage("email must be string")
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage("emial must be minimum 6 and maximum 100 character"),

  body("password")
    .exists()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .trim()
    .isLength({ min: 4, max: 100 })
    .withMessage(
      "password must be at least minimum 4 character and maximum 100 character",
    ),

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
