require("dotenv").config();
require('./database');

const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use(require("./routes/url.routes"));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
