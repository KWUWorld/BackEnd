'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    userId:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender:{ 
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth:{
      type: DataTypes.STRING,
      allowNull: true
    },
    intro: {
      type: DataTypes.STRING,
      allowNull:true
    },
    today: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};