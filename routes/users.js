var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');
var Article = require('../model/dbModel').Article;
var Articleclass = require('../model/dbModel').Articleclass;

var Schema = mongoose.Schema;

//用户表
var userSchema = new Schema({
	userName : String,
	email    : String,
	mobile   : String,
	password : String,
	articleClassNum: Number,
	status   : Number //0:封停 1：正常
});
var User = mongoose.model('users',userSchema);
//mongoose.connect('mongodb://localhost/myblog');

//邮箱注册
router.post('/email/register', function(req, res){
	var userName = req.body.userName;
	var email = req.body.email;
	// var mobile = req.query.mobile;
	var password = req.body.password;
	var user = new User({
		userName : userName,
		email	 : email,
		mobile   : null,
		password : password,
		articleClassNum: 1,
		status   : '1'
	});
	user.save(function(err){
		if (err) {
			console.log('保存失败');
			res.send({status:0,message:'注册失败请稍后重试',data:null});
			return;
		}
		res.send({status : 1, message:'注册成功', data:{userName:userName, email:email}});
	});
});
//手机号码注册
router.post('/mobile/register', function (req, res) {
			var userName = req.body.userName;
			var mobile = req.body.mobile;
			var passowrd = req.body.password;
			var user = new User({
				userName : userName,
				email    : null,
				mobile   : mobile,
				password : passowrd,
				status   : '1'
			});
			user.save(function(err){
				if (err){
					console.log('保存失败');
					res.send({status:0, message:'注册失败请稍后重试',data:null});
					return;
				}
				res.send({status: 1,message: "注册成功", data:{userName:userName, mobile:mobile}});
			})
	});
//用户名唯一性验证
router.post('/userName', function(req, res){
			try {
				var userName = req.body.userName;
				User.findOne({"userName":userName}, function (err,user) {
					if (err) {
						res.send({status:0,message:'数据库错误'});
						return;
					}
					if( !user ){
						res.send({status : 1, message:'该用户名可用于注册'})
					} else {
						res.send({status : 0, message:'该用户名已被注册'})
					}

				});
			} catch(e){
				console.log(e);
			}

		});
//手机号唯一性验证
router.post('/mobile',function(req,res){
		var mobile = req.body.mobile;
		User.findOne({'mobile':mobile},function(err,user){
			if (err){
				res.send({status:0, message:'数据库错误'});
				return;
			};
			if (!user){
				res.send({status:1, message:'该手机号可用于注册'});
			}else{
				res.send({status:0, message:'该手机号已被注册'});
			}
		})
	});
//邮箱唯一性验证
router.post('/email', function(req, res){
		try{
			var email = req.body.email;
			User.findOne({'email':email}, function (err, user) {
				if (err){
					res.send({status: 0, message:'数据库错误'});
					return;
				};
				if (!user){
					res.send({status: 1,message:'该邮箱可用于注册'})
				} else {
					res.send({status: 0,message:'该邮箱已被注册'})
				}
			})
		} catch (e){
			console.log(e)
		}


	});

//登录
router.post('/login',function (req, res) {

	var userName = req.body.userName;
	var password = req.body.password;
	//var lastTime = new Date();
	User.findOne({'mobile': userName}, function(err, user) {
		if (err) {
			res.send({status: 0, message: '数据库错误'});
			return;
		}
		if (user && user.password == password) {
			console.log(user.articleClassNum);
			session.userName = user.userName;
			session.articleClassNum = user.articleClassNum;
			res.send({status: 1, message: user});
		} else {
			// email
			User.findOne({'email': userName}, function(err, user) {
				if (err){
					res.send({status: 0, message: '数据库错误'});
					return;
				};
				if (user && user.password == password){
					session.userName = user.userName;
					session.articleClassNum = user.articleClassNum;
					res.send({status: 1, message: user});
				}else{
					res.send({status: 0, message: "账号或密码错误"});
				}
			});
		}
	});
});
//登出
router.get('/loginOut',function(req, res){
	res.clearCookie('user');
})

//文章分类表
//var classSchema = new Schema({
//	userName  : String,
//	className : String,
//	value     : Number
//});
//var Articleclass = mongoose.model('articleClass',classSchema);
router.post('/articleClass',function(req, res){
	var userName = session.userName;
	var className = req.body.className;
	var value = ++ session.articleClassNum;
	//console.log(session.articleClassNum+session.userName)
	var articleClass = new Articleclass({
		userName : userName,
		className: className,
		value    : value
	});
	articleClass.save(function(err){
		if (err){
			console.log('保存失败');
			res.send({status:0,message:'添加失败请稍后重试',data:null});
			return;
		};
		User.findOne({'userName': userName}, function (err, user) {
			if(err){
				res.send({status: 0, message: '修改articleClassNum数据库错误'})
				return;
			}
			if(user){
				User.update({'userName':user.userName},{'articleClassNum': value},function(err){
					if (err){
						res.send({status: 0,message:'users修改失败'})
						return;
					}
					//res.send({status: 1,message:'users修改成功'})
					res.send({status: 1,message:'添加成功',data:{articleClass:className,value:value}});
				})
			}
		});
	});
});
router.get('/articleClass/load', function (req,res) {
	var userName = session.userName;
	Articleclass.find({'userName':userName}, function (err, articleClass) {
		if (err) {
			res.send({status: 0, message: 'class数据库连接失败'});
			return;
		}
		console.log(articleClass);
		res.send({status: 1, message:'查找成功',data:articleClass})
	})
});
//文章发表
//var articleSchema = new Schema({
//	userName       : String,
//	articleTitle   : String,
//	articleContent : String
//})
//var Article = mongoose.model('article',articleSchema);
router.post('/article', function (req, res){
	var articleClass = req.body.articleClass;
	var articleTitle = req.body.articleTitle;
	var articleContent = req.body.articleContent;
	var userName = session.userName;
	var articleComment = 0;
	var articleDate = new Date();
	Article.find({userName: userName},function(err, article){
		if (err){
			req.send({status: 0, message: '数据库错误'})
		}
		var articleId = article.length;
		if(userName){
			var article = new Article({
				userName: userName,
				articleClass: articleClass,
				articleTitle: articleTitle,
				articleContent: articleContent,
				articleComment: articleComment,
				articleDate: articleDate,
				articleId: articleId
			});
			article.save(function (err) {
				if (err){
					console.log('文章存储失败');
					return;
				}
				res.send({status: 1,message:'添加成功',data:{articleTitle:articleTitle,articleContent:articleContent}});
			})
		}else {
			res.send({status: 0,message:'未登录'});
		}
	});

});
module.exports = router;
