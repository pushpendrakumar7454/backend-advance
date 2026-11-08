
import { body, validationResult } from "express-validator";

export const createPostValidator = [
  body("caption")
    .optional()
    .trim()
    .isLength({ max: 2200 })
    .withMessage("Caption must not exceed 2200 characters"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("images.*.url")
    .optional()
    .isURL()
    .withMessage("Invalid image URL"),

  body("images.*.fileId")
    .optional()
    .isString(),

  body("videos")
    .optional()
    .isArray()
    .withMessage("Videos must be an array"),

  body("videos.*.url")
    .optional()
    .isURL()
    .withMessage("Invalid video URL"),

  body("videos.*.fileId")
    .optional()
    .isString(),

  body("song.title")
    .optional()
    .isString(),

  body("song.artist")
    .optional()
    .isString(),

  body("song.audioUrl")
    .optional()
    .isURL()
    .withMessage("Invalid song URL"),

  body("song.duration")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid song duration"),

  body("song.startTime")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid song start time"),

  body("hashtags")
    .optional()
    .isArray()
    .withMessage("Hashtags must be an array"),

  body("hashtags.*")
    .optional()
    .isString()
    .trim(),

  body("location.name")
    .optional()
    .isString(),

  body("location.latitude")
    .optional()
    .isFloat({ min: -90, max: 90 }),

  body("location.longitude")
    .optional()
    .isFloat({ min: -180, max: 180 }),

  (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errores: errores.array(),
      });
    }

    next();
  },
];
