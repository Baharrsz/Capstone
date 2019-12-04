const express = require("express");
const router = express.Router();
const weeks = require("../models").Week;
const days = require("../models").Day;

router.get("/", (req, res) => {
  const weekId = req.originalUrl.slice(1);
  weeks
    .findOne({
      where: { id: weekId },
      include: [{ model: days, as: "Days" }]
    })
    .then(week => res.json(week));
});

router.post("/", (req, res) => {
  const year = Number(req.originalUrl.split("/")[1]);

  weeks
    .findOrCreate({
      where: {
        id: weekId
      }
    })
    .then(([week, whetherCreated]) => {
      week.update({
        YearId: year,
        events: req.body.events,
        goals: req.body.goals,
        schedule: req.body.schedule
      });
      res.send(week);
    });
});

router.delete("/", (req, res) => {
  weeks.destroy({ where: { id: weekId } }).then(d => res.json(d));
});

module.exports = router;
