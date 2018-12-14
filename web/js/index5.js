window.onload = function (){
	var banners = document.getElementsByClassName("more-div");
	for(var i = 0;i < banners.length;i ++){
		var item = banners[i];
		item.addEventListener('mouseover', mouseover);//事件监听
		item.addEventListener('mouseout', mouseout);//事件监听
	}
	countNarcissisticNumber();
}
/**
 * 鼠标悬浮在上面事件
 * @param obj
 */
function mouseover(obj){
	var _ul = obj.currentTarget.getElementsByClassName("header-ul")[0];//获取该对象下ul节点
	_ul.style.display="inherit";
}
/**
 * 鼠标移动离开事件
 * @param obj
 */
function mouseout(obj){
	var _ul = obj.currentTarget.getElementsByClassName("header-ul")[0];//获取该对象下ul节点
	_ul.style.display="none";
}
/**
 * 计算100-999之间的水仙花数
 * 水仙花数是指一个 n 位数 ( n≥3 )，它的每个位上的数字的 n 次幂之和等于它本身。
 * （例如：153 拆开： 1的三次方 + 5的三次方+ 3的三次方= 153）
 */
function countNarcissisticNumber(){
	var str = "";
	for(var i = 100;i < 1000;i ++){
		var num1 = parseInt(i / 100);//获取百分位上的数字，198-1
		var data = i % 100;//获取十位数和个位数，198-98
		var num2 = parseInt(data / 10);//获取十分位上的数字，98-9
		var num3 = data % 10;//获取个位上的数字，98-8
		if((Math.pow(num1,3) + Math.pow(num2,3) + Math.pow(num3,3)) == i){
			str += i + ",";
		} 
	}
	console.log("for循环实现100-999之间的水仙花数有：" + str);
	str = "";
	var num = 100;
	while(num < 1000){
		var num1 = parseInt(num / 100);//获取百分位上的数字，198-1
		var data = num % 100;//获取十位数和个位数，198-98
		var num2 = parseInt(data / 10);//获取十分位上的数字，98-9
		var num3 = data % 10;//获取个位上的数字，98-8
		if((Math.pow(num1,3) + Math.pow(num2,3) + Math.pow(num3,3)) == num){
			str += num + ",";
		}
		num ++;
	}
	console.log("while循环实现100-999之间的水仙花数有：" + str);
	str = "";
	num = 100;
	do{
		var num1 = parseInt(num / 100);//获取百分位上的数字，198-1
		var data = num % 100;//获取十位数和个位数，198-98
		var num2 = parseInt(data / 10);//获取十分位上的数字，98-9
		var num3 = data % 10;//获取个位上的数字，98-8
		if((Math.pow(num1,3) + Math.pow(num2,3) + Math.pow(num3,3)) == num){
			str += num + ",";
		}
		num ++;
	}while(num < 1000);
	console.log("do..while循环实现100-999之间的水仙花数有：" + str);
}