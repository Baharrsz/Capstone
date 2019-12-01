"use strict";
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define(
    "Week",
    {
      events: DataTypes.JSON,
      goals: DataTypes.JSON,
      schedule: DataTypes.JSON
    },
    {}
  );
  Week.associate = function(models) {
    // associations can be defined here
    Week.belongsTo(models.Year);
    Week.hasMany(models.Day);
  };
  return Week;
};
