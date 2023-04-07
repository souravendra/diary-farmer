'use strict';
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password', 8);
    return queryInterface.bulkInsert('Users', [
      {
        id: uuid.v4(),
        name: 'Jeevan Das',
        email: 'owner@farm.com',
        role: 'FARM_OWNER',
        password_hash: await bcrypt.hash('password', 8),
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      {
        id: uuid.v4(),
        name: 'Atul Singh',
        email: 'worker@farm.com',
        role: 'FARM_WORKER',
        password_hash: await bcrypt.hash('password', 8),
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
