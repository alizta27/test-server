'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const data = require('../data/companies.json').map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Companies', data, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Companies', null, {});

  }
};
