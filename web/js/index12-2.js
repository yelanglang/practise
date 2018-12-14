var self = this;
$(document).ready(function(){
	getData();//获取数据
});
function getData(){
	$.ajax({
		url:"../../data/data12/data12.js",
		type:"get",
		success:function(msg){
			initView(msg);//初始化页面
		}
	});
}
/**
 * 初始化页面
 */
function initView(msg){
	var json = eval("(" + msg + ")");
	self.mainBox = $(".main-ul-content");//对应mainbox
	var data = "";//获取对应数据
	var flag = "";
	if(self.mainBox[0]){
		flag = self.mainBox[0].title;
	}
	if(flag){
		var dataStr = "(json." + flag + ")";
		data = eval(dataStr);//获取对应数据
	}
	if(data){
		initData(data);
	}
	initFloorTab();//类似服装的tab页
	initSlider();//轮播图
}
/**
 * 初始化数据
 * @param data
 */
function initData(data){
	self.mainTabs = self.mainBox.find(".main");
	for(var i = 1;i < self.mainTabs.length;i ++){//从第二页开始数据组装
		var html = "";
		var currData = data.mainContents[i-1];//对应选项数据
		html += '<ul class="p-list">';
		for(var j = 0;j < currData.tabLis.length;j ++){
			var _item = currData.tabLis[j];
			html += 	'<li>';
			html += 		'<div class="p-img"><a><img src="' + _item.src + '"></a></div>';
			html += 		'<div class="p-name"><a>' + _item.desc + '</a></div>';
			html += 		'<div class="p-price"><span>￥</span>' + _item.price + '</div>';
			html += 	'</li>';
		}
		html += '</ul>';
		html += '<ul class="img-list">';
		if(currData.bottomImgs && currData.bottomImgs.length > 0){
			for(var k = 0;k < currData.bottomImgs.length;k ++){
				html += '<li><a><img src="' + currData.bottomImgs[k].src + '"></a></li>';
			}
		}
		html += '</ul>';
		$(self.mainTabs[i]).append(html);
	}
	if(data.brandContents && data.brandContents.length > 0){//品牌
		var html = "";
		html += "<ul>";
		for(var i = 0;i < data.brandContents.length;i ++){
			html +=		'<li><a><img src="' + data.brandContents[i].src + '"></a></li>';
		}
		html += "</ul>";
		$(".brands").append(html);
	}
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
		_this.find(".slide-nav li").each(function() {
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
