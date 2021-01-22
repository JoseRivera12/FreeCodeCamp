// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) {
  res.json({"unix":Date.now(), "utc": new Date().toUTCString()});
});

app.get("/api/timestamp/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;
  if(!isNaN(dateParam))
    date = new Date(parseInt(dateParam));
  else
    date = new Date(dateParam)
  if(date.toString() === "Invalid Date")
    res.json({error: date.toString()});
  else
    res.json({unix:date.getTime(), utc: date.toUTCString()});  
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});