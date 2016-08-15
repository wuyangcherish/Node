var fs = require("fs");

var data = "这个是用 Node.js 里面的writeFile 写入的文字";

//创建一个可写流

var writeStream = fs.createWriteStream("writeFile.txt");

//设置写入字符的编码

writeStream.write(data, "utf8");

//标记文件末尾
writeStream.end();

//处理流事件
writeStream.on("finish", function(){
    console.log("写入完成。")
})

writeStream.on("error", function(err){
    console.log(err.stack);
})

console.log("程序执行完毕");
