const request = require('request');
const fs = require('fs');
const locations = 'locations.json';

module.exports = {
	storeInfo: function(request){

	},

	storeIp: function(ip){
		if( !ip ) throw Error('Need ip for param 1');

		request.get(`http://ipinfo.io/${ip}`, {json: true}, (e, r) => {
			var data = r.body;
			console.log(data);
			if( data ){
				data['timestamp'] = (new Date).toISOString();
				fs.appendFile(locations, JSON.stringify(data) +"\n", function(err, data){
				    if (err) console.log(err);
				    console.log("Successfully Written to File.");
				});
			}
		});
	},
	getClientIp: function(req) {
	  var ipAddress;
	  // The request may be forwarded from local web server.
	  var forwardedIpsStr = req.header('x-forwarded-for'); 
	  if (forwardedIpsStr) {
	    // 'x-forwarded-for' header may return multiple IP addresses in
	    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
	    // the first one
	    var forwardedIps = forwardedIpsStr.split(',');
	    ipAddress = forwardedIps[0];
	  }
	  if (!ipAddress) {
	    // If request was not forwarded
	    ipAddress = req.connection.remoteAddress;
	  }
	  return ipAddress;
	},
	writeToDisk: function(data){
		let store_str = JSON.stringify(data) || undefined;
		if( data && store_str ){
			fs.appendFile(locations, store_str +"\n", function(err, data){
			    if (err) console.log(err);
			    console.log(`Successfully Written to File: ${store_str}`);
			});
		}
	},
	detectBrowser: function(request){
		let ua = request.headers['user-agent'];
		let $ = {};

		if (/mobile/i.test(ua))
		    $.Mobile = true;

		if (/like Mac OS X/.test(ua)) {
		    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
		    $.iPhone = /iPhone/.test(ua);
		    $.iPad = /iPad/.test(ua);
		}

		if (/Android/.test(ua))
		    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

		if (/webOS\//.test(ua))
		    $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

		if (/(Intel|PPC) Mac OS X/.test(ua))
		    $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

		if (/Windows NT/.test(ua))
		    $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

		console.log($);

		return { os: $, agent: ua };
	},
	parseIP: function reg(ip) {
	    var re = /-(\d+)/ig
	    var arr = [];
	    while(digit = re.exec(ip)) arr.push(digit[1]);
	    arr = arr.slice(0,4);

	    return arr;
	},
}