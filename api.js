var express = require('express');
var data    = require('./docs/data.json'); // todo: change docs cmd to use --no-parse and move dir
var app     = express();
var port    = process.env.PORT || 5000;

app.use(express.logger());
app.use(allowCors);

app.get('/', function(req, res) {
  res.json(data);
});

app.listen(port, function() {
  console.log("Listening on " + port);
});

function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
