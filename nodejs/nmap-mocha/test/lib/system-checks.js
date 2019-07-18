
require('shelljs/global');
require("mocha-allure-reporter");
const { expect } = require("chai");

const nmapSetup = allure.createStep("nmap installed", () => {
    const nmap = which('nmap');
    expect(nmap.stdout).to.include('nmap', "Nmap is not installed");

    var version = exec('nmap -v', {silent:true}).stdout;
    expect(version).to.include("Nmap 7.70", "Have a different version than 7.70");
});

const hasConnection = () => new Promise( (resolve,reject) => {
    require('dns').resolve('www.google.com', function(err) {
      if (err) {
         reject(false);
      } else {
         resolve(true);
      }
    });
})

module.exports = {
  nmapSetup,
  hasConnection,

};

   

  
