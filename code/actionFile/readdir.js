var fs = require("fs");

var colors = require("colors");

console.log("查看 /tmp 目录".green);

fs.readdir("/tmp/", function(err, files){
    
    if(err){
        return console.log(err);    
    }
    
    files.forEach(function(){
        console.log(files);
    })
    
})


//读完之后顺便删除文件 test

fs.rmdir("/tmp/test", function(err){
    
    if(err){
        return console.log(err);
    }
    console.log("读取文件目录".red);
    
    fs.readdir("/tmp/", function(err, files){
        
        if(err){
            console.log(err);
        }
        files.forEach(function(file){
            console.log(file);
        })
        
    })
})