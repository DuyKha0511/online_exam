const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 8889;
const path = require('path');
const http = require('http').createServer(app);
const dotenv = require('dotenv');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

app.use(bodyParser.json());

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const swaggerOptions = {
  definition: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Online Exam API",
      description: "Online Exam API Information",
      contact: {
        url: "https://www.facebook.com/pdk.11.05/"
      },
      servers: [
        {
          url: "http://localhost:8889"
        }
      ]
    },
    tags: [
      {
        "name": "Auth Server",
        "description": "Login & Authorization"
      }
    ],
    schemes: [
      "http", "https"
    ],
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    },
    security: {
      Bearer: []
    }
  },
  apis: [
    "./Controllers/auth.controller.js", 
    "./Controllers/profile.controller.js", 
  ]
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', require('./Controllers/auth.controller'));
app.use('/api/profile', require('./Controllers/profile.controller'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(port,  () => { 
  console.log('Listening on: ' + port);
});
