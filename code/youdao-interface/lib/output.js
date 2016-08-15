var colors = require("colors");

module.exports = function(data){
    var i, temp, word = JSON.parse(data);
    console.log(word)
    
    console.log('\n' + word.bold);
    
    if(data.basic != null){
        var us = typeof data.basic['us-phonetic'] === 'string' ? '美音 : ['+ data.basic['us-phonetic']+']' : '';
            
        var uk = typeof data.basic['uk-phonetic'] === 'string' ? '英音 : ['+ data.basic['uk-phonetic']+']' : '';
            
        if(uk && us) {
            console.log('\n' + us + '  ' + uk);
        }else if(typeof data.basic['phonetic'] == 'string'){
            console.log('\n' + '拼音'.bold.underline + ':['+ data.basic['phonetic']+']');
        }
        
        console.log('\n ' + '翻译'.bold.underline + '：' + data.basic['explains'] + '\n');
    }else if(data.web != null){
        console.log('\n' + '网络释义：'.bold.underline);
        
        for(var i=0;i<data.web.length; i++){
            temp = data.web[i];
            
            console.log('\n' + (i+1) + '. ' + temp.key);
            console.log('\n' + temp.value);
        }
        
        console.log(" ");
    }else{
        console.log("暂无释义")
    }
}