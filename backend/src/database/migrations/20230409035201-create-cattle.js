'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cattle', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      serial_code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      farm: { type: Sequelize.STRING },
      ownerId: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      health: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      utilization: {
        type: Sequelize.FLOAT,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cattle');
  },
};
