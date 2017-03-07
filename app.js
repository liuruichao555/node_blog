var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var article = require('./routes/article');
var users = require('./routes/users');
var ccap = require('./routes/ccap');
var comment = require('./routes/comment');
var partials = require('express-partials');
var ueditor = require('ueditor')
var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(partials());
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.use('/ueditor',ueditor);
app.use('/ccap', ccap);
app.use('/article',article);
app.use('/comment',comment);
//app.use('/articlelist',articleList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use("public/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  //客户端上传文件设置
  var ActionType = req.query.action;
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
    var file_url = '/img/ueditor/';//默认图片上传地址
    /*其他上传格式的地址*/
    //if (ActionType === 'uploadfile') {
    //  file_url = '/file/ueditor/'; //附件
    //}
    //if (ActionType === 'uploadvideo') {
    //  file_url = '/video/ueditor/'; //视频
    //}
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    //res.setHeader('Content-Type', 'text/html');
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = '/images/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    // console.log('config.json')
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
  }
}));
app.use('/ueditor', function (req, res) {
  res.render('ueditor');
});
module.exports = app;
