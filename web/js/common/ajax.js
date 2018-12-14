// JavaScript Document
function ajax(url,fnSuccess,fnerror,index)
{
 
	   var oajax=null;
	  //创建 - 非IE6 - 第一步
 		if (window.XMLHttpRequest) 
		 {
			oajax = new XMLHttpRequest();
		  }
		  else {
	   //IE6及其以下版本浏览器
	   oajax = new ActiveXObject('Microsoft.XMLHTTP'); 
		
	   }
	   
	   //2. 连接服务器  open(方法 ， url,是否异步）
	   //什么是同步什么是异步 同步：CCTV随着GDP的增长，人民生活水平同步提高，多件事情一起   在JS中 一件件来
       //                 异步：一件一件做                                        在JS中 多件事可以一起
	   // 例子：新浪微博 是异步 网络不好，一个圈在转，这个时候你可以继续看其他新闻 如果是同步的话，瞬间整个页面就卡了
	   //AJAX 本身就是异步
	   oajax.open("GET",url,true);
	   
					   
	   //3. 发送请求
	   oajax.send();
	 
	   //4.接收返回
	   //window.onload是页面加载完 onreadystatechange 当ajax和服务器端有通讯状态变化的时候发生
	   oajax.onreadystatechange=function()
	   { 
	 
		   if(oajax.readyState==4)
		   {
			   
				  if(oajax.status==200)
				  {
					  var json = eval("(" + oajax.responseText + ")");
					  fnSuccess(json.list[index]);
			      }
				  else
				  {
					 
					  if(fnerror)
					  {
						  fnerror();
					  }
				  }
		   }
 
	   }
}
