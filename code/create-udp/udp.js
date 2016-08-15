// 服务器端
var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function(msg, rinfo){
    console.log("server got:" + msg + "form" + rinfo.address + ":" + rinfo.port);
    console.log(rinfo)
})

server.on("listening", function(){
    var address = server.address();
    console.log("server listening  "+ address.address + ": "+ address.port);
})

server.bind(41234);

//rinfo : { address: '127.0.0.1', family: 'IPv4', port: 54900, size: 19 }
