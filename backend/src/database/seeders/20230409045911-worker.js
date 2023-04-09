'use strict';
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuid.v4(),
        name: 'Neeta Singh',
        email: 'doctor@farm.com',
        role: 'FARM_DOCTOR',
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
