require(["require.config"],function(){
    require(["jquery","template","url","header","footer"],function($,template,url){
        class Cart{
            constructor(){
                this.init().then((res)=>{
                    this.load(res);
                    this.bindEvents();
                    this.del();
                });
            }
            init(){
                this.id = location.search.slice(4);
                //带着id请求详情页数据
                let small = "";
                if(this.id>4){
                 small = url.baseUrl+"list";
                  } else{
                 small = url.baseUrl+"caty";
                }
                return new Promise(resolve=>{
                    $.get(small,(res)=>{
                        resolve(res);
                    })
                })
               
            }
            load(res){
                if(res.res_code===1){
                    let list=res.res_body.data.list,
                        i = 0,
                        str;
                    if(list.some((item,index)=>{
                        i = index;
                    return item.id == this.id;
                    })){
                        str = list[i];
                    }
                    var html = template("list-template",{...str});
                    var count1 = template("list-count",{...str});
                    $("#catyList").append(html);
                    $("#count").html(count1);
                    
                }    
            }
            del(){
                $("#del").on("click",function(){
                    if(confirm("确认要把该商品移出购物车吗?")){
                       $("#del").parent().parent().remove();
                    }
                })
                
            }
            bindEvents(){
                console.log(1);
                let i=1;
                $(".plus").on("click",function(){
                    i++;
                    $(".plus").prev().val(i); 
                })

                $(".minus").on("click",function(){
                    i--;
                    if(i<1){
                        i = 1;
                    }
                    $(".minus").next().val(i);
                })

                this.calcMoney();
            }
            calcMoney(){
                let num = $(".cart-quantity").val(),
                    money = $("#price").html(),
                    tatol = 0;
                console.log(money);
                tatol+= num * money;
                $(".total").html('￥'+tatol);
            }
        }
        new Cart();
    })
})