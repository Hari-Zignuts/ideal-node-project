const User = require("../db/models/user");
const { default: AppError } = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');

const authentication = catchAsync(
    async (req, res, next) => {
        // get token from header
        let isToken = '';
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Bearer token
            isToken = req.headers.authorization.split(' ')[1];
        }
        if(!isToken) {
            throw new AppError('Please login to access this route', 401);
        }

        // token verification
        const tokenDetail = jwt.verify(isToken, process.env.JWT_SECRET_KEY);

        // get user details from db using token
        const freshUser = await User.findByPk(tokenDetail.id);

        if(!freshUser) {
            throw new AppError('User no longer exists', 400);
        }
        req.user = freshUser;
        next();
    }
)

module.exports = authentication;