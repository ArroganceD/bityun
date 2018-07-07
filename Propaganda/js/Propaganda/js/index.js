$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var before_invitation_code = GetQueryString("before_invitation_code");

    function IsPC() {
        //  var userAgentInfo = navigator.userAgent;
        //   var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        //    var flag = true;
        //     for (var v = 0; v < Agents.length; v++) {
        //          if (userAgentInfo.indexOf(Agents[v]) > 0) { 
        //              flag = false; break; 
        //             } 
        //         } 
        //         return flag;
        if ($(window).width() > 750) {
            return true;
        }
    }


    //登录
    $(".header_login").click(function (e) {
        e.stopPropagation();
        if (IsPC()) {
            $('.ejectLogin').show();
            $(".ejectReg").hide();
            $('body').css({"background": "#ccc", "overflow": "hidden"})

        } else {
            window.location.href = "./html/phoneLogin.html"
        }

    });
    $(".ejectLogin h3 span").click(function () {

        $(".ejectLogin").hide();
        $('body').css({"background": "", "overflow": ""})
    });

    $(document).click(function () {
        if ($(".ejectLogin").show()) {
            $(".ejectLogin").hide();
        }
        $('body').css({"background": "", "overflow": ""})
    });

    $(".ejectLogin").click(function (e) {
        e.stopPropagation();//阻止事件向上冒泡 
    });


    //注册
    var type = 1;

    function tabs(tabTit, on, tabCon) {
        $(tabTit).children().click(function () {
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
            $(tabCon).children().eq(index).show().siblings().hide();
            if (index == 0) {
                type = 1
            } else if (index == 1) {
                type = 0
            }
        });
    };
    tabs(".tab_hd", "active", ".tab_bd");
    tabs(".tab_hd2", "active", ".tab_bd2")

    $(".header_reg,.big_reg").click(function (e) {
        e.stopPropagation();

        if (IsPC()) {
            $(".ejectLogin").hide();
            $('.ejectReg').show();
            $('body').css({"background": "#ccc", "overflow": "hidden"})
        } else {
            window.location.href = "./html/phoneReg.html"
        }

    });
    $(".ejectReg .close").click(function () {

        $(".ejectReg").hide();
        $('body').css({"background": "", "overflow": ""})
        $('.close').css({"background": "url(./img/icon_close.png) 0 0 no-repeat"})
    });

    $(document).click(function () {
        if (!$(".ejectReg").hide()) {
            $(".ejectReg").hide();
        }
        $('body').css({"background": "", "overflow": ""})
        $('.close').css({"background": "url(./img/icon_close.png) 0 0 no-repeat"})
    });

    $(".ejectReg").click(function (e) {
        e.stopPropagation();//阻止事件向上冒泡 
    });

    var phone, password, againPassword, yzm, email;
    var phonePass = false, passwordPass = false, yzmPass = false, emailPass = false;
    $('#phone').on('blur', function () {
        phone = $('#phone').val();
        if (phone.length != 11) {
            $('#phone').css('border', '1px solid red');
            $('.thisclass .error').show();
            phonePass = false;
            return;
        } else {
            $('#phone').css('border', '1px solid #dfe5ea');
            $('.thisclass .error').hide();
            phonePass = true
        }
    });
    $('#email').on('blur', function () {
        email = $('#email').val();
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (email == '') {
            $('.ensureEmail .error').show();
        } else if (!reg.exec(email)) {
            $('.ensureEmail .error').show();
        }

    });
    // 验证密码
    $('#againPassword').on('blur', function () {
        password = $('#password').val();
        againPassword = $('#againPassword').val();
        if (password != againPassword) {
            $('#againPassword').css('border', '1px solid red');
            $('.ensurePassword .error').show();
            passwordPass = false;
            return;
        } else {
            $('#againPassword').css('border', '1px solid #dfe5ea');
            $('.ensurePassword .error').hide();
            passwordPass = true;
        }

    });

    // 验证码
    $('#yzm').on('blur', function () {
        yzm = $('#yzm').val();
        if (!yzm.trim()) {
            $('#yzm').css('border', '1px solid red');
            yzmPass = false;
            return;
        } else {
            $('#yzm').css('border', '1px solid #dfe5ea');
            yzmPass = true
        }
    });
    获取验证码
    $('#img_captcha').on('click', function () {
        $.get("http://192.168.1.18:12007/common/verify_code",

            {
                "rand_code": "94632",
                "lang": "zh-cn",
                "verify_type": "getVerifyCode",
                "t": "1530776541533"
            },
            function (data, status) {
                console.log("数据：" + data + "\n状态：" + status);
            },
        );

    })
    $.get("http://192.168.1.18:12007/common/verify_code",

        {
            "rand_code": "94632",
            "lang": "zh-cn",
            "verify_type": "getVerifyCode",
            "t": "1530776541533"
        },
        function (data, status) {


            $('#img_captcha').attr('src', 'data:image/png; base64,' + data + '')
            $('#img_captcha').on('click', function () {
                $.get("http://192.168.1.18:12007/common/verify_code",

                    {
                        "rand_code": "94632",
                        "lang": "zh-cn",
                        "verify_type": "getVerifyCode",
                        "t": "1530776541533"
                    },
                    function (data, status) {
                        $('#img_captcha').attr('src', 'data:image/png; base64,' + data + '')

                    })


            })
        },
    );


    // 提交
    $('#agree').on('click', function () {
        $(this).is('checked');
    });
    //注册

    $('#submit').on('click', function () {

        //    console.log($("#agree").is(':checked'))
        if (!$('#agree').is(':checked')) {
            alert("请勾选协议!")
        } else {

            //发请求
            //response
            if (type == 0) {


                $.post("http://192.168.1.18:12007/account/register", {
                        "code": "1111",
                        "area_code": "",
                        "type": type,
                        "country_code": "CN",
                        "cell_phone_num": "",
                        "pwd": password,
                        "pwd2": againPassword,
                        "verify_code": "1111",
                        "email": email,
                        "before_invitation_code": before_invitation_code
                    }, function (data, status) {
                        console.log(data);
                        if (data.code == 1) {
                            alert("注册成功");
                            $(".ejectReg").hide();
                            // $('.getyzm').show();
                            $('.regSuccess').show();
                            // $.cookie("username",email,"path/")

                        } else {
                            alert("注册失败");
                        }

                    }
                );
            } else if (type == 1) {
                var data = {
                    "code": "1111",
                    "area_code": "86",
                    "type": type,
                    "country_code": "CN",
                    "cell_phone_num": phone,
                    "pwd": password,
                    "pwd2": againPassword,
                    "verify_code": "1111",
                    "email": "",
                    "before_invitation_code": before_invitation_code
                };
                console.log("data:");
                console.info(data);
                $.post("http://192.168.1.18:12007/account/register", data, function (data, status) {
                        console.log(data);
                        if (data.code == 1) {
                            alert("注册成功");
                            $(".ejectReg").hide();
                            $('.regSuccess').show();
                            $.cookie("username", phone, "path/")

                        } else {
                            alert("注册失败");
                        }

                    }
                );
            }


            $('.yzm').append("<img alt='' class='img_code' id='img_captcha' :src='data:image/png; base64," + data + "' data-get-img-code='1'>")

        }

    })

    //登录
    $('#loginSubmit').click(function () {

            if ($('#user_name').val() != '') {
                var user_name = $('#user_name').val();
            }
            if ($('#user_psd').val() != '') {
                var password = $('#user_pwd').val();
            }

            $.post("http://192.168.1.18:12007/account/login",
                {
                    "client_id": "",
                    "email_or_phone": user_name,
                    "pwd": password,
                    "rand": "CN",
                    "verify_code": ""
                }, function (response) {
                    console.log(response);
                    if (response.code == 1) {
                        // alert("登录成功");
                        $(".ejectLogin").hide();
                        $('.user').show();
                        $('.header_right').hide();
                        $('body').css({"background": "", "overflow": ""});
                        $('.user li').eq(1).html(user_name);
                        console.log(response.email_or_phone);

                        // $.cookie('username',user_name,"path=/")
                        // console.log($.cookie('username',user_name,"path=/"));
                        document.cookie = response.data;
                    } else {
                        alert("账号或密码错误");
                    }

                }
            )
        }
    );
    //查看账户
    $(".regSuccess .regSuccess_close").click(function () {

        $(".regSuccess").hide();
        $('body').css({"background": "", "overflow": ""})
    });

    $(document).click(function () {
        if ($(".regSuccess").show()) {
            $(".regSuccess").hide();
        }
        $('body').css({"background": "", "overflow": ""})
    });

    $(".regSuccess").click(function (e) {
        e.stopPropagation();//阻止事件向上冒泡 
    });
    $('.regSuccess_message').click(function () {
        var obj = $(this).children("a");
        window.location.href = $(obj[0]).attr("href")
    })
    //退出登录
    $('.user .login').click(function () {
        $('.user').hide();
        $('.header_right').show();
    })


})