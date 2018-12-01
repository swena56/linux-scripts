let db = require('./database');
const { execFile } = require('child_process');
const chai = require('chai');

describe('Test database', function () {

	it('mongo should be installed', function (done) {
		execFile('node', ['--version'], (error, stdout, stderr) => {
		  if (error) {
		    throw error;
		  }
		  chai.expect(stdout.trim()).to.equal('v8.11.3');
		  done();
		});
	});

	it('add record', function (done) {
		db.create('fluffy');
		let results = db.read();
		console.log(results);
		done();
	});

	// it('delete record', function (done) {
		
	// });

	// it('search for record', function (done) {
		
	// });

	// it('delete all records', function (done) {
		
	// });


});