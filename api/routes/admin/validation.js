const {
  query,
  param,
  body,
  oneOf,
  validationResult
} = require("express-validator");

const logger = require("../../config/logger");

const PROJECT_TITLE_MAX_LENGTH = 30;
const PROJECT_SHORT_DESCRIPTION_MAX_LENGTH = 500;
const PROJECT_FULL_DESCRIPTION_MAX_LENGTH = 2000;
const SEGMENT_HEADER_MAX_LENGTH = 30;
const SEGMENT_TEXT_MAX_LENGHT = 2000;

const validateRange = query("range").matches(/^\[[0-9]\,[0-9]\]*$/);
// const validateRange = query("range").matches(/^\[[0-9]\-[0-9]\]*$/);

const validateId = param("id").isString();

const validateImage64 = body("image64")
  .isString()
  .isBase64();

const validateImage64Optional = body("image64")
  .isString()
  .isBase64()
  .optional({ nullable: true });

const validateImage64Extra = body("image64Extra")
  .isString()
  .isBase64()
  .optional({ nullable: true });

const validateHeaderText = [
  body("header")
    .isString()
    .isLength({ min: 1, max: SEGMENT_HEADER_MAX_LENGTH }),
  body("text")
    .isString()
    .isLength({ mix: 1, max: SEGMENT_TEXT_MAX_LENGHT })
];

const sharedProjectValidation = [
  body("title")
    .isString()
    .isLength({ min: 1, max: PROJECT_TITLE_MAX_LENGTH }),
  body("shortDescription")
    .isString()
    .isLength({ min: 1, max: PROJECT_SHORT_DESCRIPTION_MAX_LENGTH }),
  body("fullDescription")
    .isString()
    .isLength({ min: 1, max: PROJECT_FULL_DESCRIPTION_MAX_LENGTH }),
  body("links")
    .isArray()
    .optional({ nullable: true }),
  body("links.*.text").isString(),
  body("links.*.url").isString()
];

const reviewValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { errors } = result;
    const createMessage = errors =>
      `${errors
        .map(error => `"${error.param}"`)
        .join(", ")} value(s) failed validation.`;
    const message = createMessage(errors);
    logger.debug(message);
    return res.status(400).json({ message });
  }
  next();
};

module.exports = {
  validateRange,
  validateId,
  validateImage64,
  validateImage64Optional,
  validateImage64Extra,
  validateHeaderText,
  sharedProjectValidation,
  reviewValidation
};
