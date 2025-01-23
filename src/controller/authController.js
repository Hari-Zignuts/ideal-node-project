const bcrypt = require("bcrypt");
const User = require("../db/models/user");

// utils imports
const AppError = require("../utils/appError");
const { gnerateToken } = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/responseHelper");

/**
 * @function singup
 * @description Registers a new user with the provided details.
 * @author Hari Malam
 * @validator validateSignupInputMiddleware (middleware/validation.js) added to validate request.body in the route (router/authRoute.js)
 * @path POST /api/v1/auth/signup
 * @module auth
 * @headers accepted-language
 * @request {body} userType, firstName, lastName, email, password
 * @response {Object} data - Response data, includes user details and token on success.
 * @response {String} message - Response message.
 * @response {String} status - Response status code.
 */

const singup = catchAsync(async (req, res, next) => {
  const { userType, firstName, lastName, email, password } = req.body;

  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // create a new user with the provided details
  const newUser = await User.create({
    userType,
    firstName,
    lastName,
    email,
    password : hashedPassword
  });

  // check if user creation failed
  if (!newUser) {
    next(new AppError("USER_CREATION_FAILED", "INTERNAL_SERVER_ERROR"));
  }

  // remove sensitive data from the response
  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  // generate jwt token with user's id
  result.token = gnerateToken({ id: result.id});

  // send success response with user details and token
  return sendResponse(res, "CREATED", "USER_CREATED", result);
});

/**
 * @function login
 * @description Authenticates a user by email and password.
 * @author Hari Malam
 * @validator validateLoginInputMiddleware (middleware/validation.js) added to validate request.body in the route (router/authRoute.js)
 * @path POST /api/v1/auth/login
 * @module auth
 * @headers accepted-language
 * @request {body} email, password
 * @response {Object} data - Response data, includes token on success.
 * @response {String} message - Response message.
 * @response {String} status - Response status code.
 */

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // find user by email in the database
  const result = await User.findOne({ where: { email } });

  // check if user exists and password is correct
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("INVALID_CREDENTIALS", "UNAUTHORIZED"));
  }

  // generate jwt token with user's id
  const token = gnerateToken({ id: result.id });

  // send success response with generated token
  return sendResponse(res, "OK", "LOGIN_SUCCESS", { token });
});

module.exports = {
  singup,
  login,
};
