const AppError = require("../utils/appError");
const sendResponse = require("../utils/responseHelper");

// helper function to send error in development
const sendErrorDev = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const stack = err.stack;

  sendResponse(res, statusCode, message, stack, err);
  // res.status(statusCode).json({
  //   status,
  //   message,
  //   stack,
  // });
};

// helper function to send error in production
const sendErrorProd = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;

  if (err.isOperational) {
    sendResponse(res, statusCode, message, null, err);
    // res.status(statusCode).json({
    //   status,
    //   message,
    // });
  } else {
    console.error("ERROR: ", err);
    sendResponse(res, 500, "Something went very wrong", null, err);
    // res.status(500).json({
    //   status: "error",
    //   message: "Something went very wrong",
    // });
  }
};

/**
 * @function globalErrorHandler
 * @description Global error handler middleware.
 * @param {Error} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */

const globalErrorHandler = (err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    err = new AppError("INVALID_TOKEN", "UNAUTHORIZED");
  }
  if (err.name === "SequelizeValidationError") {
    err = new AppError(err.errors[0].message, "BAD_REQUEST");
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    err = new AppError(err.errors[0].message, "BAD_REQUEST");
  }

  // check if error is in development or production
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, req, res);
  }
  return sendErrorProd(err, req, res);
};

module.exports = globalErrorHandler;
