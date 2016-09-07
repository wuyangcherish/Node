
var mysql = require('mysql');
var DB_NAME = 'test';

// 创建pool  连接池
var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'wy939166',
	database:'test',
  	port:3306
})

pool.on('connection', function(connection){
	connection.query('SET SESSION auto_increment_increment = 1');
})

function User(user){
	this.username = user.username;
	this.userpass = user.userpass;
}

module.exports = User;

pool.getConnection(function(err,connection){
	var useDbSql = 'USE ' + DB_NAME;
	connection.query(useDbSql, function(err){
		if(err){
			console.log("USE ERROR:" + err.message);
			return;
		}
		console.log("USE SUCCEED");
	})
	//保存数据
	User.prototype.save = function save(callback){
		var user = {
			username: this.username,
			userpass: this.userpass
		};

		// console.log(user)

		var insertUser_Sql = 'INSERT INTO login(UserName,UserPass) VALUES(?,?)';

		connection.query(insertUser_Sql,[user.username,user.userpass], function(err,result){
			if(err){
				console.log("insert sql error: "+ err.message);
				return;
			}

			// connection.release();
			console.log("invoked[save]");
			callback(err,result);
		})
	}
	//根据用户名得到用户的数量

	User.getUserNumByName = function getUserNumByName(username, callback){
		var getUserNumByName_Sql = 'SELECT COUNT(1) AS num FROM login WHERE username=?';

		connection.query(getUserNumByName_Sql,[username], function(err, result){
			if(err){
				console.log("getUserNumByName Error: "+ err.message);
				return;
			}

			// connection.release();

			console.log("invoked[getUserNumByName]");
			// console.log(err,result) 
			callback(err,result);
		})
	}

	//根据用户名得到用户信息
	User.getUserByUserName = function getUserByUserName(username,callback){
		var getUserByUserName_Sql = 'SELECT * FROM login WHERE UserName=?';

		connection.query(getUserByUserName_Sql,[username], function(err, result){
			if(err){
				console.log('getUserByUserName Error: '+ err.message);
				return;
			}

			// connection.release();
			console.log('invoked[getUserByUserName]');
			callback(err,result);
		})
	}

})






























