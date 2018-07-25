var webdriverio = require('webdriverio');

var expect = require('chai').expect;
var assert = require('assert');
var client;
//TODO learn chai
//http://www.chaijs.com/api/bdd/

//TODO go over DOM methodw
//https://www.w3schools.com/js/js_htmldom_methods.asp
async function getRandomPageFromUrl(url){
    await client.url(url);
    await client.execute(function(){
        let links = document.querySelectorAll('a');
        let size = links.length;

        let random = Math.floor(Math.random() * (size - 0 + 1)) + 0;
        links[random].click();
    }, arguments).then(function(result) {
        
    });
    let title = client.getTitle();
    console.log(title);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Bing Rewards', function(){

    this.timeout(0);

    before(function(){
            client = webdriverio.remote({ desiredCapabilities: 
                {
                    browserName: 'chrome',
                    chromeOptions: {
                        args: ['window-size=880,800','user-data-dir=.'],
                    }
                } 
            });
            return client.init();
    });

    afterEach(async function(){
        await sleep(30000);
    });

    it('random wiki',function(){
        var windowHandle = client.windowHandle();
        client.windowHandleMaximize('{'+windowHandle.value+'}');
        client.url('https://en.wikipedia.org/wiki/Special:Random');
    });

    it('https://www.w3schools.com/js/default.asp',function(){
        getRandomPageFromUrl('https://www.w3schools.com/js/default.asp');
        //client.saveScreenshot('buddyworks.png') 
    });

    it('random page from webdriverio',function(){
        getRandomPageFromUrl('http://webdriver.io/api.html');
    });

    it('random page from https://javascript.info/',function(){
        getRandomPageFromUrl('https://javascript.info/');
    });

    it('https://wiki.saucelabs.com/',function(){
        getRandomPageFromUrl('https://wiki.saucelabs.com/');
    });

    // it('',function(){
    //     getRandomPageFromUrl('');
    // });

    after(async function() {
        await sleep(10000);
        return client.end();
    });
});
