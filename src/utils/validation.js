const validator = require("validator");
const AppError = require("./appError");

/**
 * @function validateSignupInput
 * @author Hari Malam
 * @description Validates, sanitizes and remove any unwanted fields (confirmPassword) the incoming fields from req.body.
 * @param {Object} data - The request body containing fields.
 * @returns {Object} sanitized and validated fields.
 * @throws {AppError} Throws an error if any validation fails.
 */

const validateSignupInput = (data) => {
  const { userType, firstName, lastName, email, password, confirmPassword } = data;

  // Validate and sanitize email
  if (!email || !validator.isEmail(email)) {
    throw new AppError("INVALID_EMAIL_FORMAT", "BAD_REQUEST");
  }
  const sanitizedEmail = validator.normalizeEmail(email.trim());

  // Validate and sanitize first name
  if (!firstName || !validator.isLength(firstName.trim(), { min: 1 })) {
    throw new AppError("FIRST_NAME_REQUIRED", "BAD_REQUEST");
  }
  const sanitizedFirstName = validator.escape(firstName.trim());

  // Validate and sanitize last name
  if (!lastName || !validator.isLength(lastName.trim(), { min: 1 })) {
    throw new AppError("LAST_NAME_REQUIRED", "BAD_REQUEST");
  }
  const sanitizedLastName = validator.escape(lastName.trim());

  // Validate password
  if (!password || password.length < 6) {
    throw new AppError("PASSWORD_TOO_SHORT", "BAD_REQUEST");
  }
  const sanitizedPassword = password.trim();

  // Validate confirm password
  if (password !== confirmPassword) {
    throw new AppError("PASSWORDS_MISMATCH", "BAD_REQUEST");
  }

  // Validate user type (if applicable)
  const validUserTypes = ["1", "2"]; // Example user types, adjust as needed
  if (!userType || !validUserTypes.includes(userType.trim())) {
    throw new AppError("INVALID_USER_TYPE", "BAD_REQUEST");
  }
  const sanitizedUserType = userType.trim();

  // Return sanitized values
  return {
    userType: sanitizedUserType,
    firstName: sanitizedFirstName,
    lastName: sanitizedLastName,
    email: sanitizedEmail,
    password: sanitizedPassword,
  };
};

/**
 * @function validateLoginInput
 * @author Hari Malam
 * @description Validates and sanitizes the incoming fields from req.body.
 * @param {Object} data - The request body containing fields.
 * @returns {Object} sanitized and validated fields.
 * @throws {AppError} Throws an error if any validation fails.
 */

const validateLoginInput = (data) => {
  const { email, password } = data;

  // Validate and sanitize email
  if (!email || !validator.isEmail(email)) {
    throw new AppError("INVALID_EMAIL_FORMAT", "BAD_REQUEST");
  }
  const sanitizedEmail = validator.normalizeEmail(email.trim());

  // Validate password
  if (!password || password.length < 6) {
    throw new AppError("PASSWORD_TOO_SHORT", "BAD_REQUEST");
  }
  const sanitizedPassword = password.trim();

  // Return sanitized values
  return {
    email: sanitizedEmail,
    password: sanitizedPassword,
  };
}

module.exports = { validateSignupInput, validateLoginInput };
