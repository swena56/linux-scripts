require('shelljs/global');
require("mocha-allure-reporter");
require('@babel/register');

const { expect } = require("chai");
const nmap = require('./lib/nmap');
const html = require('./report/html');

describe("127.0.0.1", () => {

  it(`nmap is installed`, async function () {
    await nmap.checkInstall();
  });

  it("has internet connection", async () => {
      expect(await nmap.hasConnection()).to.equal(true,'Has connection'); 
  });

  it('review ports', async function () {
      
      const results = await nmap.scan('127.0.0.1');
      const first = results['nmaprun']['host'][0];
      const ports = first.ports[0].port;
      nmap.checkPort(90);
      
      allure.description( 
        await html.template( 
          `<div>
            <ul>
              ${await ports.map( o => `<li>${o['$']['portid']}</li>` ).join('')}
            </ul>
          </div>`
        ),
      'html');

      await ports.forEach( o => nmap.checkPort(o['$']['portid']) );
      allure.createAttachment('json', await html.jsonBlock(results),'text/html');

      //allure.addArgument(name, value)
      //allure.addEnvironment(name, value)

  });
});
