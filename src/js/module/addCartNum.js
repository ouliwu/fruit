define(["jquery","fly"],()=>{
    //isList是否来自列表的加入购物车
    return function(container,btnSelector,detail,isList){
        
        container.on("click",btnSelector,function(e){
            
            if(isList){
                var $li = $(this).parent().parent().parent();
                detail = {
                    id : $(this).data("id"),
                    img : $li.find("img").attr("src"),
                    title : $li.find("p").html(),
                    orginPrice :$li.find(".orginPrice").html(),
                    price: $li.find(".price").html(),
                    num : 1
                }
                console.log(detail.num);
                var num = detail.num;
                 
            }else{
                var num = $(".cart_quantity").val();
                
            }
            var arr = [];
            var n = 0;
            var id = detail.id;
            if(localStorage.getItem("cart")){
                    arr = JSON.parse(localStorage.getItem("cart"));
                     if(arr.some(function(item,index){
                         n = index;
                        return id == item.id;       
                     })){
                         if(isList){
                            arr[n].num++;
                         }else{
                            arr[n].num = num;
                         }
                            
                     }else{
                        arr.push(detail);
                     }
                }else{
                    detail.num = num;
                    arr = [detail] ;
                }
                console.log(detail,arr);
                localStorage.setItem("cart",JSON.stringify(arr));
                // location.href = "/html/cart.html";

                $(`<div style="width:40px;height:40px"><img style="width:40px;height:40px;border-radius:50%" src="${detail.img}"></div>`).fly({
                    start:{
                      left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
                      top: e.clientY,  //开始位置（必填）
                    },
                    end:{
                      left: $(window).innerWidth() - 33, //结束位置（必填）
                      top: $(".cartNum").position().top  //结束位置（必填）
                      
                    },
                    autoPlay: true, //是否直接运动,默认true
                    speed: 1.3, //越大越快，默认1.2
                    vertex_Rtop: 20, //运动轨迹最高点top值，默认20
                    onEnd: function(){
                      this.destroy(); // 把运动的小方块销毁
                      // 购物车数量加1
                      $(".cartNum").html(Number($(".cartNum").html())+1);
            
                    } //结束回调
                  })
           
        })
        
        
        
    }
})