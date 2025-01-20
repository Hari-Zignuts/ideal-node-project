const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

const Project = sequelize.define('Project',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title cannot be null'
        },
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    isFeatured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'ifFeatured must be either true or false'
        }
      }
    },
    productImage: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product Image cannot be null'
        }
      }
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be null'
        },
        isDecimal: {
          msg: 'Price must be a decimal'
        }
      }
    },
    shortDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Short description cannot be null'
        },
        notEmpty: {
          msg: 'Short description cannot be empty'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description cannot be null'
        },
        notEmpty: {
          msg: 'Description cannot be empty'
        }
      }
    },
    productUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product URL cannot be null'
        },
        notEmpty: {
          msg: 'Product URL cannot be empty'
        },
        isUrl: {
          msg: 'Product URL must be a URL'
        }
      }
    },
    category: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category cannot be null'
        }
      }
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tags cannot be null'
        }
      }
    },
    createdBy: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'Project',
  }
)

module.exports = Project;