require(["require.config"],function(){
    require(["jquery","header","url","shopItem","template","addCart","footer"],function($,header,url,shopItem,template,addCart,footer){
        class List{
            constructor(){
                this.caty();
                this.prcieAD();
                this.toCart();
                this.i = 1;
                this.value();
            }
          
            caty(){
                //请求分类数据
                
                new Promise(resolve=>{
                    $.get(url.baseUrl+"list/get",res=>{
                        if(res.res_code===1){
                            this.list = res.res_body.data.list;
                            
                        resolve(this.list.slice(0,12));
                        }
                    })
                }).then(list=>{
                    $(".view").html("进口鲜果");
                    new shopItem($(".clo_12"),"",list);
                    this.page();   
                    this.updown();
                })
                 
            }
            
            //按价格排序
            prcieAD(){
                var index = 1;
                $("#priceAD").on("click",function(){
                    // index = 2;
                    new Promise(resolve=>{
                        $.get(url.baseUrl+"list/get",res=>{
                            if(res.res_code===1){
                                resolve(res.res_body.data.list);
                            }
                        })
                    }).then(list=>{
                        //排序
                        if(index==2){
                            index=1; 
                                console.log(index);
                            list = list.sort((a,b)=>{
                                
                                return b.price - a.price;
                                
                            })
                        }else if(index==1){
                            index = 2;
                            console.log(index);
                            list = list.sort((a,b)=>{
                               
                                return a.price - b.price;
                                
                            })
                            
                            
                        }
                        //请求数据渲染模板
                        new shopItem($(".clo_12"),"",list);
                    })
                })
            }
            //加入购物车
            toCart(){
                addCart($(".cart_goods"),".cart_btn","",true);
            }

            //分页
            page(){
                this.index();
                let list;
                //下一页
                $(".next").on("click",()=>{
                    $(".next").css({"display":"inline-block"});
                    //this.i = 1  
                    if(this.list.length >= 12*(this.i+1)){
                        
                    list = this.list.slice(12*this.i,12*(++this.i));
                    
                    this.index();
                }else{
                    $(".next").css({"display":"none"});
                    list = this.list.slice(12*this.i++,this.list.length);
                }
                new shopItem($(".clo_12"),"",list);
                })
                //上一页
                $(".prev").on("click",()=>{
                    $(".next").css({"display":"inline-block"});
                    list = this.list.slice(12*(this.i-2),12*(--this.i));

                    this.index();
                    console.log(list,this.i);
                    new shopItem($(".clo_12"),"",list);  
                })
                   
            }
            //显示隐藏上一页
            index(){
                if(this.i == 1){
                    $(".prev").css({"display":"none"});
                }else{
                    console.log(this.i);
                    $(".prev").css({"display":"inline-block"});
                }
            }

            updown(){
                let list;
                $("#up").on("click",()=>{
                    this.page();
                    $(".next").css({"display":"inline-block"});
                    if(this.i=2){
                        $("#up").css({"dosplay":"none"});
                    }
                    list = this.list.slice(12*(this.i-2),12*(--this.i));
                 
                    console.log(list,this.i);
                    
                    new shopItem($(".clo_12"),"",list);  
                    
                })
                $("#down").on("click",()=>{
                    $(".next").css({"display":"inline-block"}); 
                    if(this.list.length >= 12*(this.i+1)){          
                    list = this.list.slice(12*this.i,12*(++this.i));
                    this.index();
                }else{
                    $(".next").css({"display":"none"});
                    if(this.i=2){
                        $("#down").css({"dosplay":"none"});
                    }
                    list = this.list.slice(12*this.i++,this.list.length);
                }
                new shopItem($(".clo_12"),"",list);
                })
            }
            value(){
                $(".jk").on("click",function(){
                    $(".view").html($(this).html());
                })

                $(".gc").on("click",function(){
                    $(".view").html($(this).html());
                    new shopItem($(".clo_12"),"",list);  
                })

                $(".gh").on("click",function(){
                    $(".view").html($(this).html());
                })

                $(".jg").on("click",function(){
                    $(".view").html($(this).html());
                })
                $(".qy").on("click",function(){
                    $(".view").html($(this).html());
                })
                $(".jf").on("click",function(){
                    $(".view").html($(this).html());
                })
                $(".th").on("click",function(){
                    $(".view").html($(this).html());
                })
            }
        }
        new List();
    })
})