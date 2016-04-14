'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const server = new http.Server();

server.listen(3000, 'localhost');

server.on('request', (req, res) => {
  const filePath = url.parse(req.url).pathname;
  console.log(filePath);
  if (~filePath.indexOf('assets')) {
    sendFile(path.join(__dirname, '../frontend/public', filePath), res);
    return;
  }
  if (~filePath.indexOf('data')) {
    sendFile(path.join(__dirname, '../frontend/public', filePath), res);
    return;
  }
  if (~filePath.indexOf('favicon')) {
    sendFile(path.join(__dirname, '../frontend/public/favicon.ico'), res);
    return;
  }

  sendFile('../frontend/public/index.html', res);
});

function sendFile(filePath, res) {

  fs.readFile(filePath, (err, file) => {
    if (err) throw err;

    const mime = require('mime').lookup(filePath);
    res.setHeader('Content-Type', mime);
    res.end(file);
  });
}
