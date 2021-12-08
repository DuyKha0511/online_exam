const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 7777;
const path = require('path');
const http = require('http').createServer(app);
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



app.use(bodyParser.json());

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


app.use('/api/auth', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/profile', createProxyMiddleware({ target: 'https://onlxam-a.herokuapp.com', changeOrigin: true }));
app.use('/api/classes', createProxyMiddleware({ target: 'https://onlxam-u.herokuapp.com', changeOrigin: true }));
app.use('/api/questions', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));
app.use('/api/libraries', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));


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
          url: "https://onlxam.herokuapp.com"
        }
      ]
    },
    tags: [
      {
        "name": "Auth Server",
        "description": "Login & Authorization"
      },
      {
        "name": "User Server",
        "description": "Class & User"
      },
      {
        "name": "Exam Server",
        "description": "Exam & Take Exam"
      },
      {
        "name": "Question Server",
        "description": "Question & Library"
      }
    ],
    schemes: [
      "https", "http"
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
    "./Controllers/class.controller.js", 
    "./Controllers/library.controller.js", 
    "./Controllers/question.controller.js", 
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(port,  () => { 
  console.log('Api Gatewaty, listening on port: ' + port);
});
