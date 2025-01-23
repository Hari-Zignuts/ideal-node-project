/**
 * @function catchAsync
 * @description Catches async errors and passes them to the next middleware.
 * @param {Function} fn - The async function to be executed.
 * @returns {Function} - Returns an error handler function.
 */

const catchAsync = (fn) => {
  const errorHandler = (req, res, next) => {
    // async function is executed and any error is passed to the next middleware
    fn(req, res, next).catch(next);
  };
  return errorHandler;
};

module.exports = catchAsync;
