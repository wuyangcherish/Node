var mysql = require("mysql");
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'wy939166',
  database:'test',
  port:3306
});

conn.connect();

var insertSQL = 'insert into login values(1,"Ray","Ray1203")';
var selectSQL = 'select * from login limit 10';
var updateSQL = 'update login set UserName="Ray Wu" where UserName="Ray"';
var deleteSQL = 'delete from login where UserName="Ray Wu"';


//insert
// conn.query(insertSQL, function(err, res){
//   if(err){
//     console.log(err)
//   }
//   console.log("Insert return ==>");
//   console.log(res)
// });



// select
// conn.query(selectSQL, function(err,res){
//   if(err){
//     console.log(err)
//   }
//   console.log("select result ==>");
//   console.log(res)
// })



// update
// conn.query(updateSQL, function(err,res){
//   if(err){
//     console.log(err)
//   }
//   console.log("update result ==>");
//   console.log(res)
// })

//delete

conn.query(deleteSQL, function(err,res){
  if(err){
    console.log(err);
  }
  console.log("delete result ==>");
  console.log(res)
})




conn.end();


















