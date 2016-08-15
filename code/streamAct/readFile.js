var fs = require("fs");

var data = '';

//创建可读流
var readerStream = fs.createReadStream("readfile.txt");

//设置编码
readerStream.setEncoding("utf8");

//处理事件流

readerStream.on("data", function(chunk){
    data += chunk;
});

readerStream.on("end", function(){
    console.log("It is over~:"+ data);
})

readerStream.on("error", function(){
    console.log(error.stack);
})

console.log("程序执行完毕")