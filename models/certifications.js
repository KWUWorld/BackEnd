'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Certifications.init({
    certificationId:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    certificationNum:{
      type:DataTypes.INTEGER,
      allowNull:false,
    } ,
    certificationCheck:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Certifications',
  });
  return Certifications;
};