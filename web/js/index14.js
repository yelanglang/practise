/**
 * Created by zjf on 2016/10/25.
 */
$(document).ready(function(){
    /*使用flexslider插件实现轮播图*/
    $(".flexslider").flexslider({
        animation:"slide"
    });
    /*
    * 产品块事件
    */
    var productImage = $("#product-image");//产品图像
    $(".product-list li").each(function(){
       $(this).mouseover(function(){//鼠标悬浮事件
           var index = $(".product-list li").index(this);//获取索引
           $(this).addClass("active").siblings().removeClass("active");
           if(index % 2 == 0){
               productImage[0].src = "../image/image14/pic5.jpg";
           }
           else {
               productImage[0].src = "../image/image14/pic6.jpg";
           }
       });
    });
    /*头部menu事件*/
    var menu_nav = $("#menu-nav");
    $(".header-xm-menu").click(function(){
        if(menu_nav[0].style.display == "block"){
            menu_nav.hide();
        }else{
            menu_nav.show();
        }
    });
    /*监听窗口变化*/
    window.onresize = function(){
        if(window.innerWidth > 970){
            menu_nav.show();
        }
        else {
            menu_nav.hide();
        }
    }
});