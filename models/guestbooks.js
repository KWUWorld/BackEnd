'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guestbooks extends Model {
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
  Guestbooks.init(
    {
      guestBookId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
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
      guestBook: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Guestbooks',
    }
  );
  return Guestbooks;
};