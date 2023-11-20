'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ilchonpyungs extends Model {
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
  Ilchonpyungs.init(
    {
      ilchonpyungId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true,
        type: DataTypes.INTEGER,
      },
      // 미니홈피 주인의 userId
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      // 미니홈피 방문자의 userId
      writerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 미니홈피 방문자의 name
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nick: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ilchonpyung: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Ilchonpyungs',
    }
  );
  return Ilchonpyungs;
};