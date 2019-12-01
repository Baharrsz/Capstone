const express = require("express");
const cors = require("cors");

app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/:year", require("./routes/yearController"));
app.use("/:year/week/:week", require("./routes/weekController"));
app.use("/:year/:month", require("./routes/monthController"));
app.use("/:year/:month/:day", require("./routes/dayController"));

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
