"use strict";
module.exports = (sequelize, DataTypes) => {
  const Year = sequelize.define(
    "Year",
    {
      events: DataTypes.JSON,
      goals: DataTypes.JSON,
      schedule: DataTypes.JSON
    },
    {}
  );
  Year.associate = function(models) {
    // associations can be defined here
    Year.hasMany(models.Month);
    Year.hasMany(models.Week);
    Year.hasMany(models.Day);
  };
  return Year;
};
