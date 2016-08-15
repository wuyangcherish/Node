var fs = require("fs");

//创建一个可读流
var readerStream = fs.createReadStream("pipeIpt.txt");

//创建一个可写流

var writeStream = fs.createWriteStream("pipeOpt.txt");

//管道读写操作;
//读取文件ipt里面的内容写到output文件里面

readerStream.pipe(writeStream);

console.log("程序读写完毕~")