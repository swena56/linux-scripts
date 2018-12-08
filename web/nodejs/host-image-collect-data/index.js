const express = require('express');
const request = require('request');
const fs = require('fs');
const util = require('./util');
const app = express();
const port = 3000;
const locations = 'locations.json';

function reg(ip) {
    var re = /-(\d+)/ig
    var arr = [];
    while(digit = re.exec(ip)) arr.push(digit[1]);
    arr = arr.slice(0,4);

    return arr;
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/post', function(req, res) {
	console.log('post');
	console.log(req.headers);
	let browser = util.detectBrowser(req);
	console.log(browser,req.headers['user-agent']);
	//res.send('Username: ');
});

app.get('/', function(req, res) {

	var img = fs.readFileSync('./static/best-buy.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');

    let ip = util.getClientIp(req);
    //console.log(ip);

    request.get(`http://ipinfo.io/${reg(req.ip).join('.')}`, {json: true}, (e, r) => {
			var data = r.body;
			if( data ){
				data['timestamp'] = (new Date).toISOString();
				console.log(data);
				fs.appendFile(locations, JSON.stringify(data) +"\n", function(err, data){
				    if (err) console.log(err);
				});
			}
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))