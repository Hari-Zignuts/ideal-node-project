const AppError = require("../utils/appError");

/**
 * @function restrictTo
 * @description Middleware to restrict access to a route to only specified user types.
 * @param  {...string} userType - User types that can access the route.
 * @returns {Function} - Express middleware function.
 */

const restrictTo = (...userType) => {
  return (req, res, next) => {
    // check if the user type is in the array of user types that can access the route
    if (!userType.includes(req.user.userType)) {
      return next(
        new AppError("PERMISSION_DENIED", "FORBIDDEN")
      );
    }
    return next();
  };
};

module.exports = restrictTo;
