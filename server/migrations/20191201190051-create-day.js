"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Days", {
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
        //When I uncomment these lines, I cannot write into the fields of the days (other than id, updatedAt, and createdAt). It gives me some error about constraints and foreign keys.
        //I don't know why. I should read about it later.
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
      },
      weekId: {
        type: Sequelize.STRING
        // references: {
        //   model: "Weeks",
        //   key: "id"
        // }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Days");
  }
};
