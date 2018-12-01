const glob = require('glob');
const crypto = require('crypto');
const fs = require('fs');

let util = {
	getFiles: function(){
		return glob.sync('*/**/*.js');
	},
	checksum(str, algorithm, encoding) {
	  return crypto
	    .createHash(algorithm || 'md5')
	    .update(str, 'utf8')
	    .digest(encoding || 'hex')
	},
};

// checksum function definition as above
// Note that content of the test.dat file is "This is my test text"

let files = util.getFiles();

files.forEach( function(element, index) {
	fs.readFileSync(element, function(err, data) {
		let a = {file:element,checksum:util.checksum(data)};
		//console.log(a);
	   results.push(a);
	  //checksum(data, 'sha1') // cd5855be428295a3cc1793d6e80ce47562d23def
	});
});
console.log(results);

module.exports = util;