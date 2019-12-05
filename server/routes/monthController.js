const express = require("express");
const router = express.Router();
const months = require("../models").Month;
const days = require("../models").Day;
const years = require("../models").Year;

router.get("/", (req, res) => {
  const monthId = req.originalUrl.slice(1);
  months
    .findOne({
      where: { id: monthId },
      include: [
        { model: days, as: "Days" },
        { model: years, as: "Year" }
      ]
    })
    .then(month => res.json(month));
});

router.post("/", (req, res) => {
  const year = Number(req.originalUrl.split("/")[1]);
  const monthId = req.originalUrl.slice(1);

  months
    .findOrCreate({
      where: {
        id: monthId
      }
    })
    .then(([month, whetherCreated]) => {
      month.update({
        YearId: year,
        events: req.body.events,
        goals: req.body.goals,
        schedule: req.body.schedule
      });
      res.send(month);
    });
});

router.delete("/", (req, res) => {
  months.destroy({ where: { id: monthId } }).then(d => res.json(d));
});

module.exports = router;
