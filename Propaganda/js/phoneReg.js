$(function () {
    function GetQueryString(name){     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");     var r = window.location.search.substr(1).match(reg);     if(r!=null)return  unescape(r[2]); return null;} 
    var before_invitation_code =  GetQueryString("before_invitation_code");
    var type = 1; 
    function tabs(tabTit,on,tabCon){
        $(tabTit).children().click(function(){
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
               $(tabCon).children().eq(index).show().siblings().hide();
               if (index == 0) {
                type = 1
            }else if (index == 1) {
                type = 0
            }
    	});
	};
    tabs(".tab_hd","active",".tab_bd");
    
    var phone,email,password,againPassword,yzm;
    var phonePass = false,passwordPass = false,yzmPass = false;
    $('#phone').on('blur',function () {
         phone = $('#phone').val();
        
        if(phone.length != 11){
        $('#phone').css('border','1px solid red');
        $('.thisclass .error').show();
        phonePass = false;
        return ;
    }else{
        $('#phone').css('border','1px solid #dfe5ea');
        $('.thisclass .error').hide();
        phonePass = true
    }
    });
    $('#email').on('blur',function () {
        email = $('#email').val();
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (email == '') {
            $('.ensureEmail .error').show();
        }else if (!reg.exec(email)) {
            $('.ensureEmail .error').show();
        }
    });
    // // 验证密码
    $('#againPassword').on('blur',function () {
        password = $('#password').val();
        againPassword = $('#againPassword').val();
        if(password != againPassword){
            $('#againPassword').css('border','1px solid red');
            $('.ensurePassword .error').show();
            passwordPass = false;
            return ;
        }else{
            $('#againPassword').css('border','1px solid #dfe5ea');
            $('.ensurePassword .error').hide();
            passwordPass = true;
        }

    });
    // 验证码
    $.get("http://192.168.1.18:12007/common/verify_code",
        
            {
                "rand_code":"94632",
                "lang":"zh-cn",
                "verify_type":"getVerifyCode",
                "t":"1530776541533"
            },
            function (data, status) {
                $('#img_captcha').attr('src','data:image/png; base64,'+data+'')
                $('#img_captcha').on('click',function () {
                    $.get("http://192.168.1.18:12007/common/verify_code",
        
                    {
                        "rand_code":"94632",
                        "lang":"zh-cn",
                        "verify_type":"getVerifyCode",
                        "t":"1530776541533"
                    },
                    function (data, status) {
                        $('#img_captcha').attr('src','data:image/png; base64,'+data+'')
                    })
                })
            },
    );
    
    // 提交
    $('#agree').on('click',function () {
    // this.attr('checked');
    });
    
    //注册
    $('#submit').on('click',function () {
        if (!$('#agree').is(':checked')) {
            alert("请勾选协议!")
        }else{
    
        //    console.log($("#agree").is(':checked'))
        // console.log(before_invitation_code);
                //发请求
                //response
                if(type==0){
                    $.post("http://192.168.1.18:12007/account/register",{
                        "code":"1111",
                        "area_code":"",
                        "type" :type,
                        "country_code":"CN",
                        "cell_phone_num":"",
                        "pwd" :password,
                        "pwd2":againPassword,
                        "verify_code":"",
                        "email":email,
                        "before_invitation_code":before_invitation_code
                    },function (data, status) {
                        console.log(data);
                        if(data.code==1){
                            // alert("注册成功");
                            location.href = "./phoneRegSuccess.html"

                            // $('.getyzm').show(); 
                        }else{
                            alert("注册失败");
                        }
    
                        }
                    );  
                }else if(type==1){
                    var data = {
                        "code":"1111",
                        "area_code":"86",
                        "type" :type,
                        "country_code":"CN",
                        "cell_phone_num":phone,
                        "pwd" :password,
                        "pwd2":againPassword,
                        "verify_code":"",
                        "email":"",
                        "before_invitation_code":before_invitation_code
                    };
                    console.log("data:");
                    console.info(data);
                    $.post("http://192.168.1.18:12007/account/register",data,function (data, status) {
                        console.log(data);
                        if(data.code==1){
                            alert("注册成功");
                            location.href = "../phoneRegSuccess.html"

                        }else{
                            alert("注册失败");
                        }
    
                    }
                );
                }
            }
    })
    


})