var self = this;
var bigTimer = null;
window.onload = function (){
	initView();//初始化页面
}
/**
 * 初始化页面
 */
function initView(){
	initSlider();//轮播图
	initToday();//今日图片
}
/**
 * 今日图片操作
 */
function initToday(){
	self.todayPanel = document.getElementsByClassName("today")[0];//今日图片div
	self.todayPage = self.todayPanel.getElementsByClassName("slide-page")[0];//左右按钮外层div
	self.todayPrev = self.todayPage.getElementsByClassName("prev")[0];//左侧按钮
	self.todayNext = self.todayPage.getElementsByClassName("next")[0];//右侧按钮
	self.todayListPanel = self.todayPanel.getElementsByClassName("today-list")[0];//图片列表外层
	self.todayLis = self.todayListPanel.getElementsByTagName("li");//图片列表
	for(var i = 0;i < self.todayLis.length;i ++){
		self.todayLis[i].index = i;
		self.todayLis[i]
	}
}
/**
 * 轮播图操作
 */
function initSlider(){
	var counts = 0;//计数
	self.slideMain = document.getElementsByClassName("slide-img")[0];//轮播图图片主div
	self.slideMainLis = self.slideMain.getElementsByTagName("li");//找到轮播图主列表
	self.slidePage = document.getElementsByClassName("slide-page")[0];//左右按钮外层div
	self.slidePrev = self.slidePage.getElementsByClassName("prev")[0];//左侧按钮
	self.slideNext = self.slidePage.getElementsByClassName("next")[0];//右侧按钮
	self.slideRounds = document.getElementsByClassName("slide-nav")[0].getElementsByTagName("li");//底部原点图标列表
	
	for(var i = 0;i < self.slideRounds.length;i ++){
		self.slideRounds[i].index = i;
		self.slideRounds[i].onmouseover = function(){//小圆点图标监听事件
			counts = this.index;
			self.scroll(counts);
			clearInterval(bigTimer);
		}
		self.slideRounds[i].onmouseout = function(){
			bigTimer = setInterval(self.slideNext.onclick,3 * 1000);//图定时器
		}
	}
	self.slideMain.onmouseover = function(){//图标悬浮事件显示前后箭头
		self.slidePage.style.display = "block";
		clearInterval(bigTimer);
	}
	self.slideMain.onmouseout = function(){//图标移开事件隐藏前后箭头
		self.slidePage.style.display = "none";
		bigTimer = setInterval(self.slideNext.onclick,3 * 1000);//图定时器
	}
	self.slidePrev.onmouseover = function(){
		self.slidePage.style.display = "block";
		clearInterval(bigTimer);
	}
	self.slidePrev.onmouseout = function(){//图标移开事件隐藏前后箭头
		self.slidePage.style.display = "none";
		bigTimer = setInterval(self.slideNext.onclick,3 * 1000);//图定时器
	}
	self.slideNext.onmouseover = function(){
		self.slidePage.style.display = "block";
		clearInterval(bigTimer);
	}
	self.slideNext.onmouseout = function(){//图标移开事件隐藏前后箭头
		self.slidePage.style.display = "none";
		bigTimer = setInterval(self.slideNext.onclick,3 * 1000);//图定时器
	}
	self.slidePrev.onclick = function(){//左侧图标点击事件
		counts --;
		if(counts < 0){
			counts = self.slideRounds.length - 1;
		}
		self.scroll(counts);
	}
	self.slideNext.onclick = function(){//右侧图标点击事件
		counts ++;
		if(counts > self.slideRounds.length - 1){
			counts = 0;
		}
		self.scroll(counts);
	}
	bigTimer = setInterval(self.slideNext.onclick,3 * 1000);//图定时器
}
/**
 * 鼠标悬浮事件
 */
function myMouseOver(obj){
	
}
/**
 * 轮播
 */
function scroll(index){
	for(var i = 0;i < self.slideMainLis.length;i ++){
		self.slideMainLis[i].className = "";
		self.slideRounds[i].className = "";
	}
	if(typeof(index) == "number"){
		self.slideMainLis[index].className = "current";
		self.slideRounds[index].className = "selected";
	}
}

/**
 * 给hmtl对象添加指定class
 * @param obj
 * @param name
 */
function addClass(obj,name){
	var _className = obj.className;
	if(_className.indexOf(name) == -1){//没有包含该class
		obj.className = _className + " " + name;
	}
	return obj;
}
/**
 * 给html对象删除指定class
 * @param obj
 * @param name
 */
function removeClass(obj,name){
	var _className = obj.className;
	if(_className.indexOf(name) != -1){//包含该class
		obj.className = _className.replace(name,"");
	}
	return obj;
}

