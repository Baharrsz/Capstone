const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  res.send(req.originalUrl);
});

module.exports = router;
