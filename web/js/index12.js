var self = this;
$(document).ready(function(){
	getData();//获取数据
	initView();//初始化页面
});
/**
 * 获取数据
 */
function getData(){
	$.ajax({
		url : "../data/data12/main.js",
		type : "get",// 请求数据类型
		dataType : "json",// 返回数据类型
		success : function(msg) {
			initData(msg);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
//			alert('here');
		}
	});
}
/**
 * 加载轮播图数据
 * @param data
 */
function initData(data){
	var i = 0;
	$("#main-slide-img li img").each(function(){
		var _self = $(this);
		_self.attr("src",data.mainImgs[i].src);
		i ++;
	});
	if(data.mainNews && data.mainNews.length > 0){//京东快报
		self.newsList = $("#news-list");
		self.newsList.empty();//清空
		var html = "";
		for(var i = 0;i < data.mainNews.length;i ++){
			var _item = data.mainNews[i];
			html += '<li><a><span>[' + _item.shotMenu + ']</span>' + _item.shotDesc + '</a></li>';
		}
		self.newsList.append(html);
	}
	if(data.todayImgs){
		initTodayData(data.todayImgs);//今日图片
	}
	if(data.favContents && data.favContents.length > 0){//猜你喜欢
		var html = "";//
		for(var i = 0;i < data.favContents.length;i ++){
			var _item = data.favContents[i];
			html += '<li>';
			html += '<div class="fav-pic"><a><img src="' + _item.src + '"></a></div>';
			html += '<div class="fav-info">';
			html += 	'<div class="fav-name"><a>' + _item.desc + '</a></div>';
			html += 	'<div class="fav-price"><i>¥</i>' + _item.price + '</div>';
			html += '</div>';
			html += '</li>';
		}
		$("#fav-content-list").empty().append(html);
	}
}
/**
 * 今日图片数据
 * @param data
 */
function initTodayData(data){
	$(".today-left img").attr("src",data.leftImg.src);
	var i = 0;
	$(".today-list li").each(function(){
		var j = 0;
		var _self = $(this);
	    _self.find("img").each(function(){
	    	$(this).attr("src",data.rightImgs[4 * i + j].src);
	    	j ++;
	    });
		i ++;
	});
}
var bigTimer = null;
/**
 * 初始化页面
 */
function initView(){
	initCity();//城市选择
	initMainMenu();//menu栏
	initSlider();//轮播图（主页，服装层）
	initToday();//今日图片
	initFloorTab();//类似服装的tab页
	initTop();//滑动到顶部
	initScroll();//滑动监听
	initLeftBar();//左侧边栏事件监听
}
/**
 * 左侧边栏事件监听
 */
function initLeftBar(){
	$(".left-side-bar li").each(function(){
		var _self = $(this);
		_self.click(function(){
			var index = $(".left-side-bar li").index(this);//获取索引
			$('html, body').animate({  
	            scrollTop: $(self.floorFrames[index]).offset().top  
	        }, "fast");
		});
	});
}
/**
 * 滑动事件
 */
function initScroll(){
	self.floorFrames = $(".floor-iframe");//楼层 
	var length = self.floorFrames.length;
	var arrOffset = new Array();//存储绝对高度
	var arrHeight = new Array();//存储控件高度/2
	for(var i = 0;i < length;i ++){
		arrOffset[i] = $(self.floorFrames[i]).offset().top;
		arrHeight[i] = $(self.floorFrames[i]).height() / 2;
	}
	$(window).scroll(function () {
        //$(window).scrollTop()这个方法是当前滚动条滚动的距离
        //$(window).height()获取当前窗体的高度
        //$(document).height()获取当前文档的高度
        if($(window).scrollTop() > $("#jdlife").offset().top){//滑动显示左侧栏
        	$(".left-side-bar").show();
        }
        if($(window).scrollTop() < $("#jdlife").offset().top){//隐藏左侧栏
        	$(".left-side-bar").hide();
        }
        var scrollHeight = $(window).scrollTop();//当前滑动高度
        for(var i = 0;i < length;i ++){
        	if((scrollHeight > (arrOffset[i] - arrHeight[i])) && (scrollHeight < (arrOffset[i] + arrHeight[i]))){
        		$(".left-side-bar li").eq(i).addClass("current").siblings().removeClass("current");
        	}
        }
    });
}
/**
 * 滑动到顶部
 */
function initTop(){
	self.topBar = $("#bar-item-top");//顶部按钮
	self.topBar.click(function(){
		$('html, body').animate({  
            scrollTop: $(".header").offset().top  
        }, "fast");
	});
}
/**
 * 城市选择操作
 */
function initCity(){
	var index = 0;
	self.cityText = $(".header-city-text");//城市显示文本
	self.provinces = $(".header-province a");//城市列表
	$(".header-province a").each(function(){
		var _self = $(this);
		_self.click(function(){
			var _this = $(this);
			var _parent = _this.parent();//父级元素
			_parent.addClass("selected").siblings().removeClass("selected");
			self.cityText.text(_this[0].text);
		});
	});
}
var menuIndex = 0;//menu栏索引
/**
 * menu栏操作
 */
function initMainMenu(){
	$(".focus-menu li").each(function(){
		var _self = $(this);
		_self.mouseover(function(){
			menuIndex = $(".focus-menu li").index(this);//获取索引
			$(".focus .dropdown-layer").show();
			$(".focus-menu li").eq(menuIndex).addClass("current").siblings().removeClass("current");
			$(".focus-subs .item-sub").eq(menuIndex).show().siblings().hide();
		});
		_self.mouseout(function(){
			menuIndex = $(".focus-menu li").index(this);//获取索引
			$(this).removeClass("current");
			$(".focus .dropdown-layer").hide();
		});
	});
	$(".focus .dropdown-layer").mouseover(function(){
		$(this).show();
		$(".focus-menu li").eq(menuIndex).addClass("current").siblings().removeClass("current");
		$(".focus-subs .item-sub").eq(menuIndex).show().siblings().hide();
	});
	$(".focus .dropdown-layer").mouseout(function(){
		$(".focus-menu li").each(function(){
			$(this).removeClass("current");
		});
		$(".focus-subs .item-sub").each(function(){
			$(this).hide();
		});
	});
}
/**
 * tab页操作
 * 如服装tab
 */
function initFloorTab(){
	$(".floor").each(function(){
		var _self = $(this);
		_self.find(".tab li").each(function(){
			var _this = $(this);
			_this.mouseover(function(){
				var index = this.tabIndex;
				$(this).addClass("current").siblings().removeClass("current");
				$(this).parent().parent().parent().find(".main-ul-content .main").eq(index).addClass("current").siblings().removeClass("current");
			});
		});
	});
}
/**
 * 今日图片操作
 */
function initToday(){
	$(".today").mouseover(function(){
		var _self = $(this);
		_self.find(".slide-page").show();
	});
	$(".today").mouseout(function(){
		var _self = $(this);
		_self.find(".slide-page").hide();
	});
	var todayIndex = 0;
	var maxIndex = $(".today .today-list li").length;
	$(".today .prev").click(function(){
		todayIndex --;
		if(todayIndex < 0){
			todayIndex = maxIndex -1;
		}
		$(".today .today-list li").eq(todayIndex).addClass("current").siblings().removeClass("current");
	});
	$(".today .next").click(function(){
		todayIndex ++;
		if(todayIndex >= maxIndex){
			todayIndex = 0;
		}
		$(".today .today-list li").eq(todayIndex).addClass("current").siblings().removeClass("current");
	});
}
/**
 * 轮播图操作
 */
function initSlider(){
	self.slideBox = $(".slide");//轮播图盒子
	var i = 0;
	self.slideBox.each(function(){
		var _this = $(this);
		_this[0].index = i;
		i ++;
		_this[0].counts = 0;//初始化显示位置
		_this.mouseover(function(){//鼠标悬浮事件
			var _self = $(this);
			_self.find(".slide-page").show();
			_self.imgLis = _self.find(".slide-img li");//图片列表
			var length = _self.imgLis.length;//长度
			_self.find(".slide-page .prev").unbind("click").bind("click",function(){//左侧按钮点击事件
				self.slideBox[_self[0].index].counts --;
				if(self.slideBox[_self[0].index].counts < 0){
					self.slideBox[_self[0].index].counts = length - 1;
				}
				var counts = self.slideBox[_self[0].index].counts;
				$(self.slideBox[_self[0].index]).find(".slide-img li").eq(counts).addClass("current").siblings().removeClass("current");
				$(self.slideBox[_self[0].index]).find(".slide-nav li").eq(counts).addClass("selected").siblings().removeClass("selected");
			});
			_self.find(".slide-page .next").unbind("click").bind("click",function(){//右侧按钮点击事件
				self.scroll(_self[0].index,length);
			});
			clearInterval(_this[0].timer);
		});
		_this.mouseout(function(){//鼠标离开事件
			var _self = $(this);
			_self.find(".slide-page").hide();
			_this[0].timer = setInterval(function(){scroll(_self[0].index,4);},3 * 1000);//图定时器
		});
		_this.find(".slide-nav li").each(function(){
			var _li = $(this);
			var length = _this.find(".slide-nav li").length;//长度
			_li.mouseover(function() {
				var index = _this.find(".slide-nav li").index(this);
				var parentSlide = $(this).parent().parent().parent().parent();
				self.slideBox[parentSlide[0].index].counts = index;
				parentSlide.find(".slide-img li").eq(index).addClass("current").siblings().removeClass("current");
				$(this).addClass("selected").siblings().removeClass("selected");
			});
		});
		_this[0].timer = setInterval(function(){scroll(_this[0].index,4);},3 * 1000);//图定时器
	});
}
/**
 * 轮播图
 * @param index
 * @param length
 */
function scroll(index,length){
	self.slideBox[index].counts ++;
	if(self.slideBox[index].counts >= length){
		self.slideBox[index].counts = 0;
	}
	var counts = self.slideBox[index].counts;
	$(self.slideBox[index]).find(".slide-img li").eq(counts).addClass("current").siblings().removeClass("current");
	$(self.slideBox[index]).find(".slide-nav li").eq(counts).addClass("selected").siblings().removeClass("selected");
}

