'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ilchonpyungs, {
        as: 'Ilchonpyungs',
        foreignKey: 'userId',
      });
      this.hasMany(models.Diaries, {
        as: 'Diaries',
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'userId',
      });
      this.hasMany(models.Guestbooks, {
        as: 'Guestbooks',
        foreignKey: 'userId',
      });
      // this.hasMany(models.Ilchons, {
      //   as: 'Ilchons',
      //   foreignKey: 'userId',
      // });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default',
      },
      today: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      snsId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};