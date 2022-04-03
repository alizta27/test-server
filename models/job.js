'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.hasMany(models.Skill, { foreignKey: "jobId" });
      Job.belongsTo(models.Company, { foreignKey: "companyId" });
      Job.belongsTo(models.User, { foreignKey: "authorId" });
    }
  }
  Job.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required"
        },
        notNull: {
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Company is required"
        },
        notNull: {
          msg: "Company is required"
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Author is required"
        },
        notNull: {
          msg: "Author is required"
        }
      }
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Type is required"
        },
        notNull: {
          msg: "Type is required"
        },
        isIn: {
          args: [['Full Time', 'Part Time', 'Freelance']],
          msg: "Job type is not valid"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};