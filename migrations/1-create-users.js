'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      birth: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      hb: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      intro: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default',
      },
      sixwords: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default',
      },
      today: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      refreshToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
      },
      snsId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
