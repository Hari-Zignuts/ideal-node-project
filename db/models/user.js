'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const { default: AppError } = require('../../utils/appError');
const project = require('./project');
const Project = require('./project');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     userType: DataTypes.ENUM,
//     firstName: DataTypes.STRING,
//     lastNam: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

const User = sequelize.define('User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User type is required'
        },
        notEmpty: {
          msg: 'User type is required'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName is required'
        },
        notEmpty: {
          msg: 'firstName is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName is required'
        },
        notEmpty: {
          msg: 'lastName is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email is required'
        },
        notEmpty: {
          msg: 'email is required'
        },
        isEmail: {
          msg: 'Invalid email'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required'
        },
        notEmpty: {
          msg: 'password is required'
        }
      }
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,

      // setter method for confirmPassword
      // match the password with confirm password and hash the password before saving it to the database
      set(value) {
        if (value === this.password) {

          if (this.password.length < 7) {
            throw new AppError('Password must be at least 7 characters long', 400)
          }
          
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError('Password and confirm password does not match', 400)
        }
      }

    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'User',
  }
);

User.hasMany(Project, {foreignKey: 'createdBy'});
Project.belongsTo(User, {foreignKey: 'createdBy'});

module.exports = User;  