const express = require('express'),
  app = express(),
  port = process.env.PORT || 7777;
const path = require('path');
const http = require('http').createServer(app);
const { createProxyMiddleware } = require('http-proxy-middleware');

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
// app.use('/api/departs', createProxyMiddleware({ target: 'http://localhost:8890/', changeOrigin: true }));
app.use('/api/questions', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));
app.use('/api/libraries', createProxyMiddleware({ target: 'https://onlxam-q.herokuapp.com', changeOrigin: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(port,  () => { 
  console.log('Api Gatewaty, listening on port: ' + port);
});
