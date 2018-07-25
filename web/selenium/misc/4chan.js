var webdriverio = require('webdriverio');

var expect = require('chai').expect;
var assert = require('assert');
var client;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function at_bottom(){
    var result = await client.execute(function(){
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    });
    return result.value;
}

async function is_video_playing(){
    var result = await client.execute(function(){
        var vid = document.querySelector('video');
        if( vid && !vid.paused ){
            return true;
        } else{
            return false;
        }
    });
    return result.value;
}

async function scroll_page(){
    let sleep_time = 2000; 
            
    var spot = 0;
    for (var i = 0; i < 1000; i++) {
        await client.execute(function(){
            window.scrollBy(0,100);
        });

        spot = spot + 100;
        var a = await at_bottom();
        if( a ){
            break;
        }
        await sleep(sleep_time);
    }
}

async function view_board(board){
    client.url('http://boards.4chan.org/'+board+'/');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/2');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/3');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/4');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/5');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/6');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/7');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/8');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/9');
    await scroll_page();
    client.url('http://boards.4chan.org/'+board+'/10');
    await scroll_page();
}



describe('4 Chan', function(){

    this.timeout(0);
    
    let num_searches = 12;

    before(function(){
            client = webdriverio.remote({ desiredCapabilities: 
                {
                    browserName: 'chrome',
                    chromeOptions: {
                        args: ['window-size=880,800','user-data-dir=/tmp/',
                        ],
                    }
                } 
            });
            
            return client.init();
    });


    it('s', async function(){
        await view_board('s');
    });

    it('b', async function(){
        await view_board('b');
    });

    it('wg', async function(){
        await view_board('wg');
    });

    it.only('WallPaper Search', async function(){
        var windowHandle = client.windowHandle();
        client.windowHandleMaximize('{'+windowHandle.value+'}');
        
        var board = 'gif';
        client.url('http://boards.4chan.org/'+board);

        var all = await client.execute(function(){
            var all = document.querySelectorAll('.fileThumb');
            var results = [];
            for(var i = 0; i < all.length; i++){
                results.push(all[i].href);
            }
            return results;
        });

        all = all.value;
        for (var i = 0; i < all.length; i++) {
            console.log(all[i]);
            client.newWindow(all[i]);

            await sleep(1000);
            var is_playing = await is_video_playing();
            while(is_playing){
                await sleep(1000);
                is_playing = await is_video_playing();
            }

            await sleep(1000);
            client.close();
            await sleep(1000);
        }
        
        console.log("Done");
    })

    afterEach(async function(){
        let wait_time = 1000;
        await sleep(wait_time);
    });

    after(async function() {
        //await sleep(999999);
        return client.end();
    });
});