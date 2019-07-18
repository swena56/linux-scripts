require('shelljs/global');
require("mocha-allure-reporter");

const { expect } = require("chai");
const checkInstall = allure.createStep("nmap installed", () => {
    expect(which('nmap').stdout).to.include('nmap', "Nmap is not installed");
    expect(exec('nmap -v', {silent:true}).stdout).to.include("Nmap 7.70", "Have a different version than 7.70");
});

module.exports = {

  checkInstall,

  hasConnection: () => new Promise( (resolve,reject) => {
      require('dns').resolve('www.google.com', function(err) {
        if (err) {
           reject(false);
        } else {
           resolve(true);
        }
      });
  }),

  scan: (ip) => {
      const xml = exec(`nmap -oX - ${ip}` , {silent:true}).stdout;
      const parseString = require('xml2js').parseString;
      return new Promise((resolve, reject) => {
        parseString(xml, function (err, json) {
            if (err)
                reject(err);
            else {
              expect( json ).to.have.property('nmaprun');
              resolve(json);
            }
        });
    });
  },

  checkPort: (port) => {
    const checkPorts = allure.createStep(`port: ${port}`, () => {
        expect(which('nmap').stdout).to.include('nmap', "Nmap is not installed");
        expect(exec('nmap -v', {silent:true}).stdout).to.include("Nmap 7.70", "Have a different version than 7.70");
    });
    return checkPorts();
  },
};

   

  
