Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	
	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
} 
window.onload = function (){
	
	var depDate = new Date();//去程日期
	depDate.setDate(depDate.getDate() + 1);//默认+1天
	var depDateStr = depDate.format("yyyy-MM-dd");
	var arrDate = new Date();//返程日期
	var hotelArrDate = new Date();//离店日期
    arrDate.setDate(depDate.getDate() + 1);//返程日期默认比去程日期晚1天
    hotelArrDate.setDate(depDate.getDate() + 1);//离店日期默认比日住日期晚1天
    var arrDateStr = arrDate.format("yyyy-MM-dd");
    var hotelArrDateStr = hotelArrDate.format("yyyy-MM-dd");
    
    var depDateIn = document.getElementsByClassName("depDateIn");//出发日期输入控件
    var arrDateIn = document.getElementsByClassName("arrDateIn");//返程日期输入控件
    for(var i = 0;i < depDateIn.length;i ++){
    	depDateIn[i].value = depDateStr;
    }
    for(var i = 0;i < arrDateIn.length;i ++){
    	if(!arrDateIn[i].style.disabled){
    		arrDateIn[i].value = arrDateStr;
    	}
    }
    
    var subFlag = false;//用于判断子menu是否悬浮
    var headerMenuLis = document.getElementsByClassName("has");//找到头部menu下有子menu的li标签
    var subMenuUls = document.getElementsByClassName("subul");//找到子menu标签
    for(var i = 0;i < headerMenuLis.length;i ++){//循环监听menu事件
    	headerMenuLis[i].index = i;
    	headerMenuLis[i].onmouseover = function(){//鼠标悬浮事件
    		var t = this.index;
    		hideAllSubUls();
    		subMenuUls[t].style.display = "block";
    		if(t == 4){//当地人背景图片不一样
    			headerMenuLis[t].style.backgroundPosition = "-70px -60px";
    		}else {
    			headerMenuLis[t].style.backgroundPosition = "0px -60px";
    		}
    	}
    	headerMenuLis[i].onmouseout = function(){//鼠标离开事件
    		hideAllSubUls();
    		if(subFlag){
    			var t = this.index;
        		subMenuUls[t].style.display = "block";
    		}
    	}
    }
    for(var i = 0;i < subMenuUls.length;i ++){//循环监听subul事件
    	subMenuUls[i].index = i;
    	subMenuUls[i].onmouseover = function(){//鼠标悬浮事件
    		var t = this.index;
    		this.style.display = "block";
    		subFlag = true;
    		headerMenuLis[t] = addClass(headerMenuLis[t],"hoverClass");
    		if(t == 4){//当地人背景图片不一样
    			headerMenuLis[t].style.backgroundPosition = "-70px -60px";
    		}else {
    			headerMenuLis[t].style.backgroundPosition = "0px -60px";
    		}
    	}
    	subMenuUls[i].onmouseout = function(){//鼠标离开事件
    		var t = this.index;
    		subFlag = false;
    		headerMenuLis[t] = removeClass(headerMenuLis[t],"hoverClass");
    		this.style.display = "none";
    	}
	}
    /**
     * 将所有子menu隐藏
     */
    function hideAllSubUls(){
    	for(var i = 0;i < subMenuUls.length;i ++){
    		subMenuUls[i].style.display = "none";
    	}
    }
    
    var mainLeftLis = document.getElementsByClassName("main-left-tab")[0].getElementsByTagName("li");//内容找到左边tab列表（机票，酒店...）
    var mainContentBoxs = document.getElementsByClassName("main-content");//找到右侧对应显示box内容
    for(var i = 0;i < mainLeftLis.length;i ++){
    	mainLeftLis[i].index = i;
    	mainLeftLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		unSelectMainTabs();
    		mainLeftLis[t] = addClass(mainLeftLis[t],"current");
    		mainContentBoxs[t] = addClass(mainContentBoxs[t],"current");
    	}
    }
    /**
     * 将内容所有tab页置为未选中状态，右边内容不显示
     */
    function unSelectMainTabs(){
    	 for(var i = 0;i < mainLeftLis.length;i ++){
    		 mainLeftLis[i] = removeClass(mainLeftLis[i],"current");
    		 mainContentBoxs[i] = removeClass(mainContentBoxs[i],"current");
    	 }
    }
    
    /**
     * 机票部分
     */
    var flightTabFlag = 0;//0,国内，1，国际
    var flightTabLis = document.getElementById("flight-tab-ul").getElementsByTagName("li");//机票box头部tab
    var flightForms = document.getElementsByClassName("flight-form");//机票表单
    var flightRadiosArr = new Array();//单选按钮
    var flightTimeArr = new Array();//时间item
    var iFlightSubBoxs = document.getElementsByClassName("iFlight-subcontent");//国际根据单选项显示内容box
    for(var i = 0;i < flightTabLis.length;i ++){
    	flightTabLis[i].index = i;
    	flightRadiosArr.push(flightForms[i].getElementsByClassName("flight-radio"));
    	flightTimeArr.push(flightForms[i].getElementsByClassName("item-time-box"));
    	flightTabLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		flightTabFlag = this.index;
    		for(var j = 0;j < flightTabLis.length;j ++){//循环将所有tab移除current样式名，form都置为不可见
    			flightTabLis[j] = removeClass(flightTabLis[j],"current");
    			flightForms[j].style.display = "none";
    		}
    		flightTabLis[t] = addClass(flightTabLis[t],"current");
    		flightForms[t].style.display = "block";
    	}
    }
    for(var i = 0;i < flightRadiosArr.length;i ++){//循环单选按钮监听事件
    	var _item = flightRadiosArr[i];
    	for(var j = 0;j < _item.length;j ++){
    		_item[j].index = j;
    		_item[j].onclick = function(){
    			var t = this.index;
    			var _inputBox = flightTimeArr[flightTabFlag][1];//找到time第二个div
    			switch(t){
    			case 0://单程
    				_inputBox = addClass(_inputBox,"item-disabled");//不可点击
    				if(flightTabFlag == 1){//国际
    					hideIflightSubBox();
    					iFlightSubBoxs[0].style.display = "block";
    				}
    				break;
    			case 1://往返
    				_inputBox = removeClass(_inputBox,"item-disabled");//可点击
    				if(flightTabFlag == 1){//国际
    					hideIflightSubBox();
    					iFlightSubBoxs[0].style.display = "block";
    				}
    				break;
    			case 2://智能搜索
    				hideIflightSubBox();
    				iFlightSubBoxs[1].style.display = "block";
    				break;
    			case 3://联程
    				hideIflightSubBox();
    				iFlightSubBoxs[2].style.display = "block";
    				break;
    			case 4://价格趋势
    				hideIflightSubBox();
    				iFlightSubBoxs[3].style.display = "block";
    				break;
    			default:
    				_inputBox = addClass(_inputBox,"item-disabled");//不可点击
					if(flightTabFlag == 1){//国际
						hideIflightSubBox();
						iFlightSubBoxs[0].style.display = "block";
					}
    				break;
    			}
    		}
    	}
    }
    /**
     * 隐藏国际子box
     */
    function hideIflightSubBox(){
    	for(var i = 0;i < iFlightSubBoxs.length;i ++){
    		iFlightSubBoxs[i].style.display = "none";
    	}
    }
    
    /**
     * 酒店部分
     */
    var hotelTabFlag = 0;//0,酒店搜索，1，客栈民宿，2，高端酒店，3，会场预订
    var hotelTabLis = document.getElementById("hotel-tab-ul").getElementsByTagName("li");//酒店box头部tab
    var hotelForms = document.getElementsByClassName("hotel-form");//酒店表单
    var hotelFormsFooter1 = document.getElementsByClassName("hotel-other-tab")[0];//酒店底部显示1
    var hotelFormsFooter2 = document.getElementsByClassName("hotel-last-tab")[0];//酒店底部显示2
    var hotelRadios = document.getElementsByClassName("hotel-radio");//酒店单选按钮
    for(var i = 0;i < hotelTabLis.length;i ++){//酒店tab页
    	hotelTabLis[i].index = i;
    	hotelTabLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		hotelTabFlag = this.index;
    		for(var j = 0;j < hotelTabLis.length;j ++){//循环将所有tab移除current样式名，form都置为不可见
    			hotelTabLis[j] = removeClass(hotelTabLis[j],"current");
    			hotelForms[j].style.display = "none";
    		}
    		hotelTabLis[t] = addClass(hotelTabLis[t],"current");
    		hotelForms[t].style.display = "block";
    		switch(t){//对应显示底部栏
    		case 0:
    		case 1:
    		case 2:
    			hotelFormsFooter1.style.display = "block";
    			hotelFormsFooter2.style.display = "none";
    			break;
    		case 3:
    			hotelFormsFooter1.style.display = "none";
    			hotelFormsFooter2.style.display = "block";
    			break;
    		default:
    			hotelFormsFooter1.style.display = "block";
				hotelFormsFooter2.style.display = "none";
				break;
    		}
    	}
    }
    for(var i = 0;i < hotelRadios.length;i ++){//酒店单选按钮
    	hotelRadios[i].index = i;
    	hotelRadios[i].onclick = function(){
    		var depCityInput = hotelForms[0].getElementsByClassName("hotel-city-input")[0];//目的地输入
    		if(this.index == 0){//国内酒店
    			depCityInput.value = "北京";
    		}
    		else {//国际酒店
    			depCityInput.value = "香港";
    		}
    	}
    }
    
    /**
     * 火车票部分
     */
    var trainBox = document.getElementById("content-train");
    var trainTabLis = document.getElementById("train-tab-ul").getElementsByTagName("li");//火车票box头部tab
    var trainForms = trainBox.getElementsByClassName("train-form");//火车票表单
    var trainHotCitys = trainBox.getElementsByClassName("hot-train")[0].getElementsByTagName("a");//热门车站
    var train3rdInput = document.getElementById("train-3rd-city");//车站搜索输入框
    for(var i = 0;i < trainTabLis.length;i ++){//酒店tab页
    	trainTabLis[i].index = i;
    	trainTabLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		for(var j = 0;j < trainTabLis.length;j ++){//循环将所有tab移除current样式名，form都置为不可见
    			trainTabLis[j] = removeClass(trainTabLis[j],"current");
    			trainForms[j].style.display = "none";
    		}
    		trainTabLis[t] = addClass(trainTabLis[t],"current");
    		trainForms[t].style.display = "block";
    	}
    }
    for(var i = 0;i < trainHotCitys.length;i ++){
    	trainHotCitys[i].onclick = function(){
    		train3rdInput.value = this.text;//会场预订底部列表点击给对应input赋值
    	}
    }
    
    /**
     * 度假部分
     */
    var holidyTabLis = document.getElementById("holidy-tab-ul").getElementsByClassName("holidy-tab-li");//度假box头部tab
    var holidyForms = document.getElementsByClassName("holidy-form");//度假表单
    var holidyFooters = document.getElementsByClassName("holidy-footer")[0].getElementsByTagName("ul");//度假底部显示
    for(var i = 0;i < holidyTabLis.length;i ++){//度假tab页
    	holidyTabLis[i].index = i;
    	holidyTabLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		for(var j = 0;j < holidyTabLis.length;j ++){//循环将所有tab移除current样式名，form都置为不可见
    			holidyTabLis[j] = removeClass(holidyTabLis[j],"current");
    			holidyForms[j].style.display = "none";
    			holidyFooters[j].style.display = "none";
    		}
    		holidyTabLis[t] = addClass(holidyTabLis[t],"current");
    		holidyForms[t].style.display = "block";
    		holidyFooters[t].style.display = "block";
    	}
    }
    
    /**
     * 团购部分
     */
    var buyTabLis = document.getElementsByClassName("buy-item-list-title")[0].getElementsByTagName("li");//团购便捷查找酒店tab
    var buyLisDetail = document.getElementsByClassName("buy-item-list-detail");//团购便捷查找酒店对应list
    for(var i = 0;i < buyTabLis.length;i ++){//度假tab页
    	buyTabLis[i].index = i;
    	buyTabLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		for(var j = 0;j < buyTabLis.length;j ++){//循环将所有tab移除current样式名，form都置为不可见
    			buyTabLis[j] = removeClass(buyTabLis[j],"current");
    			buyLisDetail[j].style.display = "none";
    		}
    		buyTabLis[t] = addClass(buyTabLis[t],"current");
    		buyLisDetail[t].style.display = "block";
    	}
    }
    
    /**
     * 车车部分
     */
    var carTabLis = document.getElementById("car-tab-ul").getElementsByTagName("li");//车车box头部tab
    var carForms = document.getElementsByClassName("car-form");//车车表单
    var carFooterImgs = document.getElementsByClassName("cheche-footer-img");//车车底部显示图片列表
    var carRadios = document.getElementsByClassName("car-radio");//接送专车下单选按钮
    var carRadiosBox = document.getElementsByClassName("car-radio-item");//接送车单选按钮对应显示内容
    for(var i = 0;i < carTabLis.length;i ++){//车车tab页
    	carTabLis[i].index = i;
    	carTabLis[i].onclick = function(){//鼠标点击事件
    		var t = this.index;
    		for(var j = 0;j < carTabLis.length;j ++){//循环将所有tab移除current样式名，form都置为不可见
    			carTabLis[j] = removeClass(carTabLis[j],"current");
    			carForms[j].style.display = "none";
    			carFooterImgs[j].style.display = "none";
    		}
    		carTabLis[t] = addClass(carTabLis[t],"current");
    		carForms[t].style.display = "block";
    		carFooterImgs[t].style.display = "block";
    	}
    }
    for(var i = 0;i < carRadios.length;i ++){//循环接送车单选按钮
    	carRadios[i].index = i;
    	carRadios[i].onclick = function(){
    		var t = this.index;
    		for(var j = 0;j < carRadiosBox.length;j ++){
    			carRadiosBox[j].style.display = "none";
    		}
    		carRadiosBox[t].style.display = "block";
    	}
    }
    
    
    /**
     * 地址弹框
     */
    var depCityIns = document.getElementsByClassName("cityIn");//找到城市输入框
    var dateIns = document.getElementsByClassName("dateIn");//找到日期输入框
    var autoCity = document.getElementsByClassName("item-autoCity")[0];//地址
    var autoDate = document.getElementsByClassName("item-autoDate")[0];//日期
    for(var i = 0;i < depCityIns.length;i ++){
    	depCityIns[i].onfocus = function(){//获取焦点事件
    		var offsetLeft = getLeftOffset(this.offsetParent);//获取父div的左侧距离
    		var offsetTop = getTopOffset(this.offsetParent);//获取父div的高度
    		autoCity.style.left = offsetLeft + "px";
    		autoCity.style.top = (offsetTop + this.offsetParent.offsetHeight - 1) + "px";
    		autoCity.style.display = "block";
    	}
    	depCityIns[i].onblur = function(){//失去焦点事件
    		autoCity.style.display = "none";
    	}
    }
    for(var i = 0;i < dateIns.length;i ++){
    	dateIns[i].onfocus = function(){//获取焦点事件
    		var offsetLeft = getLeftOffset(this.offsetParent);//获取父div的左侧距离
    		var offsetTop = getTopOffset(this.offsetParent);//获取父div的高度
    		autoDate.style.left = offsetLeft + "px";
    		autoDate.style.top = (offsetTop + this.offsetParent.offsetHeight - 1) + "px";
    		autoDate.style.display = "block";
    	}
    	dateIns[i].onblur = function(){//失去焦点事件
    		autoDate.style.display = "none";
    	}
    }
}
/**
 * 找出在main-tab-content下对应的绝对位置高度
 * @param obj
 * @returns
 */
function getTopOffset(obj){
	var offset = obj.offsetTop;
	if(obj.offsetParent != null){
		var _className = obj.offsetParent.className;
		if(_className.indexOf("main-tab-content") != -1){//包含该class
			return offset;
		}
		offset += getTopOffset(obj.offsetParent);
	}
	return offset;
}
/**
 * 找出在main-tab-content下对应的绝对位置左边距离
 * @param obj
 * @returns
 */
function getLeftOffset(obj){
	var offset = obj.offsetLeft;
	if(obj.offsetParent != null){
		var _className = obj.offsetParent.className;
		if(_className.indexOf("main-tab-content") != -1){//包含该class
			return offset;
		}
		offset += getLeftOffset(obj.offsetParent);
	}
	return offset;
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
