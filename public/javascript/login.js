/**
 * Created by 86441 on 2016/10/27.
 */
(function(){
    $(document).ready(function(){
        //登录代码
        //$('.login #user-name').focus(function () {
        //    $(this).val('');
        //    $('#user-name').css('color','#03113c');
        //});
        //$('#user-name').blur(function () {
        //    if($(this).val()==''){
        //        $(this).val('手机号/邮箱');
        //        $('#user-name').css('color','#cccccc');
        //    }
        //});
        //$('.login-cancel').click(function(){
        //    $('.login').fadeOut(200);
        //    $('#user-name').val('手机号/邮箱');
        //    $('.user-psd').val('');
        //    $('#user-name').css('color','#cccccc');
        //});
        //$('#login-btn').click(function () {
        //    //$('.login').fadeIn(200);
        //    console.log(100)
        //});
        var loginBtnFlag = true;
        $('.user-mode ul').hide();
        $(document).click(function () {
            $('.user-mode ul').hide(1000);
            loginBtnFlag = true;
        });
        $('.mode-back').click(function (event) {
            event.stopPropagation();
            if (loginBtnFlag){
                $('.user-mode ul').show(1000);
                loginBtnFlag = false;
            }else{
                $('.user-mode ul').hide(1000);
                loginBtnFlag = true;
            }

        });
        //登录验证
        $('.login-commit').mousedown(function(){
            $(this).css({color:'#03113c',background:'transparent'})
        })
        $('.login-commit').mouseup(function(){
            $(this).css({color:'#ffffff',background:'#03113c'})
        })

        //$.ajax({
        //    url:'/'
        //})
        //$('.login-commit').click(function(){
        //    var userName = $('.user-name').val();
        //    var password = $('.user-psd').val();
        //    if (userName && password){
        //        $.ajax({
        //            url:'/users/login',
        //            type:'post',
        //            dataType:'json',
        //            data:{
        //                userName: userName,
        //                password: password
        //            },
        //            success: function (data) {
        //                if (data.status == 1){
        //                    alert('登录成功');
        //                    $('.login').fadeOut(100);
        //                    $('.login-mode').hide();
        //                    $('.user-mode').show();
        //                    $(".login-tip").text('');
        //                    }else{
        //                    //alert(data.message);
        //                    $(".login-tip").text(data.message).css({'color':'red','font-size':'14px'});
        //                }
        //            },
        //            error: function () {
        //                alert('登录请求失败');
        //            }
        //        });
        //    }else{
        //        $(".login-tip").text('请输入账号和密码').css({'color':'red','font-size':'14px'});
        //    }
        //
        //})
        _.templateSettings = {
            evaluate: /<@([\s\S]+?)@>/g,
            interpolate: /<@=([\s\S]+?)@>/g,
            escape: /<@-([\s\S]+?)@>/g
        };
        var User = Backbone.Model.extend({
            initialize: function () {
                console.log(this.get('username'))
                if (this.get('username') == null){
                    this.set('status', '0');
                } else{
                    this.set('status', '1');
                }
                console.log(this)
            }
        });
        var UserView = Backbone.View.extend({
            tagName:'div',
            el:'.left-content',
            template: _.template($('#user_template').html()),

            initialize: function(){
                console.log('view init');
            },
            events:{
                'click #login-commit': 'loginCommit',
                'click #login-btn': 'loginShow',
                'focus #user-name': 'contentHide',
                'blur  #user-name': 'contentShow',
                'click .login-cancel':'contentReset',
            },
            render: function () {
                var html = this.template(this.model.attributes);
                this.$el.html(html);
            },
            loginShow: function(){
                $('.login').fadeIn(200);
            },
            loginCommit: function(){
                var userName = $('.user-name').val();
                var password = $('.user-psd').val();
                if (userName && password){
                    $.ajax({
                        url:'/users/login',
                        type:'post',
                        dataType:'json',
                        data:{
                            userName: userName,
                            password: password
                        },
                        success: function (data) {
                            if (data.status == 1){
                                alert('登录成功');
                                $('.login').fadeOut(100);
                                $('#login-mode').hide();
                                $('#user-mode').show();
                                $(".login-tip").text('');
                            }else{
                                //alert(data.message);
                                $(".login-tip").text(data.message).css({'color':'red','font-size':'14px'});
                            }
                        },
                        error: function () {
                            alert('登录请求失败');
                        }
                    });
                }else{
                    $(".login-tip").text('请输入账号和密码').css({'color':'red','font-size':'14px'});
                }
            },
            contentHide: function(){
                $('#user-name').val('');
                $('#user-name').css('color','#03113c');
            },
            contentReset: function(){
                $('.login').fadeOut(200);
                $('#user-name').val('手机号/邮箱');
                $('.user-psd').val('');
                $('#user-name').css('color','#cccccc');
            },
            contentShow: function(){
                if($('#user-name').val()==''){
                    $('#user-name').val('手机号/邮箱');
                    $('#user-name').css('color','#cccccc');
                }
            }

        });
        console.log('js'+ loginUser)
        var user = new User(loginUser);
        var userView = new UserView({model: user});
        userView.render();

    })

})(jQuery)

