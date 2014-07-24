var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.listen(2323);

app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + "/bower_components"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var task = null;

app.get("/tasks/current", function(req, res) {
  console.log('task=' + task);
  res.send(JSON.stringify(task));
});

app.post("/tasks/current", function(req, res) {
  task = req.body;
  if (task.endDate) task = null;
  console.log('task=' + task);
  res.send(200);
});

app.get("/statistics", function(req, res) {
  res.send(200);
});

console.log("Server running on port 2323");
