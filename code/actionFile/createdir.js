var fs = require("fs");
var colors = require("colors");

console.log("创建目录 tmp/test".green);

fs.mkdir("/tmp/test", function(err){
    
    if(err){
        return console.error(err);    
    }
    console.log("目录创建成功");
    
})


/* 创建的文件在： cd /tmp 下面就可以看到有一个 test 的文件夹*/