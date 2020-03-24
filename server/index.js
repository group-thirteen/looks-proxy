const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const apiProxy = httpProxy.createProxyServer();

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Proxy is listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, '../public')));

const imagesTarget = 'http://localhost:3000';
const lookTarget = 'http://localhost:3001';
const reviewTarget = 'http://localhost:8080';

app.all('/images/:id', (req, res) => {
  console.log('redirecting to server 1');
  apiProxy.web(req, res, { target: imagesTarget });
});

app.all('/api/getimageurls', (req, res) => {
  console.log('redirecting to server 2');
  apiProxy.web(req, res, { target: lookTarget });
});

app.all('/reviews', (req, res) => {
  console.log('redirecting to server 3');
  apiProxy.web(req, res, { target: reviewTarget });
});
