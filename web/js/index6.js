window.onload = function (){
	var feedback = document.getElementById("msg-feedback");//意见反馈
	var name = document.getElementById("name");//姓名
	var phone = document.getElementById("phone");//手机号
	var sats = document.getElementsByName("satisfied");//满意度
	var submit = document.getElementById("submit");//提交
	submit.onclick = submitMsg;//提交点击事件
	
	/**
	 * 提交用户反馈信息
	 */
	function submitMsg(){
		if(!feedback.value){
			return alert("请输入意见反馈");
		}
		var satsValue = "";
		for(var i = 0;i < sats.length;i ++){
			var _item = sats[i];
			if(_item.checked){
				satsValue = _item.value; 
			}
		}
		if(!satsValue){
			return alert("请选择满意度");
		}
		if(!name.value){
			return alert("请输入姓名");
		}
		if(!phone.value){
			return alert("请输入手机号");
		}
	}
	var totalNum = 2;//最后鸭子总数
	countDuck(7);
	/**
	 * 数鸭子
	 */
	function countDuck(i){
		var tmpNum = totalNum;
		totalNum = (totalNum + 1) * 2;//经过每个村子的总数
		console.log("经过第" + i + "个村庄时鸭子总数为：" + totalNum + ",卖掉鸭子个数为：" + (tmpNum + 2));
		i--;
		if(i > 0){
			countDuck(i);
		}
	}
	
	
	var arr = [];
	var m = "";
	function duckNum(n,i){
		if(i <= 7){
			n = (n + 1) * 2;
			i ++;
			arr.push(n/2 + 1);
			console.log(arr[i-2] + "," + n);
			return duckNum(n,i);
		}
	}
	duckNum(2,1);
}
