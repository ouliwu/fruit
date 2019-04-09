require.config({
    baseUrl:"/",
    paths : {
        "jquery" : "libs/jquery/jquery-3.2.1",
        "header" :"js/module/header",
        "url" :"js/module/url",
        "footer" :"js/module/footer",
        "login"  :"js/login",
        "register" :"js/register",
        "Swiper" :"libs/swiper/js/swiper.min",
        "template" :"libs/art-template/template-web",
        "detail" :"js/detail",
        "list" :"js/list",
        "shopItem" : "js/module/shopItem",
        "cart" : "js/cart",
        "tools" : "libs/tools",
        "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min"
        
    },
    //垫片不满足AMD规范，但又依赖于其他的模块
    shim:{
        "zoom":{
           deps:["jquery"] 
        }
    }
})