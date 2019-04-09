require(["require.config"],function(){
    require(["jquery","header","footer"],function($){
        class Login{
            constructor(){

            }
            init(){
                this.user = $("username");
                this.pwd = $("password");
                this.rem = $("remember");
            }

            bindEvents(){
                $("btn").onclick(function(){
                    username = this.user.value;
                    password = this.pwd.value;
                    
                    tools.ajaxPost("/api/login.php",{username,password},function(res){
                        
                        var option = remember.checked? {"path":"/",expires:10} : {"path":"/"};
                        
                        tools.cookie("username",username,option);
                        
                        if(confirm(res.res_message + "，即将跳转首页")){
                            location.href = "/index.html";
                        }else{
                            alert(res.res_message);
                        }
                        
                    });
                    return false;
                })
            }
        }
       new Login();
    })
})