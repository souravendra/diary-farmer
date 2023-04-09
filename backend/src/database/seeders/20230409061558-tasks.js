'use strict';
const uuid = require('uuid');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        id: uuid.v4(),
        description: 'Milk Cow A1C23',
        type: 'Milking',
        status: 'Assigned',
        userId: 'e035e3ed-e209-4878-8cf6-0ac7995c9b54',
        createdBy: '952e9820-882a-42e9-bd64-cb8da0b25c30',
        deletedAt: null,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      {
        id: uuid.v4(),
        description: 'Milk Cow A2C03',
        type: 'Milking',
        status: 'Assigned',
        userId: 'e035e3ed-e209-4878-8cf6-0ac7995c9b54',
        createdBy: '952e9820-882a-42e9-bd64-cb8da0b25c30',
        deletedAt: null,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      {
        id: uuid.v4(),
        description: 'Milk Cow A1C24',
        type: 'Milking',
        status: 'Assigned',
        userId: 'e035e3ed-e209-4878-8cf6-0ac7995c9b54',
        createdBy: '952e9820-882a-42e9-bd64-cb8da0b25c30',
        deletedAt: null,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      {
        id: uuid.v4(),
        description: 'Stable maintenance on Ludhiana farm',
        type: 'Maintenance',
        status: 'In-Progress',
        userId: 'e035e3ed-e209-4878-8cf6-0ac7995c9b54',
        createdBy: '952e9820-882a-42e9-bd64-cb8da0b25c30',
        deletedAt: null,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
      {
        id: uuid.v4(),
        description: 'Nurse Cow A0C23',
        type: 'Nursing',
        status: 'Assigned',
        userId: 'f4287530-007b-45ae-962d-e8d36cba2bb4',
        createdBy: '952e9820-882a-42e9-bd64-cb8da0b25c30',
        deletedAt: null,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
