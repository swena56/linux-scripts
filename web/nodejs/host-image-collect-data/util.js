const request = require('request');
const fs = require('fs');
const locations = 'locations.json';

module.exports = {
	storeIp: function(ip){
		if( !ip ) throw Error('Need ip for param 1');

		console.log(ip);
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
}