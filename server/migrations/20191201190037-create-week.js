"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Weeks", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      events: {
        type: Sequelize.JSON
      },
      goals: {
        type: Sequelize.JSON
      },
      schedule: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      yearId: {
        type: Sequelize.INTEGER
        // references: {
        //   model: "Years",
        //   key: "id"
        // }
      },
      monthId: {
        type: Sequelize.STRING
        // references: {
        //   model: "Months",
        //   key: "id"
        // }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Weeks");
  }
};
