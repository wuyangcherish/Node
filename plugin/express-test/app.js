var express = require("express");

var app = express();

app.get('/', function(req,res){
    res.send("Hello express~");
});

app.listen(3000, function(){
    console.log("Express server listening port 3000")
})