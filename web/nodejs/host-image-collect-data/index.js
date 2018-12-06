const express = require('express');
const request = require('request');
const fs = require('fs');
const util = require('./util');
const app = express()
const port = 3000

app.get('/', function(req, res) {

	var img = fs.readFileSync('./static/best-buy.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');

    util.storeIp(req.ip);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))