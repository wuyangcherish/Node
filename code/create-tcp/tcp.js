var net = require("net");

//net.createServer(listener)即可创建一个 TCP 服务器，listener 是连接事件connect 的侦听器，
var server = net.createServer(function(socket){
    
    //新的连接
    socket.on("data", function(){
        socket.write("Hello TCP");
    });
    
    socket.on("end", function(){
        console.log("连接断开");
    })
    
    socket.write("欢迎光临《深入浅出Node.js》示例");
})

//监听
server.listen(8124,function(){
    console.log("server bound")
})