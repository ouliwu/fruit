require(["require.config"],function(){
    require(["jquery","url","tools","header","footer"],function($,url){
       class Register{
            constructor(){
                this.init();
            }
            init(){
                this.bindEvents();
            }
            bindEvents(){
                // $("input").blur(function (e) { 
                //     e.preventDefault();
                //     $("span").css("display='block'");
                    
                // });

                $("#btn").on("click",function(){    
                    var username = $("#username").val();
                    var password = $("#password").val();
                    console.log(username);
                    console.log(password);
                    // 提交服务器
                    tools.ajaxPost(url.phpUrl+"api/register.php", {username, password}, function(res){ 
                        if(res.res_code === 1){
                            if(confirm(res.res_message+ "，即将跳转登录页面")){
                                location.href = "/html/login.html";
                            }
                        }else{
                            confirm(res.res_message);
                        }
                    });
                    // 阻止默认提交
                    return false;
                })
            }

       }
       new Register();
    })
})