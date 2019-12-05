const express = require("express");
const router = express.Router();
const format = require("date-fns/format");
const parse = require("date-fns/parse");
const weeks = require("../models").Week;
const days = require("../models").Day;
const months = require("../models").Month;
const years = require("../models").Year;

router.get("/", (req, res) => {
  const weekId = req.originalUrl.slice(1);
  weeks
    .findOne({
      where: { id: weekId },
      include: [
        { model: days, as: "Days" },
        { model: months, as: "Month" },
        { model: years, as: "Year" }
      ]
    })
    .then(week => res.json(week));
});

router.post("/", (req, res) => {
  const weekId = req.originalUrl.slice(1);
  const year = Number(req.originalUrl.split("/")[1]);
  const week = Number(req.originalUrl.split("/")[3]);

  //Deciding the monthId of the week:
  //A week belongs to the month that include most of the week's days, i.e. includes the middle day of the week.
  const date = parse(`${year}/${week}/4`, "Y/w/e", new Date(), {
    weekStartsOn: 1
  });
  const month = format(date, "M");

  weeks
    .findOrCreate({
      where: {
        id: weekId
      }
    })
    .then(([week, whetherCreated]) => {
      week.update({
        YearId: Number(year),
        MonthId: `${year}/${month}`,
        events: req.body.events,
        goals: req.body.goals,
        schedule: req.body.schedule
      });
      res.json(week);
    });
});

router.delete("/", (req, res) => {
  weeks.destroy({ where: { id: weekId } }).then(d => res.json(d));
});

module.exports = router;
