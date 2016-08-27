var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//routes for requests
var pets = require('./routes/petfav.js')


// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/pets', pets);

// Handle index file separately
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
