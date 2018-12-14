/**
 * Created by zjf on 2016/10/17.
 */
$(document).ready(function(){

    var navLight = $(".nav-light");//头部menu栏
    $(".nav a").mouseover(function(){//鼠标悬浮事件
        var index = $(".nav li").index($(this).parent());//获取索引
        var _left = $(this)[0].offsetLeft + 15;
        var _width = $(this)[0].offsetWidth;
        navLight.stop().animate({left: _left,width:_width},"fast");
    }).mouseout(function(){//鼠标离开事件
        navLight.stop().animate({left: 28.5,width:25},"fast");
    });
    /*var runPage = new FullPage({
        id:"sectionPage",
        effect:{
            transform:{opacity:[0,1]}
        }
    });*/
    /*fullpage*/
    $("#sectionPage").fullpage({
        anchors:["firstPage","secondPage","thirdPage","fourthPage","fifthPage"],
        menu:"#page-menu",
        easing:"fadein",//动画效果
        loopBottom:true,//底部是否循环
        loopTop:true,//顶部是否循环
        scrollingSpeed:10,//滑动速度
        css3:true,
        afterRender: function(){

        },
        afterResize:function(){

        },
    });
    setInterval(function(){//自动循环
        $.fn.fullpage.moveSectionDown();
    },5000);
    var music = $(".music");//音乐
    music.click(function(){//点击事件
        var audio = $(this).find("audio")[0];
        if(audio.paused){
            audio.play();
            $(this).removeClass("stop");
        }
        else {
            audio.pause();
            $(this).addClass("stop");
        }
    });
});