/**
 * Created by 86441 on 2016/11/30.
 */
$(document).ready(function(){
    $.ajax({
        url:'/users/articleClass/load',
        type:'get',
        dataType:'json',
        success: function(response){
            if(response.status == 1){
                console.log(response.data)
                for(var key in response.data){
                    var addClass = '<option value='+response.data[key].value+'>'+response.data[key].className+'</option>';
                    $('.articleCategories').append(addClass);
                }
            }else{

            }
        },
        error:function(){
            alert('请求失败');
        }
    })
    $('.classSubmit').mousedown(function(){
        $(this).css({color:'#03113c',background:'transparent'})
    });
    $('.classSubmit').mouseup(function(){
        $(this).css({color:'#ffffff',background:'#03113c'})
    });
    $('.classMsg a').mousedown(function(){
        $(this).css({color:'#03113c',background:'transparent'})
    });
    $('.classMsg a').mouseup(function(){
        $(this).css({color:'#ffffff',background:'#03113c'})
    });
    $('.classMsg a').click(function () {
        $('.addClass').fadeOut(500);
        $('.className').val('');
    });
    $('.classCancel').click(function () {
        $('.addClass').fadeOut(500);
        $('.className').val('');
    });
    $('.articleCategories').change(function () {
        if($('.articleCategories').val() == '1'){
            $('.addClass').fadeIn(500);
            $('.classMsg').hide();
            $('.addClass').show();
            $('.className').val('');
        }

    });
    $('.classSubmit').click(function () {
        var className = $('.className').val();
        $.ajax({
            url: '/users/articleClass',
            type: 'post',
            dataType: 'json',
            data: {
                className: className
            },
            success: function(data){
                if(data.status == 1){
                    //alert('添加成功');
                    //console.log(data)
                    $('.addClass').fadeOut(500);
                    var newClass = '<option value='+data.data.value+'>'+data.data.articleClass+'</option>';
                    $('.articleCategories').append(newClass);
                    //console.log(data.value)
                }else{
                    $('.classAdd').hide();
                    $('.classMsg').show();
                    $('.classMsg h3').val(data.message);
                }
            },
            error: function(){
                alert('分类添加请求发送失败');
            }
        })
    });

    $('.articleCommit').click(function(){
        $(this).css('border-radius','25px');
        var arr = [];
        var articleTitle = $('.articleTitle').val();
        var articleClass = $(".articleCategories").find("option:selected").text();
        arr.push(UE.getEditor('editor').getPlainTxt());
        var articleContent = arr.join();
        alert(arr.join());
        alert(arr);
        if ($(".articleCategories").val()>=2 && articleTitle && articleContent){
            $.ajax({
                url: '/users/article',
                type:'post',
                dataType:'json',
                data: {
                    articleClass: articleClass,
                    articleTitle: articleTitle,
                    articleContent: articleContent
                },
                success: function (response) {
                    if (response.status = 1){
                        console.log(response.message)
                    }else {
                        console.log(response.message)
                    }
                },
                error: function () {
                    alert('文章添加失败')
                }

            });
        } else{
            alert('文章信息不完整，无法保存')
        };

    });
    $('.articleCategories').blur(function () {
        console.log($(".articleCategories").find("option:selected").text())
    })
});