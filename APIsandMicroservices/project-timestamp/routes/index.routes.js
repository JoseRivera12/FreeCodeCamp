const router = require("express").Router();

// test API
router.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

//Get now time in unix and utc format
router.get("/api/timestamp", function (req, res) {
  res.json({ "unix": Date.now(), "utc": new Date().toUTCString() });
});

//receive unix time date and return in same format
router.get("/api/timestamp/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;
  //Is unixtime?
  if (!isNaN(dateParam))
    date = new Date(parseInt(dateParam));
  else
    date = new Date(dateParam)
  if (date.toString() === "Invalid Date")
    res.json({ error: date.toString() });
  else
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

module.exports = router;