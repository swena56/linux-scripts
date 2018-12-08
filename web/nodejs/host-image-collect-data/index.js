const express = require('express');
const request = require('request');
const fs = require('fs');
const util = require('./util');
const app = express();
const port = 3000;
const locations = 'locations.json';

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/post', function(req, res) {
	
	let browser = util.detectBrowser(req);
	console.log(`Post: ${JSON.stringify(browser)}`);
	let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(body);
        body['timestamp'] = (new Date).toISOString();
		console.log(body);
		util.writeToDisk(body);
		fs.appendFile(locations, JSON.stringify(body) +"\n", function(err, data){
		    if (err) console.log(err);
		});
        res.end('ok');
    });
});

app.get('/', function(req, res) {
	var img = fs.readFileSync('./static/cat.jpeg');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

app.listen(port, () => console.log(`Listening on port ${port}!`))