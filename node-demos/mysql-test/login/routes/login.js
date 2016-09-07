
var express = require('express');

var router = express.Router();

var User = require('../models/user.js');
var crypto = require('crypto');
var TITLE_LOGIN = '登录';

router.get('/', function(req,res){
	res.render('login',{title: TITLE_LOGIN})
})
router.post('/', function(req,res){

	var userName = req.body['textUserName'];
	var userPwd = req.body['textUserPwd'];
	var isRem = req.body['chRem'];
	var md5 = crypto.createHash('md5');

	User.getUserByUserName(userName, function(err, results){
		console.log("results",results)
		/*results  [ RowDataPacket {
				    Id: 4,
				    UserName: 'wuyang',
				    UserPass: 'fabec45f4b17c6986fbb06b9d90f45b5' } ]
		*/

		if(results == ''){
			res.locals.error ="用户不存在";
			res.render('login', {title:TITLE_LOGIN});
			return;
		}

		userPwd = md5.update(userPwd).digest('hex');

		if(results[0].UserName != userName || results[0].UserPass != userPwd){
			res.locals.error = '用户名或者密码错误';
			res.render('login',{title:TITLE_LOGIN});
			console.log(1);
			return;
		}else{
			if(isRem == undefined){
				res.cookie('islogin',userName, {maxAge:6000});
				// console.log("ok");
			}
			// console.log("chRem",isRem);

			res.locals.username = userName;
			req.session.username = res.locals.userName;
			console.log(req.session.username);
			res.redirect('/');
			return;
		}
	})
})

module.exports = router;






