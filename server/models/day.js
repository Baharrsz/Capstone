"use strict";
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define(
    "Day",
    {
      events: DataTypes.JSON,
      goals: DataTypes.JSON,
      schedule: DataTypes.JSON
    },
    {}
  );
  Day.associate = function(models) {
    // associations can be defined here
    Day.belongsTo(models.Year);
    Day.belongsTo(models.Month);
    Day.belongsTo(models.Week);
  };
  return Day;
};
