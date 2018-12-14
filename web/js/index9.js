$(document).ready(function(){
	var maxNumber = $(".img-list li").length;//图片个数
	var imgList = $(".img-list");
	$(".content").mouseover(function(){//鼠标悬浮监听事件
		$(".page").css("display","block");
		clearInterval(timer);
	});
	$(".content").mouseout(function(){//鼠标离开监听事件
		$(".page").css("display","none");
		timer = setInterval(function(){count()},3 * 1000);//定时器
	});
	var startNumber = 0;//起始显示数据下标
	$("#left").click(function(){//左侧点击事件
		startNumber --;
		if(startNumber < 0){
			startNumber = maxNumber - 1;
		}
		var leftPx = -(startNumber * 1000) + 'px';
		imgList.stop().animate({margin: '0 0 0 ' + leftPx},"fast");
		$(".round").find("li").eq(startNumber).addClass("current").siblings().removeClass("current");
	});
	$("#right").click(function(){//右侧点击事件
		count();
	});
	/**
	 * 右侧点击方法
	 */
	function count(){
		startNumber ++;
		if(startNumber >= maxNumber){
			startNumber = 0;
		}
		var leftPx = -(startNumber * 1000) + 'px';
		imgList.stop().animate({margin: '0 0 0 ' + leftPx},"fast");
		$(".round").find("li").eq(startNumber).addClass("current").siblings().removeClass("current");
	}
	var timer = setInterval(function(){count()},3 * 1000);//定时器
});