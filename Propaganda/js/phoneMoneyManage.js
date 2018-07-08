
$(function () {
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);     
        if(r!=null)return  unescape(r[2]); return null;
    }
    var user_name;
    if (GetQueryString("user_name")) {
        user_name = GetQueryString("user_name");
    }else if ( GetQueryString("user_name")) {
        user_name = GetQueryString("user_name")
    }
    console.log(user_name);
    
    $('.user_name').html(user_name);

})