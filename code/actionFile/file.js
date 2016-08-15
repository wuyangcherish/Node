var fs = require("fs");
var colors = require("colors")

//异步读取
fs.readFile('abc.text', function(err,data){
    if(err){
        return console.log(err)
    }
     console.log("异步读取: \n".green + data.toString());
})


// 同步读取

var data = fs.readFileSync("abc.text");

console.log("同步读取:\n".green + data.toString());

console.log("程序执行完毕".yellow);

console.log("接下来是对文件进行读写：".rainbow);

//异步打开文件
console.log("准备打开文件".rainbow);

fs.open("abc.text", "r+", function(err, fd){
    if(err){
        return console.log(err)
    }
    console.log("文件打开完成".rainbow);
})


// 获取文件的信息：
fs.stat("abc.text", function(err,stats){
    if(err){
        console.log(err)
    }
    console.log(stats.isFile());
})

