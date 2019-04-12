require(["require.config"],function(){
    require(["jquery","header","url","template","footer","addCart","zoom"],function($,header,url,template,footer,addCart){
        class Detail{
            constructor(){
                this.init().then((res)=>{
                    this.load(res);
                    this.bindEvents();
                    this.zoom();
                    this.toCart();
                });
                
            }
            init(){
                this.value();
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
                         this.detail = {
                             id : list[i].id,
                             title : list[i].title,
                             price : list[i].price,
                             img : list[i].bimg,
                             orginPrice : list[i].orginPrice,
                             num : 1
                         }
                    }
                    $(".view").html("进口鲜果");
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
               
                // $(".cart_btn").on("click",()=>{
                //     let num = $(".cart_quantity").val();
                //     // console.log(num)
                //     let id = this.obj.id;
                //     let n = 0;
                //     this.arr = [] ;
                //     if(localStorage.getItem("cart")){
                //         this.arr = JSON.parse(localStorage.getItem("cart"));
                //          if(this.arr.some(function(item,index){
                //              n = index;
                //             return id == item.id;       
                //          })){
                //             this.arr[n].num = num;
                //          }else{
                //             this.arr.push(this.obj);
                //          }
                //     }else{
                //         this.obj.num = num;
                //         this.arr = [this.obj] ;
                       
                //     }
                //     localStorage.setItem("cart",JSON.stringify(this.arr));
                   
                    
                    
                // })
            
            }
            toCart () {
                addCart($(".goods_info"), ".cart_btn", this.detail);
              }
              value(){
                $(".jk").on("click",function(){
                    $(".view").html($(this).html());
                })

                $(".gc").on("click",function(){
                    $(".view").html($(this).html());
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
                location.href="/html/list.html";
            }

        }
           
        
        new Detail();
    })
})