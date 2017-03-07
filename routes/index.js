var express = require('express');
var router = express.Router();
var session = require('express-session');
var Article = require('../model/dbModel').Article;
/* GET home page. */

router.get('/', function(req, res, next) {
    if (session.userName){
        var user = session.userName;
    } else{
        var user = null;
    }
    Article.find({userName:'fanxiaodan'},function(err, article){
        if (err){
            req.send({message: 'error'});
        }
        var date = new Date();
        var loginUser = {
            username: user
        };
        console.log(loginUser)
        res.render('index',{title:'myblog', article: article, today:date, loginUser:loginUser});
    });
});


module.exports = router;