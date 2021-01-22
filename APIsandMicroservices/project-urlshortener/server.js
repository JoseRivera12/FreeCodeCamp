require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sha1 = require("js-sha1");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: String, required: true },
});

const Url = mongoose.model("Url", urlSchema);

const saveURL = (url, short_url) => {
  const urlShorted = new Url({ original_url: url, short_url: short_url });
  urlShorted.save((err, data) => {
    if (err) return console.error(err);
  });
};

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl/new", (req, res) => {
  let url = req.body.url
  let regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  if(regex.test(url)){
    let short_url = sha1(url).substring(0, 4);
    saveURL(url, short_url);
    res.json({ original_url: url, short_url: short_url });
  }
  res.json({ error: "Invalid URL" })
});

app.get("/api/shorturl/:id", (req, res) => {
  let idUrl = req.params.id;
  Url.findOne({ short_url: idUrl }, (err, data) => {
    if (err) return console.error(err);
    res.redirect(data.original_url);
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
