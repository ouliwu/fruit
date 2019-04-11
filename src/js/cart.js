require(["require.config"],function(){
    require(["jquery","template","url","header","footer"],function($,template,url){
        class Cart{
            constructor(){
                this.init()
                    // this.load(res);
                    this.bindEvents();
            }
            init(){
                this.cart = JSON.parse(localStorage.getItem("cart"));
                // this.id = location.search.slice(4);
                this.render();
            }
            render(){
                var html = template("list-template", {cart: this.cart});
                $("#catyList").append(html);
                this.del();
                this.Price();
                this.Count();
                this.origin();
            }
            del(){
                let _this = this;
                $(".del").on("click",function(){
                    if(confirm("确认要把该商品移出购物车吗?")){
                        console.log($(this).data("id"),_this.cart);
                        let id = $(this).data("id");
                        let n = 0;
                        if(_this.cart.some(function(item,index){
                            n = index;
                            return id == item.id;
                        })){
                            _this.cart.splice(n,1);
                            console.log(_this.cart);
                            localStorage.setItem("cart",JSON.stringify(_this.cart));
                            $(this).parent().parent().remove();
                            if(!(localStorage.getItem("cart"))){
                                $(".total").html(0);
                                $(".originPrice").html(0);
                                $(".discount").html(0);
                            }else{
                                _this.Count();
                                _this.origin();
                               
                            }
                        }
                    }
                })
                
            }
            bindEvents(){
                let _this = this;
                let i=1;
                //购物车加数量
                $(".plus").on("click",function(){
                    i++;
                    $(this).prev().val(i); 
                    let id= $(this).parent().parent().next().next().find(".del").data("id");
                    console.log(id);
                    _this.Price();
                    _this.Count();
                    _this.setLocalstorage(id,i);
                    _this.origin();
                })
                //购物车减数量
                $(".minus").on("click",function(){
                    i--;
                    if(i<1){
                        i = 1;
                    }
                    $(this).next().val(i);
                    let id= $(this).parent().parent().next().next().find(".del").data("id");
                    _this.Price();
                    _this.Count();
                    _this.setLocalstorage(id,i);
                    _this.origin();
                })
            }


            Count(){
                //购物车总价
                let s = 0 ;
                $(".sum").each(function(index,item){
                     s +=Number($(item).html());
                })
                $(".total").html(s);
            }
            //每条数据的总价
            Price(){
               $(".price").each(function(index,item){
                  let n = $(item).html()*$(item).parent().next().find(".cart-quantity").val();
                  $(item).parent().next().next().find(".sum").html(n);
               })
            }
            //动态改变localstorage的num值
            setLocalstorage(id,num){
                let n = 0;
                let local= JSON.parse(localStorage.getItem("cart"));
                if(local.some(function(item,index){
                    n = index;
                    return item.id == id;
                })){
                    local[n].num = num;
                }
                localStorage.setItem("cart",JSON.stringify(local));
            }
            //购物车的市场价和节省的价格
            origin(){
                let l = JSON.parse(localStorage.getItem("cart"));
               
                var origin=l.reduce(function(prev,next){
                    console.log(next.orginPrice);
                    return next = prev +( next.num * next.orginPrice);
                },0)
                console.log(origin);
                let s =origin - $(".total").html();
                $(".originPrice").html(origin);
                $(".discount").html(s);

               
            }

        }
      
        new Cart();
    })
})