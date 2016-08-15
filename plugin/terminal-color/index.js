var colors = require("colors");

//output:

console.log("hello Colors".green);
console.log("I like the Colors ".underline.yellow);
console.log("guess me ".rainbow);
console.log("It is wrong~".red);


// console.log string substitution

var name  = 'Kara';
console.log(colors.green("hello %s"), name);
