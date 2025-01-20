const { Sequelize } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const User = require("../db/models/user");

const getAllUsers = catchAsync(
    async (req, res) => {
        const result = await User.findAll({
            where: {
                userType: {
                    [Sequelize.Op.ne]: '0' // exclude admin || operator not equal to 0
                }
            },
            attributes: {
                exclude: ['password']
            }
        });
        if (!result) {
            throw new AppError('No users found', 404);
        }
        return res.status(200).json({
            status: 'success',
            message: 'All users',
            data: result
        });
    }
)

module.exports = { getAllUsers };