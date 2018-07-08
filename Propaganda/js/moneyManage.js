$(function () {
    var url ="http://180.188.197.24"
    var score = $.cookie("token");
    var username = $.cookie("user_name");
    $(document).ready(function(){
        $('.user li').eq(1).html(username);
        $.get(url+"/account/get_point_user?token="+score,
        function (response) {
        if(response.code==1){
            console.log(response);
            // alert("登录成功");
            $('#score').html(response.data.point);
        }else{
        }
        })
    })
    
    //logo
    $('.header_logo').mousedown(function () {
        $(this).css({"background":"url(../img/btn_header_home.png) -244px 0 no-repeat"})
        $(location).attr("href","../index.html");
    }).mouseup(function () {
        $(this).css("background","");
    })
    //nav
    $('.nav li:nth-child(4),.nav li:nth-child(5),.nav li:nth-child(7)').hover(function () {  
        $(this).find('ul').show();
        $(this).find('span').css({"background":"url('../img/home_header\ _icon_up.png') center center"})
    },function () {  
        $(this).find('ul').hide();
        $(this).find('span').css({"background":"url('../img/home_header\ _icon_drop.png') center center"})
    });
    $('.user li:nth-child(3)').hover(function () {
        $(this).find('ul').show();
        $(this).find('.arrow').show();
        $(this).find('.arrow_up').css({"background":"url('../img/home_header\ _icon_up.png') center center"})
    },function () {  
        $(this).find('ul').hide();
        $(this).find('.arrow').hide();
        $(this).find('.arrow_up').css({"background":"url('../img/home_header\ _icon_drop.png') center center"})
    });
    // console.log($.cookie('username'));
    
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);     
        if(r!=null)return  unescape(r[2]); return null;
    } 
    var before_invitation_code =  GetQueryString("before_invitation_code");
})