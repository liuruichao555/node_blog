/**
 * Created by 86441 on 2016/12/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/myblog');
//文章表
var articleSchema = new Schema({
    userName       : String,
    articleClass   : String,
    articleTitle   : String,
    articleContent : String,
    articleComment : Number,
    articleDate    : Date,
    articleId      : Number
});
exports.Article = db.model('article',articleSchema);

//文章分类表
var classSchema = new Schema({
    userName  : String,
    className : String,
    value     : Number
});
exports.Articleclass = db.model('articleClass',classSchema);
//评论表
var commentSchema = new Schema({
    userName    : String,  //文章作者
    articleId   : String,  //文章ID
    parentId    : String,  //回复父评论ID
    comUserName : String,  //评论人
    replyUsername: String, //回复人
    commentCon  : String,  //评论内容
    commentDate : Date,    //评论日期
    likeCount   : Number,  //点赞数量
    count       : Number   //??
});
exports.Comment = db.model('comment',commentSchema);