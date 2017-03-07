/**
 * Created by 86441 on 2016/12/13.
 */
var express = require('express');
var router = express.Router();
var session = require('express-session');
var Article = require('../model/dbModel').Article;
var Articleclass = require('../model/dbModel').Articleclass;
router.get('/list', function (req, res, next) {

    Article.find({userName:session.userName}, function(err, article){
        if (err){
            req.send({message: 'error'});
            return;
        }
        var date = new Date();
        Articleclass.find({userName:session.userName},function(err,articleClass){
            if (err){
                req.send({message: 'error'});
                return;
            };
            res.render('articlelist',{title:'文章列表', articles: article, today: date, articleClasses: articleClass})
        });
    })
});


router.get('/publish', function (req, res, next) {
    res.render('articlePublish',{title:'发表文章'})
});
router.get('/list/all',function (req, res){
    Article.find({userName:session.userName}, function(err, article){
        if (err){
            req.send({status:0, message: 'error'});
            return;
        }
        res.send({status: 1,message: '成功',article: article})
    });
});

router.post('/list/class', function (req, res) {
    var articleClass = req.body.articleClass;
    Article.find({userName:session.userName, articleClass:articleClass}, function(err, article){
        if (err){
            req.send({status: 0,message: 'error'});
            return;
        }
        res.send({status: 1,message: '成功',article: article})

    })
});

router.get('/content',function(req, res){
    var id = req.query.id;
    Article.findOne({_id:id},function(err, article){
        if (err){
            req.send({status: 0,message: 'error'});
            return;
        }
        Article.findOne({articleDate:{$gt:article.articleDate}},function(err,articlePrep){
            if (err){
                req.send({status: 0,message: 'error'});
                return;
            }
            var date = new Date();
            Article.find({articleDate:{$lt:article.articleDate}}).sort({_id:-1}).limit(1).exec(function(err, articleNext){
                if (err){
                    req.send({status: 0,message:'error'});
                }
                console.log(article.articleTitle)
                console.log(articleNext)
                console.log(articlePrep)
                res.render('article',{title:article.articleTitle,article:article,today:date,articleNext:articleNext,articlePrep:articlePrep})
            });
            //Article.find({articleDate:{$lt:article.articleDate}},function(err, articleNext){
                //console.log(article.articleTitle)
                //console.log(articleNext)
                //console.log(articlePrep)
                //res.render('article',{title:article.articleTitle,article:article,today:date,articleNext:articleNext,articlePrep:articlePrep})
            //})
        })
    })
})
module.exports = router;