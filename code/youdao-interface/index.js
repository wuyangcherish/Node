var request = require("request");
var output = require("./lib/output");
var word = "chrome";
request("http://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.1&q="+word+"", function(error, response, body){
    if(!error && response.statusCode == 200){
        console.log(output(body));
    }
})
