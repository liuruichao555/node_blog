/**
 * Created by 86441 on 2016/12/29.
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');
var Comment = require('../model/dbModel').Comment;
var Article = require('../model/dbModel').Article;

router.post('/list',function(req, res){
    if (!req.body.id){
        Article.findOne({userName:'fanxiaodan'}).sort({id:-1}).exec(function(err, article){
            if (err){
                res.send({status: 0,message: '数据库错误' })
                return;
            }
            Comment.find({_id:article._id},function(err, comment){
                if (err){
                    res.send({status: 0,message:'数据库错误'});
                    return;
                }
                var commentReply = new Array();
                for(var key in comment){
                    Comment.find({parentId: comment[key]._id},function(err, reply){
                        if (err){
                            res.send({status: 0,message:'数据库错误'});
                            return;
                        }
                        commentReply.push(reply);
                    });
                }
                res.send({status: 1, message:'success', userName: article.userName,articleID:article._id,comment: comment, commentReply: commentReply})
            })
        })
    } else{
        Comment.find({_id:req.body.id},function(err,comment){
            if (err){
                res.send({status: 0, message:'数据库错误'});
                return;
            };
            var commentReply = new Array();
            for(var key in comment){
                Comment.find({parentId: comment[key]._id}, function(err, reply){
                    if (err){
                        res.send({status: 0, message: '数据库错误'});
                        return;
                    }
                    commentReply.push(reply);
                });

            };
            res.send({status: 1, message:'success', userName:comment[0].userName,comment: comment, commentReply: commentReply});
        })
    }

})
router.get('/id',function(req, res){
    Article.findOne({userName:'fanxiaodan'}).sort({id:-1}).exec(function(err, article){
        if (err){
            res.send({status: 0, message: '数据库错误'});
            return;
        }
        res.send({status: 1, message:'获取文章id成功',articleId:article._id})
    })
});
//router.post('/save',function(req, res){
//    Comment.save()
//})
module.exports = router;