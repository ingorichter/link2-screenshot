var express = require('express');
var bodyParser = require('body-parser');
var childProcess = require('child_process');
var uuidv4 = require('uuid/v4');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/screenshot', function (req, res) {
  var url = req.body.hasOwnProperty('url') ? req.body.url : null;
  if (url) {
    var fileName = uuidv4();
    childProcess.exec('npm run capture -- "'+url+'" "public/'+fileName+'.jpg" "1280px*720px"');
    res.status(202).send(fileName);
  } else {
    res.status(400).send('no');
  }
});

app.get('/screenshot/:id', function (req, res) {
  var id = req.params.id || '';
  var fileName = path.resolve('./public/'+id+'.jpg');
  if (fs.existsSync(fileName)) {
    res.sendFile(fileName);
  } else {
    res.send('no');
  }
});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at http://%s:%s", host, port)
})
