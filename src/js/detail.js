require(["require.config"],function(){
    require(["jquery","header","url","template","footer","zoom"],function($,header,url,template,footer){
        class Detail{
            constructor(){
                this.init().then((res)=>{
                    this.load(res);
                    this.bindEvents();
                });
                this.zoom();
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
                    
                    $("#catyList").html(html);
                    
                }
            }

            zoom () {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery:'gallery',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#e0e0e0',
                    imageCrossfade: true, 
	        	    scrollZoom : true
                });
            }

            
           
            bindEvents(){
                //加数量
                let i =1;
                $(".plus").on("click",function(){
                    i++;
                    $(".plus").parent().children(".cart_quantity").val(i); 
                })

                //减数量
                $(".minus").on("click",function(){
                    i--;
                    if(i<1){
                        i = 1;
                    }
                    $(".minus").parent().children(".cart_quantity").val(i);
                })
            }

        }
           
        
        new Detail();
    })
})