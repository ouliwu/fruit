define(["jquery","template"],($,template)=>{
    function ShopItem(container,url,listData){//根据不同的地址渲染不同的接口
        //加载过来的容器盒子
        this.container = container;
        this.url = url;
        this.load();
        this.listData=listData;
    }
    //jquery提供的用来合并对象的方法
    $.extend(ShopItem.prototype,{
        load:function(){
            
            //加载页面
            this.container.load("/html/module/shopItem.html",()=>{
            this.getData();
            //判断listData是否存在      
            if(this.listData){
                this.render(this.listData);
            }else{
                this.getData();
            }   
            })
        },
        getData:function(){
            //请求列表数据
            $.get(this.url,res=>{
                if(res.res_code===1){
                    this.render(res.res_body.data.list);
                    // console.log(res);
                }
      
            })
        },
        render:function(data){
            //渲染列表数据
            //让渲染好的页面覆盖script
           this.container.html(template("shop-list",{list:data}));
           
        }
    })
    return ShopItem;
})