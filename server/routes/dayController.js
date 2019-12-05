const express = require("express");
const router = express.Router();
const format = require("date-fns/format");
const parse = require("date-fns/parse");
const days = require("../models").Day;
const weeks = require("../models").Week;
const months = require("../models").Month;
const years = require("../models").Year;

router.get("/", (req, res) => {
  days
    .findOne({
      where: { id: req.originalUrl.slice(1) },
      include: [
        { model: weeks, as: "Week" },
        { model: months, as: "Month" },
        { model: years, as: "Year" }
      ]
    })
    .then(day => res.json(day));
});

router.post("/", (req, res) => {
  const date = parse(req.originalUrl, "'/'yyyy/M/d", new Date());
  const year = format(date, "y");
  const month = format(date, "M");
  const week = format(date, "w");

  days
    .findOrCreate({
      where: {
        id: req.originalUrl.slice(1)
      }
    })
    .then(([day, whetherCreated]) => {
      console.log(req.body.events);
      day.update({
        YearId: Number(year),
        MonthId: `${year}/${month}`,
        WeekId: `${year}/week/${week}`,
        events: req.body.events,
        goals: req.body.goals,
        schedule: req.body.schedule
      });
      res.send(day);
    });
});

router.delete("/", (req, res) => {
  days
    .destroy({ where: { id: req.originalUrl.slice(1) } })
    .then(d => res.json(d));
});

module.exports = router;
