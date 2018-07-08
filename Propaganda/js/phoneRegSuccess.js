$(function () {
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);     
        if(r!=null)return  unescape(r[2]); return null;
    }
    var user_name;
    if (GetQueryString("email")) {
        user_name = GetQueryString("email");
    }else if ( GetQueryString("phone")) {
        user_name = GetQueryString("phone")
    }
    $('.user_name').html(user_name);

    $('.regSuccess_message').click(function () {  
        location.href = "../html/phoneMoneyManage.html?user_name="+user_name;
    })

})