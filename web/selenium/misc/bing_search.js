var webdriverio = require('webdriverio');

var expect = require('chai').expect;
var assert = require('assert');


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36

describe('Bing Rewards', function(){

    this.timeout(0);
    var client;
    var isLoggedIn = false;
    let num_searches = 12;

    before(function(){
            client = webdriverio.remote({ desiredCapabilities: 
                {
                    browserName: 'chrome',
                    chromeOptions: {
                        args: ['window-size=880,800','user-data-dir=/tmp/',
                        'user-agent=Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136'
                        //'user-agent=Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
                            //'user-agent=Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36'
                        ],
                    }
                } 
            });
            return client.init();
    });

    afterEach(async function(){
        let wait_time = 5000;
        await sleep(wait_time);
    });

    it('Rewards',function() {
        var windowHandle = client.windowHandle();
        client.windowHandleMaximize('{'+windowHandle.value+'}');
        client
            .url('https://account.microsoft.com/rewards/');
        
        //am I at the correct URL
    });

    it('Check if logged in',async function(){

         isLoggedIn = await client.execute(function() {
            let loginPic = document.querySelector('.msame_Header_picframe');
            return (loginPic) ? true : false;
         });
        
        assert.ok(isLoggedIn);
    });

    
    //http://www.chaijs.com/api/
    // it('click 5 random news articles', function(){

    //     //document.querySelector('#crs_itemLink_1').click()
    //     client
    //     .url('https://www.bing.com/')
    //     ;//.click('#crs_itemLink_1');

    //     client.executeAsync(function(){
    //         await document.querySelector('#crs_itemLink_1').click();            
    //     });
    // });

    it('at least 3 check marks',async ()=>{
        await client.execute(  function(){
            let click_points = document.querySelectorAll('.ng-scope.c-call-to-action.c-glyph.f-lightweight');

            if( click_points && click_points.length > 3 ){
                console.log("Click rewards available", click_points);
            }
        });
        //TODO does not fail
    });
    
    var words = [];

    it('Random bing search', async function(){
        
        if( isLoggedIn ){
            for (var i = 0; i < num_searches; i++) {
                
                await client
                .url('https://randomword.com/');
                
                await client.getText('#random_word').then(function(text) {
                    words.push(text);
                });
            }

            for (var i = 0; i < words.length; i++) {
                await client
                .url('https://www.bing.com/')
                .setValue('#sb_form_q.b_searchbox', "define " + words[i] )
                .click('#sb_form_go.b_searchboxSubmit')
                ;

                //play definition if it exists
                await sleep(1000);
                client.isExisting('.sw_play.cipa.vat').then(function(isExisting) {
                    isExisting.click();    
                });

                await sleep(5000);
            }
        } else {
            assert.equal(isLoggedIn,true);
        }
    });
    
    it('at least 150 pc search points',async function(){
        client.url('https://account.microsoft.com/rewards/pointsbreakdown');


        var points = await client.execute(function(){
            let result = document.querySelectorAll('p.pointsDetail.c-subheading-3.ng-binding');
            console.log("Results found: ", result.length);
            if( result && result.length > 0 && result[1].innerHTML){
                return result[1].childNodes[0].innerHTML;
            }
            return false;
        });
        
        if( points ){
            //console.log(points.value, " out of 150");  

            if( points.value == "150" ){
                num_searches = 2;
                assert.equal(points.value,'150');
            }
            
        }

        client.back();
    });


    after(async function() {
        await sleep(10000);
        return client.end();
    });
});