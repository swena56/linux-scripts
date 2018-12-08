const express = require('express');
const request = require('request');
const fs = require('fs');
const util = require('./util');
const path = require('path');
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
        // let data = JSON.stringify(body);
        // let location = 'unknown';
        // data['timestamp'] = (new Date).toISOString();
        // data['map_link'] = `https://www.google.com/maps/place/${location}`;
        // console.log(data);
        //https://www.google.com/maps/place/
		console.log(body);
		util.writeToDisk(body);
		fs.appendFile(locations, JSON.stringify(body) +"\n", function(err, data){
		    if (err) console.log(err);
		});
        res.end('ok');
    });
});

app.get('/', function(req, res) {
	// var img = fs.readFileSync('./static/cat.jpeg');
 //    res.writeHead(200, {'Content-Type': 'image/jpg' });
 //    res.end(img, 'binary');
    res.sendFile(path.join(__dirname + '/page.html'));
});

app.get('/image', function(req, res) {
	var img = fs.readFileSync('./static/cat.jpeg');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
    //res.sendFile(path.join(__dirname + '/page.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}!`))