var data = JSON.stringify({
    firstname: "Kate",
});

var options = {
    host: 'www.baidu.com',
    port : 80,
    path : '/upload',
    method : 'POST',
    headers : {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};
var http = require("http");

var req = http.request(options, function(res){
    
    console.log("STATUS: " + res.statusCode);
    console.log("HEADER: " + JSON.stringify(res.headers));
    
    res.setEncoding("utf8");
    
    res.on('data', function(chunk){
        console.log("BODY: "+ chunk);
    })
    
    res.on("end", function(){
        console.log("We are Done ~")
    })
})

req.on("error", function(e){
    console.log("problem with request: " + e.message +" code: " + e.code);
})

req.write("data \n");

req.end();



