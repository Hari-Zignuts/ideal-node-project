const User = require("../db/models/user");
const { Sequelize } = require("sequelize");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/responseHelper");

/**
 * @function getAllUsers
 * @description Controller to get all users.
 * @author Hari Malam
 * @path GET /api/v1/users
 * @module user
 * @response {Object} data - Response data, includes all users.
 * @response {String} message - Response message.
 * @response {String} status - Response status code.
 */

const getAllUsers = catchAsync(async (req, res) => {
  // get all users except admin and operator
  const result = await User.findAll({
    where: {
      userType: {
        [Sequelize.Op.ne]: "0", // exclude admin || operator not equal to 0
      },
    },
    attributes: {
      exclude: ["password"],
    },
  });

  // check if no users found
  if (!result) {
    throw new AppError("No users found", "NOT_FOUND");
  }

  // send success response with all users
  return sendResponse(res, "OK", "GET_ALL_USERS_SUCCESS", result);
});

module.exports = { getAllUsers };
