const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 8889;
const path = require('path');
const http = require('http').createServer(app);
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.json());

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


// const user = require('./Controllers/User.controller');
app.use('/api/auth', require('./Controllers/auth.controller'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(port,  () => { 
  console.log('Listening on: ' + port);
});
