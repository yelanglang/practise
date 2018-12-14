$(document).ready(function(){
	/*
	 * 搜索输入框获取焦点事件
	 */
	$("#header-search-input").focus(function(){
		var self = $(this);
		if(self.val() == self[0].defaultValue){
			self.val("");
		}
		$(".search-other").removeClass("pop-user").addClass("pop");
	});
	$("#header-search-input").blur(function(){
		var self = $(this);
		if(self.val() == ""){
			self.val(self[0].defaultValue);
		}
		$(".search-other").removeClass("pop").addClass("pop-user");
	});
	/*
	 * part1,part2,part4
	 */
	$(".item-box").each(function(){//遍历需要缩放图片
		var self = $(this);
		self.mouseover(function(){
			var img = self.find(".item-img-src");
//			img.animate({"margin-top":"20px"},750);
			img.addClass("item-img-src-hover");
		});
		self.mouseout(function(){
			var img = self.find(".item-img-src");
//			img.animate({"-webkit-transform": "scale(1)"},750);
			img.removeClass("item-img-src-hover");
		});
	});
	/*
	 * part3 排行榜
	 */
	$(".top-img-item").each(function(){//遍历需要缩放图片
		var self = $(this);
		self.mouseover(function(){
			var img = self.find(".toplist-bg");
			img.addClass("item-img-src-hover");
		});
		self.mouseout(function(){
			var img = self.find(".toplist-bg");
			img.removeClass("item-img-src-hover");
		});
	});
	/*
	 * 图片轮播处理
	 * part1，part2，part5
	 */
	$(".part-box").each(function(){
		var self = $(this);
		self.find(".slide-left-btn").click(function(){//左侧按钮点击事件
			var _this = $(this);
			var _parent = _this.parent().parent().parent();//找出最外层即part-box
			var startNumber = getCurrentNum(_parent);
			startNumber --;
			if(startNumber < 0){
				startNumber = 2;
			}
			var leftPx = -(startNumber * 1200) +'px';
			_parent.find(".slide-ul").stop().animate({left: leftPx},"fast");
			_parent.find(".slide-switch a").eq(startNumber).addClass("current").siblings().removeClass("current");
		});
		self.find(".slide-right-btn").click(function(){//右侧按钮点击事件
			var _this = $(this);
			var _parent = _this.parent().parent().parent();//找出最外层即part-box
			var startNumber = getCurrentNum(_parent);
			startNumber ++;
			if(startNumber > 2){
				startNumber = 0;
			}
			var leftPx = -(startNumber * 1200) +'px';
			_parent.find(".slide-ul").stop().animate({left: leftPx},"fast");
			_parent.find(".slide-switch a").eq(startNumber).addClass("current").siblings().removeClass("current");
		});
		//底部点击响应滑动事件
		self.find(".slide-switch a").each(function(){
			var _self = $(this);
			_self.click(function(){
				var _this = $(this);
				var num = parseInt(_this.attr("index"));
				var leftPx = -(num * 1200) +'px';
				_this.parent().parent().find(".slide-ul").stop().animate({left: leftPx},"fast");
				_this.addClass("current").siblings().removeClass("current");
			});
		});
		/**
		 * 遍历找出当前所在位置
		 */
		function getCurrentNum(obj){
			pageSlides = obj.find(".slide-switch a");
			for(var i = 0;i < pageSlides.length;i ++){
				var _this = $(pageSlides[i]);
				if(_this.hasClass("current")){
					return parseInt(_this.attr("index"));
				}
			}
			return -1;
		}
	});
});