require(["require.config"],function(){
    require(["jquery","url","tools","header","footer"],function($,url){
        class Login{
            constructor(){
                this.init();
            }
            init(){
                this.bindEvents();
            }

            bindEvents(){ 
                $("#btn").on("click",function(){
                    let username = $(".usern").val();
                    let password = $(".pwd").val();
                    tools.ajaxPost(url.phpUrl+"api/login.php",{username,password},function(res){
                        var option = $("remember").checked? {"path":"/",expires:10} : {"path":"/"};
                        
                        tools.cookie("username",username,option);
                        if(res.res_code===1){
                            if(confirm(res.res_message + "，即将跳转首页")){
                                location.href = "/index.html";
                            }
                        }
                        else{
                            alert(res.res_message);
                        }
                        
                    });
                   
                })
            }
        }
       new Login();
    })
})