'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => [
    queryInterface.addColumn('Tasks', 'createdBy', {
      type: Sequelize.UUID,
    }),
  ],

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Tasks', 'createdBy');
  },
};
