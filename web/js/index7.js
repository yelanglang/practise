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
var hotCity = ["北京","上海","广州","深圳","成都","重庆","西安","杭州","武汉","南京","沈阳","天津","大连","青岛","长沙","昆明","长春","郑州","海口","合肥","济南","福州","哈尔滨","乌鲁木齐"];
window.onload = function (){
	
	var depDate = new Date();//去程日期默认当天
	var depDateStr = depDate.format("yyyy-MM-dd");
	var arrDate = new Date();//返程日期
	var hotelArrDate = new Date();//离店日期
    arrDate.setDate(depDate.getDate() + 3);//返程日期默认比去程日期晚3天
    hotelArrDate.setDate(depDate.getDate() + 1);//离店日期默认比日住日期晚3天
    var arrDateStr = arrDate.format("yyyy-MM-dd");
    var hotelArrDateStr = hotelArrDate.format("yyyy-MM-dd");
    var flightTab = document.getElementById("flightTab");//机票tab
    var hotelTab = document.getElementById("hotelTab");//酒店tab
    var flightBox = document.getElementsByClassName("c-main-flight")[0];//机票box
    var hotelBox = document.getElementsByClassName("c-main-hotel")[0];//酒店box
    var flightTab1 = document.getElementById("flightTab1");//国内机票tab
    var flightTab2 = document.getElementById("flightTab2");//国际机票tab
    var hotelTab1 = document.getElementById("hotelTab1");//国内酒店tab
    var hotelTab2 = document.getElementById("hotelTab2");//国际酒店tab
    var flightForm1 = document.getElementById("flightForm");//国内机票form
    var flightForm2 = document.getElementById("iFlightForm");//国际机票form
    var hotelForm1 = document.getElementById("hotelForm");//国内酒店form
    var hotelForm2 = document.getElementById("iHotelForm");//国际酒店form
    var typeRadio1 = document.getElementById("radio1");//国内单程按钮
    var typeRadio2 = document.getElementById("radio2");//国内双程按钮
    var depTime1 = document.getElementById("depTime1");//国内出发时间
    var arrTime1 = document.getElementById("arrTime1");//国内到达时间
    var typeRadio3 = document.getElementById("radio3");//国际单程按钮
    var typeRadio4 = document.getElementById("radio4");//国际双程按钮
    var depTime2 = document.getElementById("depTime2");//国际出发时间
    var arrTime2 = document.getElementById("arrTime2");//国际到达时间
    var hotelDepTime1 = document.getElementById("hotelDepTime1");//国内酒店入住日期
    var hotelArrTime1 = document.getElementById("hotelArrTime1");//国内酒店离店日期
    var hotelDepTime2 = document.getElementById("hotelDepTime2");//国际酒店入住日期
    var hotelArrTime2 = document.getElementById("hotelArrTime2");//国际酒店离店日期
    depTime1.value = depDateStr;
    arrTime1.value = arrDateStr;
    depTime2.value = depDateStr;
    arrTime2.value = arrDateStr;
    hotelDepTime1.value = depDateStr;
    hotelArrTime1.value = hotelArrDateStr;
    hotelDepTime2.value = depDateStr;
    hotelArrTime2.value = hotelArrDateStr;

    /**
     * 机票tab点击事件
     */
    flightTab.onclick = function(){
    	this.className = "active";
    	hotelTab.className = "";
    	flightBox.style.display = "";
    	hotelBox.style.display = "none";
    	if(flightTab1.className == "active"){//判断机票tab上哪个为选中状态，对应显示form
    		flightForm1.style.display = "";
    		flightForm2.style.display = "none";
    	}
    	else {
    		flightForm1.style.display = "none";
    		flightForm2.style.display = "";
    	}
    }
    /**
     * 酒店tab点击事件
     */
    hotelTab.onclick = function(){
    	this.className = "active";
    	flightTab.className = "";
    	flightBox.style.display = "none";
    	hotelBox.style.display = "";
    	if(hotelTab1.className == "active"){//判断酒店tab上哪个为选中状态，对应显示form
    		hotelForm1.style.display = "";
    		hotelForm2.style.display = "none";
    	}
    	else {
    		hotelForm1.style.display = "none";
    		hotelForm2.style.display = "";
    	}
    }
    /**
     * 国内机票tab点击事件
     */
    flightTab1.onclick = function(){
    	this.className = "active";
    	flightTab2.className = "";
    	flightForm1.style.display = "";
    	flightForm2.style.display = "none";
    }
    /**
     * 国际机票tab点击事件
     */
    flightTab2.onclick = function(){
    	this.className = "active";
    	flightTab1.className = "";
    	flightForm1.style.display = "none";
    	flightForm2.style.display = "";
    }
    /**
     * 国内酒店tab点击事件
     */
    hotelTab1.onclick = function(){
    	this.className = "active";
    	hotelTab2.className = "";
    	hotelForm1.style.display = "";
    	hotelForm2.style.display = "none";
    }
    /**
     * 国际酒店tab点击事件
     */
    hotelTab2.onclick = function(){
    	this.className = "active";
    	hotelTab1.className = "";
    	hotelForm1.style.display = "none";
    	hotelForm2.style.display = "";
    }
    /**
     * 国内单程按钮点击事件
     */
    typeRadio1.onclick = function(){
    	arrTime1.disabled = "disabled";
    }
    /**
     * 国内双程按钮点击事件
     */
    typeRadio2.onclick = function(){
    	arrTime1.disabled = "";
    }
    /**
     * 国际单程按钮点击事件
     */
    typeRadio3.onclick = function(){
    	arrTime2.disabled = "disabled";
    }
    /**
     * 国际双程按钮点击事件
     */
    typeRadio4.onclick = function(){
    	arrTime2.disabled = "";
    }
	
	/*
	 * 右边大图轮播处理start
	 */
	var mainBox = document.getElementsByClassName("c-main-box")[0];//找到右侧外层box
	var mainBigPic = mainBox.getElementsByClassName("bigPic")[0];//外层box下找到大图的div层
	var bigPicLis = mainBigPic.getElementsByTagName("li");//找到大图下的li列表
	var picText = mainBox.getElementsByClassName("picText")[0];//外层box下找到大图的文本div层
	var picTextLis = picText.getElementsByTagName("li");//找到大图文本层下的li列表
	var mainSmallPic = mainBox.getElementsByClassName("smallPic")[0];//外层box下找到小图的div层
	var smallPicLis = mainSmallPic.getElementsByTagName("li");//找到小图下的li列表
	var preBtn = mainBox.getElementsByClassName("pre")[0];//外层box下找到左箭头
	var nextBtn = mainBox.getElementsByClassName("next")[0];//外层box下找到右箭头
	
	var bigNum = 0;
	/*
	 * 循环小图标，给小图标加上监听事件 
	 */
	for(var i = 0;i < smallPicLis.length;i ++){
		smallPicLis[i].index = i;
		smallPicLis[i].onclick = function(){
			bigNum = this.index;
			scroll();
		}
	}
	/**
	 * 轮播
	 */
	function scroll(){
		for(var i = 0;i < smallPicLis.length;i ++){
			smallPicLis[i].className = "";
			bigPicLis[i].style.display = "none";
			picTextLis[i].style.display = "none";
		}
		smallPicLis[bigNum].className = "current";
		bigPicLis[bigNum].style.display = "";
		picTextLis[bigNum].style.display = "";
	}
	/**
	 * 左箭头点击事件
	 */
	preBtn.onclick = function(){
		bigNum--;
		if(bigNum < 0){
			bigNum = smallPicLis.length - 1;
		}
		scroll();
	}
	/**
	 * 右箭头点击事件
	 */
	nextBtn.onclick = function(){
		bigNum++;
		if(bigNum > smallPicLis.length - 1){
			bigNum = 0;
		}
		scroll();
	}
	var bigTimer = setInterval(nextBtn.onclick,4 * 1000);//大图定时器
	/**
	 * 大图片外层div鼠标悬浮事件
	 * 清空定时器
	 */
	mainBox.onmouseover = function(){
		clearInterval(bigTimer);
	}
	/**
	 * 大图片外层div鼠标悬浮事件
	 * 加载定时器
	 */
	mainBox.onmouseout = function(){
		bigTimer = setInterval(nextBtn.onclick,4 * 1000);//大图定时器
	}
	/*
	 * 右边大图轮播处理start
	 */
	
	
	/*
	 * 左下角小图标轮播处理部分start
	 */
	var lBoxDiv = document.getElementById("left-btm-box");//获取左边底部图片外层div
	var lImgDiv = lBoxDiv.getElementsByClassName("left-pic")[0];//获取图片div
	var lImgLis = lImgDiv.getElementsByTagName("li");//获取图片下li列表
	var lCircleDiv = lBoxDiv.getElementsByClassName("left-round")[0];//获取圆点div
	var lCircles = lCircleDiv.getElementsByTagName("span");//获取圆点下span列表
	var smallNum = 0;
	/**
	 * 左下角图片轮播
	 */
	function smallScroll(){
		for(var i = 0;i < lImgLis.length;i ++){
			lImgLis[i].style.display = "none";
			lCircles[i].className = "";
		}
		lImgLis[smallNum].style.display = "";
		lCircles[smallNum].className = "current";
	}
	/*
	 * 循环圆点span列表，加载鼠标悬浮事件
	 */
	for(var i = 0;i < lCircles.length;i ++){
		lCircles[i].index = i;
		lCircles[i].onmouseover = function(){
			smallNum = this.index;
			smallScroll();
		};
	}
	/**
	 * 循环显示小图片
	 */
	function roundShowSmallImg(){
		smallNum ++;
		if(smallNum > lCircles.length -1){
			smallNum = 0;
		}
		smallScroll();
	}
	var smallTimer = setInterval(roundShowSmallImg,2 * 1000);//小图定时器
	/*
	 * 左下角小图标轮播处理部分end
	 */
}
