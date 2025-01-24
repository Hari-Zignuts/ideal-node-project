const jwt = require('jsonwebtoken');

/**
 * @function gnerateToken
 * @description Function to generate JWT token.
 * @param {Object} payload - Payload to be encrypted in the token.
 * @returns {String} - Returns a JWT token.
 */

const gnerateToken = (payload) => {
    // generate jwt token with the payload
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

module.exports = { gnerateToken }