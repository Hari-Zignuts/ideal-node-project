const { default: AppError } = require("../utils/appError");

const restrictTo = (...userType) => {
    return (req, res, next) => {
        if (!userType.includes(req.user.userType)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        return next();
    };
}

module.exports = restrictTo;