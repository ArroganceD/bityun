$(function () { 
    var url = "http://180.188.197.24"
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);     
        if(r!=null)return  unescape(r[2]); return null;
    } 
    var before_invitation_code =  GetQueryString("before_invitation_code");
    var user_name_email = GetQueryString("email");
    var user_name_phone = GetQueryString("phone");
    var value =GetQueryString("rand");
    var password = GetQueryString("password");
    var againPassword = GetQueryString("againPassword");
    var yzm = GetQueryString("verify_code");
    var type = GetQueryString("type");
    
    if (type == 0) {
        $('.tab_hd li').eq(1).addClass('active');
        $('.tab_bd li').eq(1).addClass('thisclass');
        $('.user_name_email').html(user_name_email);
    }else if (type == 1) {
        $('.tab_hd li').eq(0).addClass('active');
        $('.tab_bd li').eq(0).addClass('thisclass');
        $('.user_name_phone').html(user_name_phone);
    }


    $('#submit').click(function () {
        if (type == 0) {
            
            $.post(url+"/account/register",{
                        "code":value,
                        "area_code":"",
                        "type" :type,
                        "country_code":"CN",
                        "cell_phone_num":"",
                        "pwd" :password,
                        "pwd2":againPassword,
                        "verify_code":yzm,
                        "email":user_name_email,
                        "before_invitation_code":before_invitation_code
                    },function (data, status) {
                        console.log(data);
                        if(data.code==1){
                            // alert("注册成功");
                            location.href = "../html/phoneRegSuccess.html?email="+user_name_email;
                        }else{
                            alert("注册失败");
                        }
                    }
            );  
        }else if (type == 1) {
            var data = {
                    "code":value,
                    "area_code":"86",
                    "type" :type,
                    "country_code":"CN",
                    "cell_phone_num":user_name_phone,
                    "pwd" :password,
                    "pwd2":againPassword,
                    "verify_code":yzm,
                    "email":"",
                    "before_invitation_code":before_invitation_code
                };
                $.post("http://192.168.1.18:12007/account/register",data,function (data, status) {
                    console.log(data);
                    if(data.code==1){
                        location.href = "../html/phoneRegSuccess.html?phone="+user_name_phone;
                    }else{
                        alert("注册失败");
                    }

                }
            );



        }





    })
   






 })