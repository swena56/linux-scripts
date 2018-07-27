var webdriverio = require('webdriverio');

var expect = require('chai').expect;
var assert = require('assert');
var client;
var num_searches = 12;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function check_points(){
    await client.url('https://account.microsoft.com/rewards/pointsbreakdown');

    var points = await client.execute(function(){
        let result = document.querySelectorAll('p.pointsDetail.c-subheading-3.ng-binding');
        console.log("Results found: ", result.length);
        if( result && result.length > 0 && result[1].innerHTML){
            return result[1].childNodes[0].innerHTML;
        }
        return false;
    });
    
    if( points && points.value ){
        return points.value;
    }

    return false;
}

//Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36

describe('Bing Rewards', function(){

    this.timeout(0);
    
    var isLoggedIn = false;
    
    before(function(){
            //use internet explorer user agent, and tmp directory
            client = webdriverio.remote({ desiredCapabilities: 
                {
                    browserName: 'chrome',
                    chromeOptions: {
                        args: ['window-size=880,800','user-data-dir=/tmp/',
                        'user-agent=Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136'
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
            let loginPic = document.querySelector('#sharedshell-profile');
            return (loginPic != null) ? true : false;
        });

        if( isLoggedIn.value == false ){
            await client.click('.msame_Header_name.msame_TxtTrunc');
            await sleep(30000);
        }

        assert.equal(isLoggedIn.value,true);
    });
    
    it('check number of points',  async function () {
        let points = await check_points();
        assert.ok(points);

        //calculate the correct number of searches
        if(points == 150){
            num_searches = 0;
            assert(points,'Should be a number');
        } else{
            num_searches = (150 - points) / 5;
        }

        console.log(points,num_searches);
    });

    it('at least 3 check marks',async ()=>{

        await client.url('https://account.microsoft.com/rewards/');
        
        client.getTitle().then(function(title) {
            assert.equal(title,'Microsoft account | Rewards Dashboard');
        });

        let results = await client.execute(  function(){
            
            function hasParentWithId(item,idToSearchFor){

                var current_item = item;

                while(current_item){
                    if(current_item.id==idToSearchFor){
                        console.log("found");
                        return true;
                        break;
                    }
                    if(current_item=="body"){
                        break;
                    }
                    current_item = current_item.parentElement;
                }

                return false;
            }

            let click_points = document.querySelectorAll('.mee-icon.mee-icon-SkypeCircleCheck.ng-scope');

            //if there are less than three elements, then automatic fail
            if(click_points && click_points.length < 3){
                return false;
            }

            //check them each
            let count = 0;
            for (var i = click_points.length - 1; i >= 0; i--) {
                if( hasParentWithId(click_points[i],"daily-sets") ){
                    count++;
                }
            }

            if( count >= 2 ){
                return true;
            }

            return false;
        });

        assert.equal(results.value,true);
    });
    
    var words = [];

    it('Random bing search', async function(){
        
        if( isLoggedIn ){
            console.log("number of searches ",num_searches);

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

                //play definition if it exists, TODO, not working
                await sleep(5000);
                client.isExisting('.sw_play.cipa.vat').then(function(isExisting) {
                    isExisting.click();    
                });

                await sleep(5000);
            }
        } else {
            assert.equal(isLoggedIn,true);
        }
    });
    
    after(async function() {
        await sleep(10000);
        return client.end();
    });
});

/*
inject = document.createElement('script');
inject.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(inject);
*/