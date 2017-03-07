/**
 * Created by 86441 on 2016/11/2.
 */
var express = require('express');

var router = express.Router();
var session = require('express-session');
var sms = require('../tools/sms');
var ccap = require('ccap');
var captcha = ccap({
    width:200,
    height:60,
    offset:30
});
router.get('/verifyCode', function(req, res) {
    var ary = captcha.get();
    var text = ary[0];
    var buffer = ary[1];
    session.text = text;
    res.end(buffer);
});
router.post("/mobile/verificationCode",function(req, res){
    //try {
        var verificationCode = req.body.verificationCode.toUpperCase();
        var phoneNumber = req.body.phoneNumber;
        console.log(verificationCode);
        var text = session.text;
        console.log('session text: ' + text);
        console.log(text == verificationCode.toUpperCase());
        if (verificationCode == text) {
            var smsCode = '';
            for(i=0;i<4;i++){
                var x = parseInt(Math.random()*10).toString();
                smsCode+=x;
            };
            session.smsCode = smsCode;
            sms(phoneNumber,smsCode);
            res.send({status: 1, message: "验证成功", data: {smsCode:smsCode}});

        } else {
            res.send({status: 0, message: "验证码输入错误，请重新输入", data: null});
        }
    //} catch (e) { console.log(e); }
});
router.post("/mobile/smsProve",function(req,res){
    var smsCode = req.body.smsCode;
    if (smsCode == session.smsCode){
        res.send({status: 1, message: '短信验证成功',data:null});
    }else{
        res.send({status: 0, message: '短信验证失败',data: null});
    }
});
module.exports = router;
