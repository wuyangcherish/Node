var fs = require("fs");

var colors = require("colors");

fs.writeFile("writefile.text","everything gonna be ok ", function(err){
    
    if(err){
        return console.error(err);
    }
    
    console.log("数据写入成功".red);
    console.log("----------------华丽丽的分割线-------------------".green);
    console.log("读取写入的数据".red);
    
    fs.readFile("readfile.text", function(err, data){
        
        if(err){
            console.log(err);
        }
        console.log("异步读取文件内容\n" + data.toString())
        
    })
})

