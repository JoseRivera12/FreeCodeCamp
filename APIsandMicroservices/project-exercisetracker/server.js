const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");

require('dotenv').config();
require('./database');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(require("./routes/user.routes"));
app.use(require("./routes/exercise.routes"));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});