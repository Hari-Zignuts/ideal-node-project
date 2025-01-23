const User = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');

/**
 * @function authentication
 * @description Middleware to authenticate a user using jwt token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Function} - Express middleware function.
 * @throws {AppError} - if token is invalid or user does not exist.
 */

const authentication = catchAsync(
    async (req, res, next) => {
        // get token from header
        let isToken = '';
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Bearer token
            isToken = req.headers.authorization.split(' ')[1];
        }

        // check if token exists
        if(!isToken) {
            throw new AppError("LOGIN_REQUIRED", "UNAUTHORIZED");
        }

        // token verification
        const tokenDetail = jwt.verify(isToken, process.env.JWT_SECRET_KEY);

        // get user details from db using token
        const freshUser = await User.findByPk(tokenDetail.id);

        // check if user exists
        if(!freshUser) {
            throw new AppError("USER_NOT_FOUND", "BAD_REQUEST");
        }

        // set user to req.user
        req.user = freshUser;

        next();
    }
)

module.exports = authentication;