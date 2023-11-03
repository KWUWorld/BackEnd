'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ilchonpyungs', {
      ilchonpyungId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'cascade',
      },
      writerId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      nick: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      ilchonpyung: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Ilchonpyungs');
  },
};