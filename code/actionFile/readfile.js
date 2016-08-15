var fs  = require("fs");
var colors = require("colors");

console.log("宝宝现在开始读取文件了哦".green);

fs.stat("readfile.txt", function(err, stats){ 
    
    if(err){
        console.log(err)
    }
    console.log(stats);
    
    console.log("文件读取完毕~".green);

    console.log("是否是一个文件".yellow + stats.isFile());
    console.log("是否是目录:".yellow + stats.isDirectory())
    
})


// 读取文件

var buf = new Buffer(1024);

console.log("准备打开已经存在的文件~".green);

fs.open("readfile.txt","r+", function(err,fd){
    
    if(err){
        return console.log(err);
    }
    console.log("文件打开成功".green);
    console.log("准备读取文件".green);
    
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
        
        if(err){
            return console.log(err)    
        }
        console.log(bytes + "字节被读取");
        
        //输出读取的字节
        if(bytes >0 ){
            console.log(buf.slice(0, bytes).toString())
        }
        
        //关闭文件
        fs.close(fd, function(err){
            if(err){
                console.error(err)
            }
            console.log("文件关闭成功".green);
        })
    })
    
});

console.log("----------华丽丽的分割线-----------");

console.log("现在是截取文件");

fs.open("readfile.txt","r+", function(err, fd){
    
    if(err){
        console.log(err);
    }
    
    console.log("文件读取成功".green);
    
    console.log("读取相同的文件".yellow);
    
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
        
        if(err){
            console.log(err);    
        }
        
        if(bytes >0 ){
            console.log(buf.slice(101, bytes).toString());
        }
        
        //关闭文件
        fs.close(fd, function(err){
            if(err){
                console.log(err);
            }
            console.log("文件关闭成功".yellow);
        })
    })
    
})

