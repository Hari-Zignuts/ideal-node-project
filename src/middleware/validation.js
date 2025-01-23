const catchAsync = require("../utils/catchAsync");
const {
  validateSignupInput,
  validateLoginInput,
} = require("../utils/validation");

/**
 * @function validateRequestBodyMiddleware
 * @description Middleware to validate and sanitize request body fields.
 */

const validateSignupInputMiddleware = catchAsync(
  async (req, res, next) => {
  req.body = validateSignupInput(req.body);
  next();
});

/**
 * @function validateLoginInputMiddleware
 * @description Middleware to validate and sanitize login request body fields.
 */

const validateLoginInputMiddleware = catchAsync(
  async (req, res, next) => {
  req.body = validateLoginInput(req.body);
  next();
});


module.exports = {
  validateSignupInputMiddleware,
  validateLoginInputMiddleware,
};
