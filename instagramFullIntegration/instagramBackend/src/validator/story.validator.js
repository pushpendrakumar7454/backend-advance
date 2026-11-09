import { body, validationResult } from "express-validator";

export const createStoryValidator = [
  body("mediaType")
    .trim()
    .toLowerCase()
    .isIn(["image", "video"])
    .withMessage("Media type must be image or video"),

  ,
  body("music.title").optional().isString().withMessage("title must be string"),

  body("music.artist")
    .optional()
    .isString()
    .withMessage("Artist name must be a string"),

  body("music.startTime")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Start time must be a positive number"),

  body("music.duration")
    .optional()
    .isFloat({ min: 0, max: 60 })
    .withMessage("Music duration must be between 1 and 60 seconds"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];
