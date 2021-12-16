const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 8892;
const path = require('path');
const http = require('http').createServer(app);
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json());

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


app.use('/api/exams', require('./Controllers/exam.controller'));
app.use('/api/results', require('./Controllers/results.controller'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(port,  () => { 
  console.log('Listening on: ' + port);
});
