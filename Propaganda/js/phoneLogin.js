$(function () {
    //登录
    
    $('#loginSubmit').click(function(){
        if ($('#user_name').val() != '') {
          var phone = $('#user_name').val();
        }     
        if ($('#user_pwd').val() != '') {
            var password = $('#user_pwd').val();
        }
        
        $.post("http://192.168.1.18:12007/account/login",
                {
                    "client_id": "",
                    "email_or_phone": phone,
                    "pwd": password,
                    "rand": "CN",
                    "verify_code": ""
                },function (response) {
                console.log(response);
                if(response.code==1){
                    location.href = "../html/phoneMoneyManage.html"
                }else{
                    alert("账号或密码错误");
                }
                
            }
        )}
    );
})