define(["jquery"],function($){
    class Footer{
        constructor(){
            this.init();
        }
        init() {
            return new Promise(function(resolve,reject){
                $("#footer-container").load("/html/module/footer.html",() =>{
                    resolve();
                    console.log(222);
                });
            })
                
         
        }

    }
    return new Footer();
})