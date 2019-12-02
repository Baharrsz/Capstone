const express = require("express");
const router = express.Router();
// const weeks = require("../models").Week;
const days = require("../models").Day;
const format = require("date-fns/format");
const parse = require("date-fns/parse");

router.get("/", (req, res) => {
  days
    .findOne({
      where: { id: req.originalUrl.slice(1) }
    })
    .then(day => res.json(day));
});

router.post("/", (req, res) => {
  const date = parse(req.originalUrl, "'/'yyyy/M/d", new Date());
  const year = format(date, "y");
  const month = format(date, "M");
  const week = format(date, "I");

  console.log(date);

  days
    .findOrCreate({
      where: {
        id: req.originalUrl.slice(1)
      }
    })
    .then(([day, whetherCreated]) => {
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
