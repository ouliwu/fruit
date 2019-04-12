define(["jquery"],function($){
    class Header{
        constructor(){
          
            this.init().then(()=>{
                this.search();
                this.ref();
                this.calcCartNum();
            });
           
        }
        init() {
            return new Promise(function(resolve,reject){
                $("#header-container").load("/html/module/header.html",() =>{
                    // this.calcCartNum();//加载结束之后调用
                    resolve();
                });
            })
        }
        search(){
            this.textfield = $("#textfield");
            this.searchContainer=$("#search_result_search_fm");
            var _this = this;
            this.textfield.on("keyup",function(){
                let keyWord = $(this).val().trim();//获取input的value值
                if(keyWord!==""){
                    //getJSON可以完成Jsonp的跨域，数据返回了就自动调用后面的回调
                    $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
                        
                        let list = res.s;   
                        let ul = $("<ul>");
                        list.forEach(function(item,index) {
                            $("<li>").html(item).appendTo(ul);
                        });
                        _this.searchContainer.empty().show().append(ul);
                    })
                }else{
                    //把之前已经渲染出来的内容隐藏
                    _this.searchContainer.hide();
                }
                
            })
            this.textfield.on("blur",function(){
                setTimeout(()=>{
                    _this.searchContainer.hide();
                },200)
            })
            //this指向li
            this.searchContainer.on("click","li",function(e){
                _this.textfield.val($(this).html());
                _this.searchContainer.hide();
            })
           
        }

        calcCartNum(){
            let cart = JSON.parse(localStorage.getItem("cart"));
            // console.log(cart);
            if(cart){
                this.num = cart.reduce(function(num,prod){
                    num+=Number(prod.num);
                    return num;
                },0)
                console.log(this.num);
                $(".cartNum").html(this.num);
            }
            
        }
        ref(){
            $(".jk").on("click",function(){
                location.href="/html/list.html";
            })
            $(".gc").on("click",function(){
                console.log(this);  
                // location.href="/html/list.html";
                $(".view").html($(".gc").html());
            })
        }

    }
    return new Header();
})