'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId' });
    }
  }
  Counts.init(
    {
      id: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        type: DataTypes.INTEGER,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // 미니홈피 주인의 userId
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Counts',
    }
  );
  return Counts;
};