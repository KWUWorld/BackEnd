'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diaries extends Model {
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
  Diaries.init(
    {
      diaryId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dirImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Diaries',
    }
  );
  return Diaries;
};