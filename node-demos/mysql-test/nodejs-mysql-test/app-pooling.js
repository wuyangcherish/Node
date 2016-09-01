

var mysql = require('mysql');

//创建一个连接池配置
var pool = mysql.createPool({
	host:'localhost',
  	user:'root',
  	password:'wy939166',
  	database:'test',
  	port:3306
});

var insertSQL = 'insert into login values(1,"Ray","Ray1203")';
var selectSQL = 'select * from login limit 10';

pool.getConnection(function(err,conn){
	if(err){
		console.log("POOL ERROR->"+err)
	}

	// insert
	// conn.query(insertSQL, function(err, res){
	// 	if(err) console.log("conn error->", err);

	// 	console.log("insert result=>");
	// 	console.log(res);

	// 	//释放
	// 	conn.release();
	// })

	// select
	conn.query(selectSQL, function(err,rows){
		if(err)
			console.log("conn error",err);

		console.log("select result =>");
		for(var i in rows){
			console.log(rows[i])
		}

		conn.release();
	})


})
