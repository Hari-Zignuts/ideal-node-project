const { default: AppError } = require("../utils/appError");

const sendErrorDev = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message;
    const stack = err.stack;

    res.status(statusCode).json({
        status,
        message,
        stack
    })
}

const sendErrorProd = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message;

    if (err.isOperational) {
        res.status(statusCode).json({
            status,
            message,
        })
    } else {
        console.error('ERROR: ', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        })
    }
}

const globalErrorHandler = (err, req, res, next) => {
    if(err.name === 'JsonWebTokenError'){
        err = new AppError('Invalid token. Please login again', 401);
    }
    if(err.name === 'SequelizeValidationError'){
        err = new AppError(err.errors[0].message, 400);
    }
    if(err.name === 'SequelizeUniqueConstraintError'){
        err = new AppError(err.errors[0].message, 400);
    }
    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, req, res);
    }
    sendErrorProd(err, req, res);
}

module.exports = globalErrorHandler;