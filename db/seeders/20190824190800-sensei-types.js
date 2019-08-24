"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Sensei_types", [
      { name: "DOG", createdAt: new Date(), updatedAt: new Date() },
      { name: "TIGGER", createdAt: new Date(), updatedAt: new Date() },
      { name: "DRAGON", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Sensei_types", null, {});
  }
};
