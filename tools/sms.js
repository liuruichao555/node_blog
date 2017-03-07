
var co = require('co');
var UCPaas = require('ucpaas');

function sms(phoneNum,smsCode){
    co(function* () {
        var ucpaas = UCPaas({
            'accountSid': '2073eb0323120d40c1d298ab9389fd50',
            'token': '7d6d1c31b9f178f6051ef1f5567eb9ca',
            'appId': '0a9e9b5b2bce4eef9653d30764452446'
        });
        var result = yield ucpaas.sms({
            "param": smsCode,
            "templateId": "31900",
            "to":phoneNum
        });
        console.log('result: ', result);
        console.log(smsCode)
    });
}

module.exports = sms;