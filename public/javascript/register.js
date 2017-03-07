/**
 * Created by 86441 on 2016/10/27.
 */


$(document).ready(function () {

    //注册代码
    $('.register-btn').click(function ()    {
        $('#login').fadeOut(200);
        $('#register').fadeIn(200);
        $('.userName').val('');
        $('.email-num').val('');
        $('.userPassword').val('');
        $('.reUserPassword').val('');
        $('.pv-code').val('');
        $('.phone-num').val('');
        $('.mobile-code').val('');
        $('.userName-lab').text('请输入用户名').css({'color':'#03113c','font-size':'12px'});
        $('.phoneNum-lab').text('请填写手机号码').css({'color':'#03113c','font-size':'12px'});
        $('.userPassword-lab').text('6~16个字符，区分大小写').css({'color':'#03113c','font-size':'12px'});
        $('.reUserPassword-lab').text('请再次填写密码').css({'color':'#03113c','font-size':'12px'});
    });
    $('.register-cancel').click(function(){
        $('#register').fadeOut(200);
    });
    $('#reg').click(function(){
        $('#register-mobile').show();
        $('#register-email').hide();
        $('.userName').val('');
        $('.email-num').val('');
        $('.userPassword').val('');
        $('.reUserPassword').val('');
        $('.pv-code').val('');
        $('.mobile-code').val('');
        $('.phoneNum-lab').text('请填写手机号码').css({'color':'#03113c','font-size':'12px'});
        $('.userName-lab').text('请输入用户名').css({'color':'#03113c','font-size':'12px'});
        $('.emailNum-lab').text('请输入邮箱').css({'color':'#03113c','font-size':'12px'});
        $('.userPassword-lab').text('6~16个字符，区分大小写').css({'color':'#03113c','font-size':'12px'});
        $('.reUserPassword-lab').text('请再次填写密码').css({'color':'#03113c','font-size':'12px'});
        $(this).css({'color':'#ffffff','backgroundColor':'#03113c'});
        $('#eml').css({'color':'#03113c','backgroundColor':'transparent'});
    });
    $('#eml').click(function () {
        $('.userName').val('');
        $('.phone-num').val('');
        $('.userPassword').val('');
        $('.reUserPassword').val('');
        $('.userName-lab').text('请输入用户名').css({'color':'#03113c','font-size':'12px'});
        $('.phoneNum-lab').text('请填写手机号码').css({'color':'#03113c','font-size':'12px'});
        $('.userPassword-lab').text('6~16个字符，区分大小写').css({'color':'#03113c','font-size':'12px'});
        $('.reUserPassword-lab').text('请再次填写密码').css({'color':'#03113c','font-size':'12px'});
        $(this).css({'color':'#ffffff','backgroundColor':'#03113c'});
        $('#reg').css({'color':'#03113c','backgroundColor':'transparent'});
        $('#register-mobile').hide();
        $('#register-email').show();
    });
//注册部分正则验证代码
    var m_userNameFlag = false;
    var m_phoneNumFlag = false;
    var m_userPasswordFlag = false;
    var m_rePasswordFlag = false;
    var m_verificationCodeFlag = false;
    var m_smsProve = false;

    $('.register-mobile .userName').blur(function () {
        if($(this).val()==''){
            $('.register-mobile .userName-lab').text('用户名不能为空').css({'color':'red','font-size':'14px'});
            m_userNameFlag = false;
        }else{
            userNameProve($(this).val());
            //$('.register-mobile .userName-lab').text('');
            //m_userNameFlag = true;
        }
    });
    $('.phone-num').blur(function(){
        var repPhone=/^1[34578]\d{9}$/  ;
        if(!repPhone.exec($(this).val())){
            $('.phoneNum-lab').text('手机号码格式错误').css({'color':'red','font-size':'14px'});
            m_phoneNumFlag = false;
        }else {
            mobileProve($(this).val());
        }
    });
    $('.register-mobile .userPassword').blur(function(){
        var regPassword=/(\w){6,16}/;
        if(!regPassword.exec($(this).val())){
            $('.register-mobile .userPassword-lab').text('密码格式不正确').css({'color':'red','font-size':'14px'});
            m_userNameFlag = false;
        }else{
            $('.register-mobile .userPassword-lab').text('');
            m_userPasswordFlag = true;
        }
        if($(this).val()!=''&& $('.register-mobile .reUserPassword').val()!='' && $(this).val()!=$('.register-mobile .reUserPassword').val() ){
            $('.register-mobile .reUserPassword-lab').text('两次密码输入不匹配，请重新输入').css({'color':'red','font-size':'14px'});
            m_userPasswordFlag = false;
        }
    });
    $('.register-mobile .reUserPassword').blur(function () {
        if($(this).val() == $('.register-mobile .userPassword').val()){
            $('.register-mobile .reUserPassword-lab').text('');
            m_rePasswordFlag = true;
        }else{
            $('.register-mobile .reUserPassword-lab').text('两次密码输入不匹配，请重新输入').css({'color':'red','font-size':'14px'});
            m_rePasswordFlag = false;
        }
    });
    $('.register-mobile .register-commit').click(function(){
        if (m_userNameFlag && m_phoneNumFlag && m_userPasswordFlag &&m_rePasswordFlag && m_verificationCodeFlag){
            $.ajax({
                url:'/ccap/mobile/smsProve',
                type:'post',
                dataType:'json',
                data:{
                    smsCode:$('.mobile-code').val()
                },
                success:function(data){
                    if (data.status == 1){
                        m_smsProve = true;
                        $('.register-tip').text('');
                    }else{
                        $('.register-tip').text('短信验证码输入错误，请查看后输入').css({'color':'red','font-size':'14px'});
                        m_smsProve = false;
                    }
                },
                error:function(){
                    alert('短信验证码验证请求失败');
                    m_smsProve = false;
                }
            });
            if (m_smsProve){
                var userName = $('.register-mobile .userName').val();
                var mobile = $('.phone-num').val();
                var password = $('.register-mobile .userPassword').val();
                $.ajax({
                    url:'/users/mobile/register',
                    type:'post',
                    dataType:'json',
                    data: {
                        userName: userName,
                        mobile: mobile,
                        password: password
                    },
                    success: function (data) {
                        if(data.status =='1'){
                            //alert('注册成功');
                            $('.register-main').fadeOut(200);
                            $('.registerMessage h3').val(data.message);
                            $('.registerMessage').fadeIn(200);

                        }else{
                            $('.registerMessage h3').val(data.message);
                        }
                    },
                    error: function () {
                        alert('注册请求失败');
                    }
                })
            }

        }
    })

    var e_userNameFlag = false;
    var e_emailFlag = false;
    var e_passwordFlag = false;
    var e_rePasswordFlag = false;

    $('.register-email .userName').blur(function () {
        if($(this).val()==''){
            $('.register-email .userName-lab').text('用户名不能为空').css({'color':'red','font-size':'14px'});
            e_userNameFlag = false;
        } else {
            userNameProve($(this).val());
        }
    });
    $('.email-num').blur(function(){
        var regEmail=/^\w+@[a-zA-Z0-9]+\.(com|cn|net)$/;
        if(!regEmail.exec($(this).val())){
            $('.emailNum-lab').text('邮箱格式不正确').css({'color':'red','font-size':'14px'});
            e_emailFlag = false;
        }else{
            emailProve($(this).val());
        }
    });
    $('.register-email .userPassword').blur(function(){
        var regPassword=/(\w){6,16}/;
        if(!regPassword.exec($(this).val())){
            $('.register-email .userPassword-lab').text('密码格式不正确').css({'color':'red','font-size':'14px'});
            e_passwordFlag = false;
        }else{
            $('.register-email .userPassword-lab').text('');
            e_passwordFlag = true;
        }
        if($(this).val()!=''&& $('.register-email .reUserPassword').val()!='' && $(this).val()!=$('.register-email .reUserPassword').val() ){
            $('.register-email .reUserPassword-lab').text('两次密码输入不匹配，请重新输入').css({'color':'red','font-size':'14px'});
            e_passwordFlag = false;
        } else {
            e_passwordFlag = true;
        }
    });
    $('.register-email .reUserPassword').blur(function () {
        if($(this).val() == $('.register-email .userPassword').val()){
            $('.register-email .reUserPassword-lab').text('');
            e_rePasswordFlag = true;
        }else{
            $('.register-email .reUserPassword-lab').text('两次密码输入不匹配，请重新输入').css({'color':'red','font-size':'14px'});
            e_rePasswordFlag = false;
        }
    });
    $('.register-email .register-commit').click(function(){
        if(e_emailFlag && e_passwordFlag && e_userNameFlag && e_rePasswordFlag){
            var userName = $('.register-email .userName').val();
            var email = $('.register-email .email-num').val();
            var password = $('.register-email .userPassword').val();
            $.ajax({
                url:'/users/email/register',
                type: 'POST',
                dataType: 'json',
                data: {
                    userName:userName,
                    email:email,
                    password:password

                },
                success:function(data){
                    if (data.status == '1') {
                        //alert('注册成功');
                        $('.register-main').fadeOut(200);
                        $('.registerMessage').fadeIn(200);
                    } else {
                        alert(data.message);
                    }
                },
                error:function(){
                    alert('请求失败请重试');
                }
            })
        }
    });
    $('.registerMessage a').click(function () {
        $('.register-main').show();
        $('.registerMessage').hide();
        $('.register').fadeOut(500);
    })
//验证码刷新
    $('.verification-code,.code-fresh').bind('click', function () {
        var timestamp= new Date().getTime();
        $('.verification-code').attr('src',$('.verification-code').attr('src')+'?'+timestamp);
    });
    //验证码校验
    $('.mobile-btn').click(function(){
            var data ={
            verificationCode: $('.pv-code').val(),
            phoneNumber: $('.phone-num').val()
        };
        var countDown = 60;
        //console.log(m_userNameFlag);
        //console.log(m_phoneNumFlag);
        if( m_userNameFlag && m_phoneNumFlag ){
                $.ajax({
                    type:"post",
                    url:"ccap/mobile/verificationCode",
                    data:data,
                    success:function(data){
                        if(data.status == '1'){
                            alert('验证成功la');
                            $(".verification-code-lab").text("");
                            var smsCount = setInterval(function(){
                                var btn = $(".mobile-btn")
                                console.log('123')
                                if (countDown == 0){
                                    btn.removeAttr('disabled');
                                    btn.val('免费获取短信验证码');
                                    countDown = 60;
                                    btn.css('color','#03113c');
                                }else{
                                    btn.attr("disabled",'true');
                                    countDown --;
                                    btn.css('color','#9d9d9d');
                                    btn.val(countDown+"秒后重新发送");
                                    return;
                                }
                                clearInterval(smsCount);
                            },1000);
                            m_verificationCodeFlag = true;
                        }else{
                            $(".verification-code-lab").text(data.message).css({'color':'red','font-size':'14px'});
                            var timestamp= new Date().getTime();
                            $('.verification-code').attr('src',$('.verification-code').attr('src')+'?'+timestamp);
                            m_verificationCodeFlag = false;
                        }

                    },
                    error:function(){
                        alert("验证码请求发送失败");
                        m_verificationCodeFlag = false;
                    }
                });

        }

    });

    //验证用户名唯一
    var userNameProve = function (userName){
            $.ajax({
                type: 'post',
                url: '/users/userName',
                data:{
                    userName:userName
                },
                success: function(data){
                    if(data.status == '1'){
                        $('.userName-lab').text('');
                        m_userNameFlag = true;
                        e_userNameFlag = true;
                    }else{
                        $('.userName-lab').text('该用户名已被使用').css({'color':'red','font-size':'14px'});
                        e_userNameFlag = false;
                        m_userNameFlag = false;
                    }
                },
                error: function(){
                    alert("用户名验证失败")
                }
            });
    };
    //验证手机号码唯一
    var mobileProve = function (mobile){
        $.ajax({
            type: 'post',
            url: '/users/mobile',
            data: {
                mobile: mobile
            },
            success: function(data){
                if (data.status == '1'){
                    $('.phoneNum-lab').text('');
                    m_phoneNumFlag = true;
                }else {
                    $('.phoneNum-lab').text('手机号已被注册').css({'color': 'red', 'font-size': '14px'});
                    m_phoneNumFlag = false;
                }
            },
            error: function(){
                alert('手机号码验证失败');
            }
        })
    };
    //验证邮箱唯一
    var emailProve = function (email) {
        $.ajax({
            type: 'post',
            url: '/users/email',
            data: {
                email: email
            },
            success: function(data){
                if (data.status == '1'){
                    $('.emailNum-lab').text('');
                    e_emailFlag = true;
                }else{
                    $('.emailNum-lab').text('邮箱已被注册').css({'color':'red','font-size':'14px'});
                    e_emailFlag = false;
                }
            },
            error: function(){
                alert("email验证失败")
            }
        })
    }
});

