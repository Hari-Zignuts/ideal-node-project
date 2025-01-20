const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const { default: AppError } = require('../utils/appError');
const { gnerateToken } = require('../utils/jwt');


const singup = catchAsync(
    async (req, res, next) => {
        const body = req.body;

        if (!['1', '2'].includes(body.userType)) {
            throw new AppError('Invalid user type', 400);
        }

        const newUser = await User.create({
            userType: body.userType,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword
        });

        if(!newUser) {
            // both are same
            // return next(new AppError('Failed to create user', 500));  
            throw new AppError('Failed to create user', 500);
        }

        const result = newUser.toJSON();
        delete result.password;
        delete result.deletedAt;

        result.token = gnerateToken({
            id: result.id,
        })

        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: result
        });
    }
)

const login = catchAsync(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }

        const result = await User.findOne({ where: { email } });
        const isPasswordMatch = result ? await bcrypt.compare(password, result.password) : false;

        if (!result || !isPasswordMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = gnerateToken({
            id: result.id
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                token
            }
        })
    }
);


module.exports = {
    singup,
    login,
}       