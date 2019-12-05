"use strict";
module.exports = (sequelize, DataTypes) => {
  const Month = sequelize.define(
    "Month",
    {
      events: DataTypes.JSON,
      goals: DataTypes.JSON,
      schedule: DataTypes.JSON
    },
    {}
  );
  Month.associate = function(models) {
    // associations can be defined here
    Month.belongsTo(models.Year);
    Month.hasMany(models.Week);
    Month.hasMany(models.Day);
  };
  return Month;
};
