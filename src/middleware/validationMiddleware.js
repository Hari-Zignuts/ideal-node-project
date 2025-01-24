const AppError = require("../utils/appError");

/**
 * @function validate
 * @description Middleware to validate request body against Joi schema.
 * @param {Object} schema - Joi schema to validate against.
 * @returns {Function} Express middleware function.
 */

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Format Joi error messages
    const errors = error.details.map((err) => err.message);
    return next(new AppError(errors.join(", "), "BAD_REQUEST"));
  }

  req.body = value; // Assign sanitized values back to req.body
  next();
};

module.exports = validate;
