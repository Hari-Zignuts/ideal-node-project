/**
 * @class AppError
 * @extends Error
 * @description A class representing an error in the application.
 * @param {String} message - The error message.
 * @param {Number} statusCode - The status code of the error.
 * @param {Boolean} isOperational - Indicates if the error is operational.
 * @param {String} status - The status of the error.
 * @param {String} stack - The stack trace of the error.
 * @returns {AppError} An instance of the AppError class.
 */

const httpStatusCodes = require('../constants/httpStatusCodes');

class AppError extends Error {
    constructor(message, status) {
        const statusCode = httpStatusCodes[status] || 500;
        super(message);

        this.statusCode = statusCode;

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

