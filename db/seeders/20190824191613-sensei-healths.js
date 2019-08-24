"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Sensei_healths", [
      { name: "DEAD", createdAt: new Date(), updatedAt: new Date() },
      { name: "SICK", createdAt: new Date(), updatedAt: new Date() },
      { name: "FINE", createdAt: new Date(), updatedAt: new Date() },
      { name: "HAPPY", createdAt: new Date(), updatedAt: new Date() },
      { name: "PROUD", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Sensei_healths", null, {});
  }
};
