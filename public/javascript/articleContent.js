/**
 * Created by 86441 on 2016/10/19.
 */
function comboardClose(){
    var commentBoard=document.getElementById('comment-board');
    commentBoard.style.right='-50%';
    commentBoard.style.opacity='0';
    console.log(commentBoard.style.right);
}
function comboardOpen(){
    var commentBoard=document.getElementById('comment-board');
    commentBoard.style.right='0';
    commentBoard.style.opacity='1';
    console.log(commentBoard.style.right);
}
$(document).ready(function(){
    $('.comment-btn').click(function(){
        var id = window.location.search.substring(4);
        if (!id){
            $.ajax({
                url :'/comment/list',
                type: 'post',
                dateType:'json',
                date:{
                    id: id
                },
                success:function(response){
                    $('.comment-input').val('回复@'+response.userName+':');
                    for(var keyC in response.comment){
                        var today = new Date();
                        var commentDate = new Date(response.comment[keyC].commentDate);
                        if(parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60/ 24)!=0){
                            var time = parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60/ 24)+'天前';
                        }else if (parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60) !=0){
                             var time = parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60)+'小时前';
                        }else if(parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60)){
                            var time = parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60)+'分钟前';
                        }else if(parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000)){
                            var time = '刚刚';
                        };
                        var comment = "<li class='comment-li'><a><span><img src='/img/1398.png' width='45'></span><b>"+response.comment[keyC].comUserName+"</b></a><p>" + response.comment[keyC].commentCon + "</p><div class='func-group'> <a class='likeit'><img src='/img/Like.png' width='20'>"+"("+response.comment[keyC].likeCount+")"+"</a><a class='reply'><img src='/img/Comment.png' width='20'></a> <a class='delete'><img src='/img/Trash.png' width='20'></a> <time>"+time+"</time></div></li>";
                        $('.comment-ul').append(comment);
                        if (!response.commentReply){
                            var replyUl = '<ul class="reply-ul"></ul>';
                            $('.comment-li').append(replyUl);
                            for (var keyR in response.commentReply){
                                if (response.comment[keyC]._id == response.commentReply[keyR].parentId);
                                var replyLi = '<li class="reply-li"><a><span><img src="/img/1398.png" width="30"></span><b>'+response.commentReply[keyR].replyUsername+'</b></a><p>'+response.commentReply[keyR].commentCon+'</p><div class="func-group" style="margin-left: 250px;"> <a class="reply"><img src="/img/Comment.png" width="20"></a> <a class="delete"><img src="/img/Trash.png" width="20"></a></div></li>'
                                $('.reply-ul').append(replyLi);
                            }
                        }
                    }
                }
            })
        }else{
            $.ajax({
                url :'/comment/list',
                type: 'post',
                dateType:'json',
                date:{
                    id: id
                },
                success:function(response){
                    $('.comment-input').val('回复@'+response.userName+':')
                    for(var keyC in response.comment){
                        var today = new Date();
                        var commentDate = new Date(response.comment[keyC].commentDate);
                        if(parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60/ 24)!=0){
                            var time = parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60/ 24)+'天前';
                        }else if (parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60) !=0){
                            var time = parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60/ 60)+'小时前';
                        }else if(parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60)){
                            var time = parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000/ 60)+'分钟前';
                        }else if(parseInt(Math.abs(today.getTime()  -  commentDate.getTime())/ 1000)){
                            var time = '刚刚';
                        };
                        var comment = "<li class='comment-li'><a><span><img src='/img/1398.png' width='45'></span><b>"+response.comment[keyC].comUserName+"</b></a><p>" + response.comment[keyC].commentCon + "</p><div class='func-group'> <a class='likeit'><img src='/img/Like.png' width='20'>"+"("+response.comment[keyC].likeCount+")"+"</a><a class='reply'><img src='/img/Comment.png' width='20'></a> <a class='delete'><img src='/img/Trash.png' width='20'></a> <time>"+time+"</time></div></li>";
                        $('.comment-ul').append(comment);
                        if (!response.commentReply){
                            var replyUl = '<ul class="reply-ul"></ul>';
                            $('.comment-li').append(replyUl);
                            for (var keyR in response.commentReply){
                                if (response.comment[keyC]._id == response.commentReply[keyR].parentId);
                                var replyLi = '<li class="reply-li"><a><span><img src="/img/1398.png" width="30"></span><b>'+response.commentReply[keyR].replyUsername+'</b></a><p>'+response.commentReply[keyR].commentCon+'</p><div class="func-group" style="margin-left: 250px;"> <a class="reply"><img src="/img/Comment.png" width="20"></a> <a class="delete"><img src="/img/Trash.png" width="20"></a></div></li>'
                                $('.reply-ul').append(replyLi);
                            }
                        }
                    }
                }
            })
        }

    })

    $('.commit-btn').click(function(){
        var index = $('.comment-input').val().indexOf(':');
        var nameStart = $('.comment-input').val().indexOf('@');
        var userName = $('.comment-input').val().substring(nameStart+1,index);
        var commentCon = $('.comment-input').val().substring(index+1);
        var id = window.location.search.substring(4);
        var date = new Date();
        if (!id){
            $.ajax({
                url:'/comment/id',
                type:'get',
                dateType:'json',
                success:function(response){
                    var id = response.article._id;
                },
                error:function(){

                }
            })
        }
        if(!reply){
            $.ajax({
                url:'/comment/save',
                type:'post',
                dateType:'json',
                data:{
                    userName    : userName,  //文章作者
                    articleId   : id,  //文章ID
                    parentId    : null,  //回复父评论ID
                    //comUserName : String,  //评论人
                    replyUsername: null, //回复人
                    commentCon  : commentCon,  //评论内容
                    commentDate : date,    //评论日期
                    likeCount   : 0,  //点赞数量
                    count       : 0   //??
                },
                success: function (response) {

                }
            })
        }
    })
    $('.reply').click(function(){
        $('.reply-model').show()
    })
    var num = $('.comment-input').val().length;
    $('.comment-input').bind('input',function(){
        var textCount = $(this).val().length;
        if (textCount>199){
            $(this).val($(this).val().substring(0,200));
            var lastNumber = 200 + num - textCount;
            $('.comment-board label').text('200/200');

        }else{
            var lastNumber = 200 + num - textCount;
            $('.comment-board label').text(lastNumber+'/200');

        }

    })
})
