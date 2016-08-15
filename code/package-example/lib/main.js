var head = require("./head");
var body = require("./body");

var main = "main content";

//console.log("main content");

exports.create = function(){
    return {
        "title": head.create(),
        "body": body.create(),
        "main": main
    }
}