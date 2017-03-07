/**
 * Created by 86441 on 2016/12/8.
 */
$(document).ready(function(){
    $('.articleClass').change(function(){
        var articleClass = $(".articleClass").find("option:selected").text();
        if (articleClass == '全部'){
            $.ajax({
                url:'/article/list/all',
                type:'get',
                success: function (response) {
                    console.log(typeof(response.today))
                    $('.articleList ul li').remove();
                    $('.emptyMsg').remove();
                    if (response.article.length == 0){
                        var emptyMsg = '<div class="emptyMsg">快来添加文章吧~~</div>'
                        $('.articleList').append(emptyMsg);
                    }else{
                        var today = new Date();
                        for(var i=response.article.length-1;i>=0;i--){
                            var spanContent = '';
                            var articleDate = new Date(response.article[i].articleDate);
                            var dateCount = Math.abs(today.getTime()  -  articleDate.getTime())/ 1000/ 60/ 60/ 24;
                            if ( parseInt(dateCount)!=0){
                                spanContent = parseInt(dateCount) + '天前发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            } else if( parseInt(dateCount *24) != 0){
                                spanContent = parseInt(dateCount *24) + '小时前发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            } else if( parseInt(dateCount * 24 * 60) != 0){
                                spanContent = parseInt(dateCount * 24 * 60) + '分钟前发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            } else{
                                spanContent = '刚刚发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            }
                            var $liContent = "<li><div class='col-lg-8'><h5>"+response.article[i].articleTitle+"</h5><p>" +response.article[i].articleContent+ "</p><br><span>" + spanContent + "</span></div><div class = 'col-lg-4'><img src='/img/thecat.jpg' width='300'></div></li>";
                            $('.articleList ul').append($liContent);
                        }
                    }

                },
                error: function () {
                    console.log('读取错误');
                }
            })
        } else {
            $.ajax({
                url:'/article/list/class',
                type:'post',
                dataType:'json',
                data:{
                    articleClass: articleClass
                },
                success: function (response) {
                    $('.articleList ul li').remove();
                    $('.emptyMsg').remove();
                    if (response.article.length == 0){
                        var emptyMsg = '<div class="emptyMsg">快来添加文章吧~~</div>'
                        $('.articleList').append(emptyMsg);
                    }else{
                        var today = new Date();
                        for(var i=response.article.length-1;i>=0;i--){
                            var spanContent = '';
                            var articleDate = new Date(response.article[i].articleDate)
                            var dateCount = Math.abs(today.getTime()  -  articleDate.getTime())/ 1000/ 60/ 60/ 24;
                            if ( parseInt(dateCount)!=0){
                                spanContent = parseInt(dateCount) + '天前发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            } else if( parseInt(dateCount *24) != 0){
                                spanContent = parseInt(dateCount *24) + '小时前发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            } else if( parseInt(dateCount * 24 * 60) != 0){
                                spanContent = parseInt(dateCount * 24 * 60) + '分钟前发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            } else{
                                spanContent = '刚刚发布 | ' + response.article[i].articleClass + ' | 90条评论';
                            }
                            var $liContent = "<li><a><div class='col-lg-8'><h5>"+response.article[i].articleTitle+"</h5><p>" +response.article[i].articleContent+ "</p><br><span>" + spanContent + "</span></div><div class = 'col-lg-4'><img src='/img/thecat.jpg' width='300'></div></a></li>";
                            $('.articleList ul').append($liContent);
                        }
                    }

                },
                error: function(){
                    console.log('读取错误');
                }

            })
        }

    })
})
