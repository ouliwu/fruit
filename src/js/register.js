require(["require.config"],function(){
    require(["jquery","header","footer"],function($){
       class Register{
            constructor(){
                this.init();
            }
            init(){
                this.user = $("username");
                this.pwd = $("password");
                this.email = $("email");
                this.phone = $("moblie_phone");
                this.c_pwd = $("confirm_password");
                this.agree = $("agreement");
                this.btn = $("btn");
                this.bindEvents();
            }
            bindEvents(){
                 
                $("input").blur(function (e) { 
                    console.log(1);
                    e.preventDefault();
                    $("span").css("display='block'");
                    
                });

                this.btn.onclick=function(){    
                    var username = this.user.value;
                    var password = this.pwd.value;
                    // 提交服务器
                    tools.ajaxPost("/api/register.php", { username, password }, function(res){
                        if(res.res_code === 1){
                            if(confirm(res.res_message+ "，即将跳转登录页面")){
                                location.href = "/html/login.html";
                            }
                        }
                    });
                    // 阻止默认提交
                    return false;
                }
            }

       }
       new Register();
    })
})