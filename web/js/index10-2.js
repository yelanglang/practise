$(document).ready(function(){
	var pageList = $(".page-list");//图片外层
	var prevBtn = $("#prevBtn");//左侧按钮
	var nextBtn = $("#nextBtn");//右侧按钮
	var pageUl = $(".page-list ul");//ul
	pageList.mouseover(function(){//悬浮事件监听
		prevBtn.removeClass("default");
		nextBtn.removeClass("default");
	});
	pageList.mouseout(function(){//鼠标离开事件监听
		prevBtn.addClass("default");
		nextBtn.addClass("default");
	});
	prevBtn.mouseover(function(){
		prevBtn.removeClass("default");
		nextBtn.removeClass("default");
	});
	prevBtn.mouseout(function(){
		prevBtn.addClass("default");
		nextBtn.addClass("default");
	});
	nextBtn.mouseover(function(){
		prevBtn.removeClass("default");
		nextBtn.removeClass("default");
	});
	nextBtn.mouseout(function(){
		prevBtn.addClass("default");
		nextBtn.addClass("default");
	});
	var startNumber = 0;//起始显示数据下标0 ,1 ,2
	prevBtn.click(function(){//左侧点击事件
		startNumber --;
		if(startNumber < 0){
			startNumber = 2;
		}
		var leftPx = '0px';
		switch(startNumber){
		case 0:
			leftPx = '0px';
			break;
		case 1:
			leftPx = '-1008px';
			break;
		case 2:
			leftPx = '-2016px';
			break;
		}
		pageUl.stop().animate({left: leftPx},"fast");
		$(".btns").find("div").eq(startNumber).addClass("current").siblings().removeClass("current");
	});
	nextBtn.click(function(){//右侧点击事件
		count();
	});
	/**
	 * 右侧点击方法
	 */
	function count(){
		startNumber ++;
		if(startNumber >= 3){
			startNumber = 0;
		}
		var leftPx = '0px';
		switch(startNumber){
		case 0:
			leftPx = '0px';
			break;
		case 1:
			leftPx = '-1008px';
			break;
		case 2:
			leftPx = '-2016px';
			break;
		}
		pageUl.stop().animate({left:leftPx},"fast");
		$(".btns").find("div").eq(startNumber).addClass("current").siblings().removeClass("current");
	}
});