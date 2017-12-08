//常用处理------------------------------------------------------------------
	var str="Hello World!" 
	document.write(str.indexOf("Hello"))//输出0 

	var str="Hello World!" 
	document.write(str.length);//输出12 

	var str="Hello World!" 
	document.write(str.substr(3));
	//输出lo World!，从序数为3的字符开始（包括序数为3的字符）
	document.write(str.substr(3,7));  //输出lo Worl  //起始位置（可以是负数）+ 截取长度

	var str="Hello World!" 
	document.write(str.charAt(1));//输出e 

	"|a|b|c".split("|")//将返回["", "a", "b", "c"] 
	var words = sentence.split(/\s+/)//使用正则表达式作为分割参数 
	
	Arr3.concat(arr1,arr2)//1+2补在3后面

	books.splice(idx,1)//删除指定位置元素  1为数量

//JQ处理------------------------------------------------------------------
	document.getElementsByTagName('form')
	$(‘form’).get(0);
	$(‘form)[0]
	If ( $checkBox.checked ){ }  =====  if( $(‘checkbox’).is(‘:checked’) ){}

	$(“ body  div”)里面所有  $(“ body > div”)子元素
	$(“ p + div”)紧随P后的第一个=.next()  $(“p  ~ div”) P之后所有=.nextAll()
	:not(.classname) :has(classname)  :parent=有子元素 :empty=绝种或者无文本 
	:contain(“我”)=含有”我”  :eq(3)  :animated=正在动画  :first/last  :odd/even   :hidde/visible
	$(‘div[attr]’)   $(‘div[attr=value]’)   $(‘div[attr!=value]’)  
	$(‘div[attr^=value]’)=value开头  $(‘div[attr$=value]’)=value结尾  $(‘div[attr*=value]’)=含value 
	$(“div:first/last-child”)  $(“div:nth-child(1/2/3/odd/even)”)
	$(“input:enabled/disabled/checked/selected”)

	$(‘div).offest()  / .position()  /.scrollTop()  /.scrollLeft()

//闭包------------------------------------------------------------------
	function a() { 
	 var i = 0; 
	 function b() { alert(++i); } 
	 return b;
	}
	var c = a();
	c();

//页面跳转------------------------------------------------------------------
	1.超链接<a href="http://www.jb51.net" title="脚本之家">Welcome</a>
	等效于js代码window.location.href="http://www.jb51.net";     //在同当前窗口中打开窗口
	2.超链接<a href="http://www.jb51.net" title="脚本之家" target="_blank">Welcome</a>
	等效于js代码window.open("http://www.jb51.net");                 //在另外新建窗口中打开窗口

//cookies   //chrome必须在服务器上运行-----------------------------
	//添加cookie
	function addCookie(name,value,time){ 
		var str=name+"="+escape(value); 
		var date=new Date(); 
		date.setTime(date.getTime()+time*3600*1000); 
		str=str+"; expires="+date.toGMTString()+”; path=/; “
		document.cookie=str; 
	} 
	// 获取cookie
	function getCookie(name){ 
		var str=document.cookie;
		var arrCookie=str.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name){
				return  unescape(arr[1]);
			} 
		} 
	} 
	// 删除cookie
	function deleteCookie(name){ 
		var date=new Date(); 
		date.setTime(date.getTime()-10000); 
		document.cookie=name+"=v; expires="+date.toGMTString(); 
	} 

// 短路表达式------------------------------------------------------------------
	a && b ： 将a, b转换为Boolean类型, 再执行逻辑与, true返回b, false返回a
	a || b ： 将a, b转换为Boolean类型, 再执行逻辑或, true返回a, false返回b

// 进制转化-------------------------------------------------------
	//十进制转其他  
	var x=110;  
	alert(x);  
	alert(x.toString(8));  
	alert(x.toString(32));  
	alert(x.toString(16));  
	//其他转十进制  
	var x='110';  
	alert(parseInt(x,2));  
	alert(parseInt(x,8));  
	alert(parseInt(x,16));  
	//其他转其他  
	//先用parseInt转成十进制再用toString转到目标进制  
	alert(String.fromCharCode(parseInt(141,8)))  
	alert(parseInt('ff',16).toString(2)); 
	//颜色
	'#'+parseInt(Math.random()*16777215).toString(16)+''

//document.body
	网页可见区域宽： document.body.clientWidth;
	网页可见区域高： document.body.clientHeight;
	网页可见区域宽： document.body.offsetWidth (包括边线的宽);
	网页可见区域高： document.body.offsetHeight (包括边线的宽);
	网页正文全文宽： document.body.scrollWidth;
	网页正文全文高： document.body.scrollHeight;
	网页被卷去的高： document.body.scrollTop;
	网页被卷去的左： document.body.scrollLeft;
	网页正文部分上： window.screenTop;
	网页正文部分左： window.screenLeft;
	屏幕分辨率的高： window.screen.height;
	屏幕分辨率的宽： window.screen.width;
	屏幕可用工作区高度： window.screen.availHeight;
	屏幕可用工作区宽度：window.screen.availWidth;

	scrollHeight: 获取对象的滚动高度。 
	scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
	scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
	scrollWidth:获取对象的滚动宽度
	offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
	offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
	offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
	event.clientX 相对文档的水平座标
	event.clientY 相对文档的垂直座标
	某个元素的上边界到body最顶部的距离：obj.offset().top;
    某个元素的左边界到body最左边的距离：obj.offset().left;

	document.getElementById("end").scrollIntoView();
	document.body.scrollTop=1000
	document.documentElement.scrollTop=100;
	window.scrollTo(100,500)

//event.keyCode
	左 上 右 下 
	37 38 39 40



















