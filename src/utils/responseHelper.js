const httpStatusCodes = require('../constants/httpStatusCodes');

/**
 * @function sendResponse
 * @description Send response to client.
 * @param {Object} res - Express response object.
 * @param {String} status - Response status code.
 * @param {String} message - Response message key.
 * @param {Object} data - Response data.
 * @param {Error} error - Error object.
 */

const sendResponse = (res, status, message, data, error) => {
  // get status code from httpStatusCodes
  const statusCode = httpStatusCodes[status] || 500;

  const localizedMessages = res.__('messages');
  const localizedMessage = localizedMessages[message] || message;

  // send response
  return res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
    message: localizedMessage,
    data,
  });
}

module.exports = sendResponse;