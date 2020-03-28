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

const imagesTarget = 'http://ec2-3-101-33-181.us-west-1.compute.amazonaws.com/';
const lookTarget = 'http://ec2-18-144-75-47.us-west-1.compute.amazonaws.com/';
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

app.all('/api/updateLike', (req, res) => {
  console.log('redirecting to server2');
  apiProxy.web(req, res, { target: lookTarget });
});
