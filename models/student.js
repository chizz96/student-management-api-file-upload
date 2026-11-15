'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },

      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING,
         allowNull: false
      },
      galleryImages: {
        type:DataTypes.JSON,
        defaultValue: []
         
      },
      passportImage: {
        type: DataTypes.STRING,
       
      },
      identityCardImage: {
        type: DataTypes.STRING,
     
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'Students',
    timestamps: true
  });
  return Student;
};