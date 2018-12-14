$(document).ready(function(){
	/*
	 * 给输入控件加上获取焦点事件
	 */
	$(".new-text").focus(function(){
		var _this = $(this);
		if(_this[0].id != "phone"){//手机号码获取焦点不显示提示信息
			_this.parent().parent().parent().find(".info").show();
		}
		_this.parent().removeClass("bg_error").addClass("bg_focus");
		if(_this[0].id == "nick"){//昵称
			$("#nick_info").removeClass().addClass("tip").text("请输入昵称");
		}
		if(_this[0].id == "pwd"){//密码
			$(".pwd-tips").show();
			$("#pwd_result").hide();
		}
		if(_this[0].id == "pwd_again"){//确认密码
			$("#pwd_again_info").removeClass().addClass("tip").text("请再次输入密码");
		}
	});
	/*
	 * 给输入控件加上失去焦点事件
	 */
	$("input").blur(function(){
		var _this = $(this);
		_this.parent().removeClass("bg_error").removeClass("bg_focus");
		if(_this[0].id == "nick"){//昵称
			if(_this.val() == ""){//为空
				_this.parent().addClass("bg_error");//增加警示
				$("#nick_info").removeClass().addClass("error").text("昵称不可以为空");
			}
			else {//不为空
				$("#nick_info").removeClass().addClass("ok").text("");
			}
		}
		if(_this[0].id == "pwd"){//密码
			if(_this.val() == ""){
				_this.parent().addClass("bg_error");//增加警示
			}
			else {
				var value = _this.val();
				if(value.length >= 6 && value.length <= 16 && value.indexOf(" ") == -1 && !/^[0-9]{0,9}$/.test(value)){//符合密码规范
					if(/^[a-z0-9]{6,16}$/.test(value)){//不包含特殊字符
						/*
						 * 纯英文字母，纯数字，英文字母和数字长度小于8为弱密码
						 */
						if(/^[a-z]{6,16}$/.test(value) || /^[0-9]{6,16}$/.test(value) || value.length < 8){//弱密码
							$("#pwd-pic").removeClass().addClass("low").text("弱");
							$("#pwd-info").text("试试字母、数字、标点的组合吧");
						}
						else {//中等密码
							$("#pwd-pic").removeClass().addClass("middle").text("中等");
							$("#pwd-info").text("复杂度还行，再加强一下等级？");
						}
					}
					else {//包含特殊字符，强密码
						$("#pwd-pic").removeClass().addClass("high").text("强");
						$("#pwd-info").text("密码强度好，请记牢！");
					}
					$(".pwd-tips").hide();
					$("#pwd_result").show();
				}
				else{
					_this.parent().addClass("bg_error");//增加警示
				}
			}
		}
		if(_this[0].id == "pwd_again"){//再次输入密码
			if(_this.val() == ""){
				_this.parent().addClass("bg_error");
				$("#pwd_again_info").removeClass().addClass("error").text("密码不一致");
			}
		}
		if(_this[0].id == "phone"){//手机号码
			var value = _this.val();
			if(value.length == 0){
				$("#phone_del").hide();
				_this.parent().parent().parent().find(".info").hide();
			}
			else if(/^[0-9]{11}$/.test(value)){//正确手机号码
				$("#phone_del").show();
				_this.parent().parent().parent().find(".info").show();
				$("#phone_info").removeClass().addClass("ok").text("");
			}
			else {
				$("#phone_del").show();
				_this.parent().parent().parent().find(".info").show();
				$("#phone_info").removeClass().addClass("error").text("请输入有效的手机号码");
			}
		}
	});
	/**
	 * 清空手机号码输入框内容
	 */
	$("#phone_del").click(function(){
		var _this = $(this);
		$("#phone").val("");
		_this.parent().parent().parent().find(".info").hide();
		_this.hide();
	});
	/*
	 * 给密码框加上输入监听事件
	 */
	$("#pwd").keyup(function(){
		var _this = $(this);
		var value = _this.val();
		if(value.length < 6 || value.length > 16){//长度小于6或者大于16
			$("#pwd_tips1").removeClass().addClass("no red");
		}
		else{
			$("#pwd_tips1").removeClass().addClass("yes");
		}
		if(value.indexOf(" ") != -1){//包含空格
			$("#pwd_tips2").removeClass().addClass("no red");
		}
		else {
			$("#pwd_tips2").removeClass().addClass("yes");
		}
		if(/^[0-9]{0,9}$/.test(value)){//0-9位纯数字
			$("#pwd_tips3").removeClass().addClass("no red");
		}
		else{
			$("#pwd_tips3").removeClass().addClass("yes");
		}
		if(value.length == 0){
			$("#pwd_tips1").removeClass().addClass("default");
			$("#pwd_tips2").removeClass().addClass("default");
			$("#pwd_tips3").removeClass().addClass("default");
		}
	});
	/*
	 * 给再次输入密码框加上输入监听事件
	 */
	$("#pwd_again").keyup(function(){
		var _this = $(this);
		var value = _this.val();
		if(value.length <= 0){//为空
			$("#pwd_again_info").removeClass().addClass("tip").text("请再次输入密码");
		}
		else if(value != $("#pwd").val()){//密码不一致
			$("#pwd_again_info").removeClass().addClass("error").text("密码不一致");
		}
		else {//密码一样
			$("#pwd_again_info").removeClass().addClass("ok").text("");
		}
	});
	/*
	 * 给手机号码输入框加上输入监听事件
	 */
	$("#phone").keyup(function(){
		var _this = $(this);
		var value = _this.val();
		if(value.length <= 0){//为空
			$("#phone_del").hide();
		}
		else{
			$("#phone_del").show();
		}
	});
	/**
	 * 性别按钮点击事件
	 */
	$(".sex-radio").click(function(){
		var _this = $(this);
		$(".sex-radio").each(function(){
			$(this).removeClass("checked").addClass("unchecked");
		});
		_this.removeClass("unchecked").addClass("checked");
	});
	/**
	 * 底部阅读点击事件
	 */
	$(".checka").click(function(){
		var _this = $(this);
		if(_this.hasClass("checked")){
			_this.removeClass("checked").addClass("unchecked");
			if(_this[0].id == "agree"){//注册按钮置灰状态
				$("#submit-btn").addClass("disabled");
			}
		}
		else {
			_this.removeClass("unchecked").addClass("checked");
			if(_this[0].id == "agree"){
				$("#submit-btn").removeClass("disabled");
			}
		}
	});
	/**
	 * 展开详细用户协议
	 */
	$("#x-switcher").click(function(){
		var _parent = $(this).parent();
		if(_parent.hasClass("show")){
			_parent.removeClass("show");
		}
		else {
			_parent.addClass("show");
		}
	});
	/**
	 * 左边（输入想要的4-10位数字）点击事件
	 */
	$("#left-num").focus(function(){
		var _this = $(this);
		var value = _this.val();
		if(value == _this[0].defaultValue){
			_this.val("");
		}
	});
	$("#left-num").blur(function(){
		var _this = $(this);
		var value = _this.val();
		if(value == ""){
			_this.val(_this[0].defaultValue);
		}
	});
});