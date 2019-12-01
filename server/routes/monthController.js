const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  res.send(`monthController: ${req.originalUrl}`);
});

module.exports = router;
