$(function () {
    var url ="http://180.188.197.24";
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
    var charactors="ab1cd2ef3gh4ij5kl6mn7opq8rst9uvw0xyz";
    var value='',i;
    for(j=1;j<=4;j++){
	i = parseInt(35*Math.random()); 　
	value = value + charactors.charAt(i);
    }
    // 验证码
    $('#yzm').on('blur',function () {
        yzm = $('#yzm').val();
    });
    $.get(url+"/common/verify_code",
        
            {
                "rand_code":value,
                "lang":"zh-cn",
                "verify_type":"getVerifyCode",
                "t":"1530776541533"
            },
            function (data, status) {
                $('#img_captcha').attr('src','data:image/png; base64,'+data+'')
                
                $('#img_captcha').on('click',function () {
                    $.get(url+"/common/verify_code",
                    {
                        "rand_code":value,
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
    //
    
    // 提交
    $('#agree').on('click',function () {
    // this.attr('checked');
    });
    
    //判断验证码
    




    
    $('#submit').on('click',function () {
        if (!$('#agree').is(':checked')) {
            alert("请勾选协议!")
        }else{
    
        //    console.log($("#agree").is(':checked'))
        // console.log(before_invitation_code);
                //发请求
                //response
                if(type==0){
                    $.post(url+"/common/send_email_verify_code", 
                    
                            {
                                "rand":value,
                                "verify_code":yzm,
                                "email":email,
                                "lang":"zh-cn",
                                "cliend-id":""
                            },
                        function (data,status) {
                            console.log(1);
                            console.log(data);
                            if (data.code ==1) {
                                console.log(password);
                                location.href = "../html/phoneVerification.html?rand="+value+"&verify_code="+yzm+"&email="+email+"&lang=zh-cn&cliend-id=&password="+password+"&againPassword="+againPassword+"&verify_code="+yzm+"&type="+type;
                                // $.cookie('email',email,'path=/');
                            }else{
                                alert('注册失败');
                            }
                        },
                    );
                    
                }else if(type==1){
                    $.post(url+"/common/send_sms_verify_code", 
                            {
                                "rand":value,
                                "verify_code":yzm,
                                "area_code":"",
                                "cell_phone":phone,
                                "lang":"zh-cn",
                                "cliend-id":""
                            },
                        function (data,status) {
                            
                            if (data.code ==1) {
                                location.href = "../html/phoneVerification.html?rand="+value+"&verify_code="+yzm+"&phone="+phone+"&lang=zh-cn&cliend-id=&password="+password+"&againPassword="+againPassword+"&verify_code="+yzm;
                            }else{
                                console.log(1);
                                alert('注册失败');
                            }
                        },
                    );
                //     var data = {
                //         "code":"1111",
                //         "area_code":"86",
                //         "type" :type,
                //         "country_code":"CN",
                //         "cell_phone_num":phone,
                //         "pwd" :password,
                //         "pwd2":againPassword,
                //         "verify_code":"",
                //         "email":"",
                //         "before_invitation_code":before_invitation_code
                //     };
                //     console.log("data:");
                //     console.info(data);
                //     $.post(url+"/account/register",data,function (data, status) {
                //         console.log(data);
                //         if(data.code==1){
                //             alert("注册成功");
                //             location.href = "../phoneRegSuccess.html"

                //         }else{
                //             alert("注册失败");
                //         }
    
                //     }
                // );
                }
            }
    })
    


})