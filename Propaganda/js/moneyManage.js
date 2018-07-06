$(function () {
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
        console.log(1);
        $(this).find('ul').show();
        $(this).find('.arrow').show();
        $(this).find('.arrow_up').css({"background":"url('../img/home_header\ _icon_up.png') center center"})
    },function () {  
        $(this).find('ul').hide();
        $(this).find('.arrow').hide();
        $(this).find('.arrow_up').css({"background":"url('../img/home_header\ _icon_drop.png') center center"})
    });






})