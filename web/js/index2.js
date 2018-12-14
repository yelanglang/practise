window.onload = function (){
	var bigDiv = document.getElementsByClassName("toparea-left-image");//外层大div
	var img = document.getElementById("main-img");//图片
	var title1 = document.getElementsByClassName("main-img-text")[0].getElementsByTagName("strong")[0];//标题1
	var title2 = document.getElementsByClassName("main-img-text")[0].getElementsByTagName("span")[0];//标题2
	var rounds = document.getElementsByClassName("main-img-rounds")[0].getElementsByTagName("a");//圆点
	var preBtn = document.getElementsByClassName("main-img-arrows")[0].getElementsByClassName("prev")[0];//左箭头
	var nextBtn = document.getElementsByClassName("main-img-arrows")[0].getElementsByClassName("next")[0];//右箭头
	var obj = null;
	var i = 1;
	var timer = setInterval(function(){count(true)},2 * 1000);//定时器
	myMouseOver(img);
	myMouseOver(preBtn);
	myMouseOver(nextBtn);
	myMouseOut(img);
	myMouseOut(preBtn);
	myMouseOut(nextBtn);
	
	preBtn.onclick = function(){//左侧箭头点击事件
		i --;
		if(i < 0){
			i = rounds.length - 1;
		}
		count();
	}
	nextBtn.onclick = function(){//右侧箭头点击事件
		i ++;
		if(i >= rounds.length){
			i = 0;
		}
		count();
	}
	
	for(var j = 0;j < rounds.length;j ++){
		rounds[j].index = j;
		rounds[j].onmouseover = function(){
			i = this.index;
			count();
			clearInterval(timer);
		}
		rounds[j].onmouseout = function(){
			timer = setInterval(function(){count(true)},2 * 1000);//定时器
		}
	}
	
	/**
	 * 计数
	 */
	function count(flag){
		ajax("../js/common/data2.js",function(obj){
			removeRoundsBg();
			changeImg(obj,i);
			if(flag){
				i ++;
				if(i >= 3){
					i = 0;
				}
			}
		},function(){},i);
	}
	/**
	 * 移除所有圆点背景
	 */
	function removeRoundsBg(){
		for(var j = 0;j < rounds.length;j ++){
			rounds[j].className = "";
		}
	}
	/**
	 * 改变
	 */
	function changeImg(obj,i){
		img.src = obj.src;
		title1.innerText = obj.title1;
		title2.innerText = obj.title2;
		rounds[i].className = "current";
	}
	/**
	 * 自定义鼠标悬浮方法
	 */
	function myMouseOver(obj){
		obj.onmouseover = function(){
			clearInterval(timer);
		}
	}
	/**
	 * 自定义鼠标离开方法
	 */
	function myMouseOut(obj){
		obj.onmouseout = function(){
			timer = setInterval(function(){count(true)},2 * 1000);//定时器
		}
	}
}
