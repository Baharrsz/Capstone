const express = require("express");
const router = express.Router();
const weeks = require("../models").Week;

console.log(weeks);

router.get("/", (req, res) => {
  console.log(req);
  res.send(`weekController: ${req.originalUrl}`);
});

router.post("/", (req, res) => {
  const year = req.originalUrl.split("/")[1];

  weeks
    .findOrCreate({
      where: {
        id: req.originalUrl.slice(1)
      }
    })
    .then(([week, whetherCreated]) => {
      week.update({
        yearId: year,
        events: req.body.events,
        goals: req.body.goals,
        schedule: req.body.schedule
      });
      res.send(week);
    });
});

router.delete("/", (req, res) => {
  weeks
    .destroy({ where: { id: req.originalUrl.slice(1) } })
    .then(d => res.json(d));
});

module.exports = router;
