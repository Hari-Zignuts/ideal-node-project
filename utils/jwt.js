const jwt = require('jsonwebtoken');

const gnerateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


module.exports = {
    gnerateToken
}