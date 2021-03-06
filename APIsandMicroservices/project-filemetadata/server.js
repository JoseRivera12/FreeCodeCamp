require('dotenv').config()

var express = require('express');
var cors = require('cors');
var multer  = require('multer')
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//use memoryStorage for just saves in memory for temporal access
app.post('/api/fileanalyse', multer({storage: multer.memoryStorage()}).single('upfile'), function (req, res) {
  //return info about the file
  res.json({name:req.file.originalname, type:req.file.mimetype, size:req.file.size})
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
