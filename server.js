'use strict';

var express = require('express');
var app = express();
var multer  = require('multer')
var upload = multer();


app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/filesize", upload.single('file'), function(req, res){
  res.json({size: req.file.size});
});

app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});
  
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
    .type('txt')
    .send(err.message || 'SERVER ERROR');
  }  
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
