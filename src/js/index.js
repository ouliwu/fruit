require(["require.config"],function(){
    require(["jquery","header","url","template","shopItem","Swiper","footer"],function($,header,url,template,ShopItem,Swiper){
        
        class Index{    
                constructor(){
                    this.swiper();
                    this.caty();
            }
            //搜索功能
            
            swiper(){
                var mySwiper = new Swiper('.swiper-container',{
                    pagination: {
                        el: '.swiper-pagination',
                      },
                      autoplay:true,
                    })
                    //鼠标滑过pagination控制swiper切换
                    for(var i=0;i<mySwiper.pagination.bullets.length;i++){
                      mySwiper.pagination.bullets[i].index=i
                      mySwiper.pagination.bullets[i].onmouseover=function(){
                        mySwiper.slideTo(this.index);
                      };
                    }   
           }
           caty(){
               //请求分类数据
               new ShopItem($(".clo_4"),url.baseUrl+"/caty");
               new ShopItem($(".clo_5"),url.baseUrl+"/caty");
               
            //    $.ajax({
            //     url:url.baseUrl+"/caty",
            //     method:"GET",
            //     dataType:"json",
            //     success:function(res){
                
            //         if(res.res_code==1){
            //             let list = res.res_body.list;
            //             console.log(list);
            //             var html = template("catyList",{list});
            //             // console.log(html);
            //             $(".clo_4").html(html);
            //             $(".clo_5").html(html);
            //         }
            //     }
            //    })
                
           }
        }
        return new Index();
    })
})