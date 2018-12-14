var self = this;
var bigTimer = null;
window.onload = function (){
	initView();//初始化页面
}
/**
 * 初始化页面
 */
function initView(){
	initCity();//城市选择
	initMainMenu();//menu栏
	initSlider();//轮播图（主页，服装层）
	initToday();//今日图片
	initFloorTab();//类似服装的tab页
}
/**
 * 城市选择操作
 */
function initCity(){
	var index = 0;
	self.cityText = document.getElementsByClassName("header-city-text")[0];//城市显示文本
	self.provinces = document.getElementsByClassName("header-province")[0].getElementsByTagName("a");//城市列表
	for(var i = 0;i < self.provinces.length;i ++){
		self.provinces[i].index = i;
		self.provinces[i].onclick = function(){
			self.provinces[index] = removeClass(self.provinces[index],"selected");//移除之前样式
			index = this.index;//改变索引
			self.provinces[index] = addClass(self.provinces[index],"selected");//改变样式
			self.cityText.innerText = self.provinces[index].innerText;//给文本赋值
		}
	}
}
var menuIndex = 0;//menu栏索引
/**
 * menu栏操作
 */
function initMainMenu(){
	self.menuLis = document.getElementsByClassName("focus-menu")[0].getElementsByTagName("li");//menu列表
	self.menuSubItems = document.getElementsByClassName("focus-subs")[0].getElementsByClassName("item-sub");//内容列表
	self.menuDropDownLayer = document.getElementsByClassName("focus")[0].getElementsByClassName("dropdown-layer")[0];//内容列表外层div
	for(var i = 0;i < self.menuLis.length;i ++){
		self.menuLis[i].index = i;
		self.menuLis[i].onmouseover = function(){
			self.menuSubItems[menuIndex].style.display = "none";//隐藏之前内容
			self.menuLis[menuIndex].className = "";
			menuIndex = this.index;
			self.menuLis[menuIndex].className = "current";
			self.menuDropDownLayer.style.display = "block";
			self.menuSubItems[menuIndex].style.display = "block";//显示对应内容
		}
		self.menuLis[i].onmouseout = function(){
			var tIndex = this.index;
			self.menuLis[tIndex].className = "";
			self.menuDropDownLayer.style.display = "none";
		}
	}
	self.menuDropDownLayer.onmouseover = function(){
		self.menuDropDownLayer.addEventListener('mouseout', menuMouseout);//事件监听
		self.menuDropDownLayer.style.display = "block";
		self.menuSubItems[menuIndex].style.display = "block";//离开隐藏当前内容
		self.menuLis[menuIndex].className = "current";
	}
}
/**
 * menu dropdown-layer鼠标离开事件
 */
function menuMouseout(){
	self.menuLis[menuIndex].className = "";
	self.menuDropDownLayer.style.display = "none";
	self.menuSubItems[menuIndex].style.display = "none";//离开隐藏当前内容
	self.menuDropDownLayer.removeEventListener('mouseout', menuMouseout);//事件监听
}
/**
 * tab页操作
 * 如服装tab
 */
function initFloorTab(){
	self.floorPanelArray = new Array();
	var panelObj = "";
	var pIndex = 0;//父级索引
	var lIndex = 0;//子索引
	self.floorPanel = document.getElementsByClassName("floor");//floor最外层panel
	for(var i = 0;i < self.floorPanel.length;i ++){//遍历外层panel
		panelObj = {
				tab:"",//tabdiv
				lis:[],//tab列表
				mains:[],//内容列表
				index:i,//索引
		}
		var _panel = self.floorPanel[i];
		panelObj.tab = _panel.getElementsByClassName("tab")[0];//tab
		panelObj.lis = panelObj.tab.getElementsByTagName("li");//标题列表
		panelObj.mains = _panel.getElementsByClassName("main");//内容列表
		self.floorPanelArray.push(panelObj);
	}
	for(var i = 0;i < self.floorPanelArray.length;i ++){
		for(var j = 0;j < self.floorPanelArray[i].lis.length;j ++){
			self.floorPanelArray[i].lis[j].index = j;//li列表索引
			self.floorPanelArray[i].lis[j].pIndex = i;//所在对象索引
			self.floorPanelArray[i].lis[j].onmouseover = function(){//鼠标悬浮事件
				//去除样式
				self.floorPanelArray[pIndex].lis[lIndex] = removeClass(self.floorPanelArray[pIndex].lis[lIndex],"current");//对应隐藏样式
				self.floorPanelArray[pIndex].mains[lIndex] = removeClass(self.floorPanelArray[pIndex].mains[lIndex],"current");//对应隐藏main内容
				lIndex = this.index;
				pIndex = this.pIndex;
				//增加样式
				self.floorPanelArray[pIndex].lis[lIndex] = addClass(self.floorPanelArray[pIndex].lis[lIndex],"current");//对应显示样式
				self.floorPanelArray[pIndex].mains[lIndex] = addClass(self.floorPanelArray[pIndex].mains[lIndex],"current");//对应显示main内容
			}
		}
	}
}
/**
 * 今日图片操作
 */
function initToday(){
	var todayIndex = 0;
	self.todayPanel = document.getElementsByClassName("today")[0];//今日图片div
	self.todayPage = self.todayPanel.getElementsByClassName("slide-page")[0];//左右按钮外层div
	self.todayPrev = self.todayPage.getElementsByClassName("prev")[0];//左侧按钮
	self.todayNext = self.todayPage.getElementsByClassName("next")[0];//右侧按钮
	self.todayListPanel = self.todayPanel.getElementsByClassName("today-list")[0];//图片列表外层
	self.todayLis = self.todayListPanel.getElementsByTagName("li");//图片列表
	for(var i = 0;i < self.todayLis.length;i ++){
		self.todayLis[i].index = i;
	}
	myMouseOver(self.todayPanel,self.todayPage,false);//鼠标悬浮事件
	myMouseOut(self.todayPanel,self.todayPage,false);//鼠标离开事件
	
	self.todayPrev.onclick = function(){//鼠标点击事件
		self.todayLis[todayIndex] = removeClass(self.todayLis[todayIndex],"current");//移除相应class
		todayIndex --;
		if(todayIndex < 0){
			todayIndex = self.todayLis.length - 1;
		}
		self.todayLis[todayIndex] = addClass(self.todayLis[todayIndex],"current");//加载对应class
	}
	self.todayNext.onclick = function(){//鼠标点击事件
		self.todayLis[todayIndex] = removeClass(self.todayLis[todayIndex],"current");//移除相应class
		todayIndex ++;
		if(todayIndex > self.todayLis.length - 1){
			todayIndex = 0;
		}
		self.todayLis[todayIndex] = addClass(self.todayLis[todayIndex],"current");//加载对应class
	}
}
var counts = new Array();//计数（menu栏，服装）
/**
 * 轮播图操作
 */
function initSlider(){
	self.slideArray = new Array();
	var slideObj;//创建轮播图对象
	self.slideMains = document.getElementsByClassName("slide");//轮播主div
	for(var i = 0;i < self.slideMains.length;i ++){//遍历轮播图
		slideObj = {
				slideMain:"",//图片层div
				slideMainLis:"",//图片列表
				slidePage:"",//左右按钮层div
				slidePrev:"",//左侧按钮
				slideNext:"",//右侧按钮
				slideRounds:"",//圆点列表
				index:i,//对象索引
		}
		var itemMain = self.slideMains[i];
		slideObj.slideMain = itemMain.getElementsByClassName("slide-img")[0];//图片层div
		slideObj.slideMainLis = slideObj.slideMain.getElementsByTagName("li");//找到轮播图主列表
		slideObj.slidePage = itemMain.getElementsByClassName("slide-page")[0];//左右按钮外层div
		slideObj.slidePrev = slideObj.slidePage.getElementsByClassName("prev")[0];//左侧按钮
		slideObj.slideNext = slideObj.slidePage.getElementsByClassName("next")[0];//右侧按钮
		slideObj.slideRounds = itemMain.getElementsByClassName("slide-nav")[0].getElementsByTagName("li");//底部原点图标列表
		
		self.slideArray.push(slideObj);
		counts.push(0);
	}
	for(var i = 0;i < self.slideArray.length;i ++){
		for(var j = 0;j < self.slideArray[i].slideRounds.length;j ++){
			self.slideArray[i].slideRounds[j].index = j;
			self.slideArray[i].slideRounds[j].pIndex = i;//父层索引
			self.slideArray[i].slideRounds[j].onmouseover = function(){//小圆点图标监听事件
				var pIndex = this.pIndex;
				counts[pIndex] = this.index;
				self.scroll(pIndex,counts[pIndex]);
				clearInterval(bigTimer);
			}
			self.slideArray[i].slideRounds[j].onmouseout = function(){
				var pIndex = this.pIndex;
				bigTimer = setInterval(self.slideArray[pIndex].slideNext.onclick,3 * 1000);//图定时器
			}
		}
		slideMouseOver("slideMain",i,true);//鼠标悬浮事件
		slideMouseOut("slideMain",i,true);//鼠标离开事件
		slideMouseOver("slidePrev",i,true);//鼠标悬浮事件
		slideMouseOut("slidePrev",i,true);//鼠标离开事件
		slideMouseOver("slideNext",i,true);//鼠标悬浮事件
		slideMouseOut("slideNext",i,true);//鼠标离开事件
		self.slideArray[i].slidePrev.index = i;
		self.slideArray[i].slidePrev.onclick = function(){//左侧图标点击事件
			var index = this.index;
			if(typeof(index) == "undefined"){
				return;
			}
			counts[index] --;
			if(counts[index] < 0){
				counts[index] = self.slideArray[index].slideRounds.length - 1;
			}
			self.scroll(index,counts[index]);
		}
		self.slideArray[i].slideNext.index = i;
		self.slideArray[i].slideNext.onclick = function(){//右侧图标点击事件
			var index = this.index;
			self.myNextClick(index);
		}
	}
	bigTimer = setInterval(function(){
		myNextClick(0);
		myNextClick(1);
	},3 * 1000);//图定时器
}
/**
 * 右侧点击事件
 * @param index
 */
function myNextClick(index){
	
	if(typeof(index) == "undefined"){
		return;
	}
	counts[index] ++;
	if(counts[index] > self.slideArray[index].slideRounds.length - 1){
		counts[index] = 0;
	}
	self.scroll(index,counts[index]);
}
/**
 * 轮播图鼠标悬浮事件
 * @param obj 需要监听的对象
 * @param timerFlag bigTimer定时器开关
 */
function slideMouseOver(obj,index,timerFlag){
	var _itemObj = eval("self.slideArray[" + index + "]." + obj);
	_itemObj.onmouseover = function(){
		self.slideArray[index].slidePage.style.display = "block";
		if(timerFlag){
			clearInterval(self.bigTimer);
		}
	}
}
/**
 * 轮播图鼠标离开事件
 * @param obj 需要监听的对象
 * @param timerFlag bigTimer定时器开关
 */
function slideMouseOut(obj,index,timerFlag){
	var _itemObj = eval("self.slideArray[" + index + "]." + obj);
	_itemObj.onmouseout = function(){
		self.slideArray[index].slidePage.style.display = "none";
		if(timerFlag){
			self.slideArray[index].slideNext.index = index;
			self.bigTimer = setInterval(function(){myNextClick(0);myNextClick(1)},3 * 1000);//图定时器
		}
	}
}
/**
 * 鼠标悬浮事件
 * @param obj 需要监听的对象
 * @param hObj 需要显示的对象
 */
function myMouseOver(obj,hObj){
	obj.onmouseover = function(){
		hObj.style.display = "block";
	}
}
/**
 * 鼠标离开事件
 * @param obj 需要监听的对象
 * @param hObj 需要隐藏的对象
 */
function myMouseOut(obj,hObj){
	obj.onmouseout = function(){
		hObj.style.display = "none";
	}
}
/**
 * 轮播
 * index 数组索引
 * count 图片列表索引
 */
function scroll(index,count){
	for(var i = 0;i < self.slideArray[index].slideMainLis.length;i ++){
		self.slideArray[index].slideMainLis[i].className = "";
		self.slideArray[index].slideRounds[i].className = "";
	}
	if(typeof(count) == "number"){
		self.slideArray[index].slideMainLis[count].className = "current";
		self.slideArray[index].slideRounds[count].className = "selected";
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

