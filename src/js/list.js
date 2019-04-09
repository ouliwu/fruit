require(["require.config"],function(){
    require(["jquery","header","url","shopItem","template","footer"],function($,header,url,shopItem,template,footer){
        class List{
            constructor(){
                this.caty();
                this.prcieAD();
            }
          
            caty(){
                //请求分类数据
                new shopItem($(".clo_12"),url.baseUrl+"/list/get");
                
                 
            }
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
                        new shopItem($(".clo_12"),"",list);
                    })
                })
            }
        }
        new List();
    })
})