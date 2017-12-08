$(function () {
	$('.time').html("上一次保存的时间为："+(localStorage.getItem('saveTime')||"no record"))
	console.log(dataJson)
	// 设置默认参数（10个）
	var startArr=[];xx=0;yy=0;
	for (var i = 0; i < 10; i++) {
		var obj={x:xx,y:yy,w:4,h:3};
		startArr.push(obj);
		xx+=4;if(xx>=12){xx=0;yy+=3}
	};
	startArr.push('END');//最后有一个隐藏的方框
	
	// 如果本地储存存在就使用记录，若无则用startArr
	var pp=JSON.parse(localStorage.getItem('positionData'))||startArr;
	console.log(pp);
	// 最后有一个多余的 
	var count=pp.length-1;
	// 渲染dom结构位置大小
	for (var i = 0; i < dataJson.arr.length; i++) {
		// console.log(pp[i].x,pp[i].y)
		$('<div class="grid-stack-item" data-gs-x='+pp[i].x+' data-gs-y='+pp[i].y+' data-gs-width='+pp[i].w+' data-gs-height='+pp[i].h+' data-gs-min-width=3 data-gs-min-height=2><div class="grid-stack-item-content">'+'</div></div>').appendTo($('.grid-stack'));
	};
	// 渲染具体类型内容
	$('.grid-stack-item-content').each(function(idx,ele){
		// $('<div class="chart-head">').appendTo($(this));
		// $('<div class="chart">').addClass(data[idx].type).appendTo($(this));
		$('<div class="chart">').attr('id',dataJson.arr[idx].type+idx).appendTo($(this));
		//写数据
		render($(this).children('.chart'),dataJson.arr[idx]);
		// --------------------------------
		var $selectBox=$('<div class="selectBox">')
		// 渲染下拉类型选项
		var $selectType=$('<select class="selectType">').appendTo($selectBox);
		for (var i = 0; i < arrType.length; i++) {
			$('<option>').attr('value',arrType[i]).html(arrType[i]).appendTo($selectType)
		};
		// 渲染下拉时间选项
		var $selectTime=$('<select class="selectTime">').appendTo($selectBox);
		for (var i = 0; i < arrTime.length; i++) {
			$('<option>').attr('value',arrTime[i]).html(arrTime[i]).appendTo($selectTime)
		};
		$selectBox.appendTo($(this))
	})
	// 改变视图类型
	$('.selectType').change(function(){
		var selectIdx=$(this).parent().parent().parent('.grid-stack-item').index();
		$(this).parent().parent().children();
		dataJson.arr[selectIdx].type=$(this).val();
		render($(this).parent().siblings('.chart'),dataJson.arr[selectIdx]);		
	})
	// 改变刷新时间
	$('.selectTime').change(function(){
		var selectIdx=$(this).parent().parent().parent('.grid-stack-item').index();
		var $chart=$(this).parent().siblings('.chart');
		var chart=$chart.highcharts();
		
		console.log(dataJson.arr[selectIdx].data.y[0])
		// render($chart,dataJson.arr[selectIdx]);
		// setInterval(function(){
		// // 	render($chart,dataJson.arr[selectIdx]);
		// 	chart.series[0].setData(dataJson.arr[selectIdx].data.y[0]);
		// 	chart.series[1].setData(dataJson.arr[selectIdx].data.y[1]);
		// 	console.log(2)
		// },parseInt($(this).val())*1000);
		
	})

	//设置布局插件参数 
	var options = {
		animate:false,
	    cell_height: 100,
	    width:12,
	    vertical_margin: 20,
	    always_show_resize_handle:true,
	};
	$('.grid-stack').gridstack(options);
	

	// 保存位置信息
	$('#save').click(function(){
		var position=[];
	    $('.grid-stack-item').each(function(idx,ele){
	    	var obj={
	    		x:ele.dataset.gsX,
	    		y:ele.dataset.gsY,
	    		w:ele.dataset.gsWidth,
	    		h:ele.dataset.gsHeight
	    	}
	    	position.push(obj);
	    })
	    console.log(position)
	    localStorage.setItem("positionData",JSON.stringify(position));
	    localStorage.setItem("saveTime",new Date())
	    // console.log(JSON.parse(localStorage.getItem('positionData')))
	})
	// 删除位置信息
	$('#delete').click(function(){
		localStorage.clear('positionData')
	})
	$('#add').click(function(){
			$('<div class="grid-stack-item" data-gs-x='+0+' data-gs-y='+9+'  data-gs-width='+4+' data-gs-height='+2+' data-gs-min-width=3 data-gs-min-height=2><div class="grid-stack-item-content">'+"ashfkshdk"+'</div></div>').appendTo($('.grid-stack'));
	})
	// 触发调整窗口事件
	// $(window).resize(function(){
	// 	resizeChart();
	// })
	resizeChart();
});
	
	var arrType=["pie","line","column","bar","table"];
	var arrTime=[0,3,30,60];
	function render($div,obj){
		console.log('rendering+1')
		// console.log(obj.type)
		if(obj.type=='pie'||obj.type=='bar'||obj.type=='column'||obj.type=='line'){
			$div.highcharts({
				// 参数范围------------------
				chart: { 
					type: obj.type,
					backgroundColor: 'rgba(0,0,0,0)',
					animation:true
				},
				
				series:obj.data.y,// [{data: [29.9, 71.5, 106.4]}],
		        xAxis: {
		            categories: obj.data.x,
		            labels: {
		                //staggerLines: 2,//分两行显示
		                rotation: 0,//旋转90度
		                //step:2,//省略式显示
		                style: {color: 'red' },
		                lineColor:'#000',//轴颜色
		                lineWidth: 10,
		                maxPadding: 0.01,
		            }
		        },
		        yAxis: {
		           // alternateGridColor: '#FDFFD5',//隔行显色
		            //ceiling: 10,//最大
		            gridLineColor: '#2ac7d8',//网格线颜色
		            gridLineWidth: 2,//网格线宽度
		            gridZIndex: 1,//网线Z深度
		            opposite:false,//y轴在右侧
		            //showFirstLabel: false,//不显示第一个标签 
		        },
		        //浮标
		        tooltip: {
		        	animation:false,
		            backgroundColor: '#000',
		            borderColor: '#2ac7d8',
		            borderRadius:2,
		            borderWidth:1,
		            crosshairs: [true, true],//基线
		            enabled:true,
		            hideDelay:1000,//延迟消失
		            //positioner: function () {
		                //return { x: 80, y: 50 };
		            //},//固定
		            shadow: true,
		            style:{
						color: '#fff',
						fontSize: '12px',
						padding: '8px'
					}
		        },
		        //标识信息
		        legend: {
		        	x:0,
		        	y:0,
		        	rtl: false,//左右？
		        	symbolHeight:10,//图标大小
		        	symbolWidth: 10,//图宽
		        	symbolPadding: 1,//图字间距
		            align: 'center',
		            verticalAlign: 'bottom',
		            //backgroundColor:'#06151A',
		            borderColor:"#2ac7d8",
		            //borderWidth:"1",
		            borderRadius:'3px',
		            enabled:true,//是否显示
		            floating:true,//可以重叠
		            //width: 200,//每一项宽度
		            layout: 'horizontal',//垂直还是水平排列 horizontal
		            itemDistance: 10,//间距
		            padding: 2,
		            itemMarginBottom: 0,//下编剧
		            itemHoverStyle: {color: '#FFf'},//鼠标悬浮颜色
		            itemStyle: { cursor: 'pointer', color: '#3E576F',fontWeight:'normal',color:'#bbb'},//默认样式
		            //maxHeight:50,
		            navigation: {  //箭头
		                activeColor: '#3E576F',
		                animation: true,
		                arrowSize: 6,
		                inactiveColor: '#CCC',
		                style: {
		                    fontWeight: 'bold',
		                    color: '#333',
		                    fontSize: '9px'
		                }
		            },
		        },
		        plotOptions: {
		        	pie: {
		                //cursor: 'pointer',
		                dataLabels: {
		                    enabled: false,
		                    connectorColor: 'silver'
		                },
		                showInLegend: true
		            },
		            series:{
		            	borderWidth: 0.5,
		            	borderColor:'#2ac7d8',
		            	shadow: true,
		            }
		        },
		        title: { text: ''},
		        credits: { enabled:false}, 
		        // 参数范围-------------------
			})
		}else if(obj.type=='table'){
			var $table=$('<table class="table table-hover table-striped table-bordered table-responsive">');
			// 表头
			$trH=$('<tr>'); 
			for(var key in obj.data.y[0]){
				$('<td>').html(key).appendTo($trH)
			}
			$trH.appendTo($table);
			//表内容
			for (var i = 0; i < obj.data.y.length; i++) {
				$tr=$('<tr>');
				for(var key in obj.data.y[i]){
					$('<td>').html(obj.data.y[i][key]).appendTo($tr)
				}
				$tr.appendTo($table)
			};
			$table.appendTo($div);
			$div.css('overflow','auto')
		} 
			
	}
	function resizeChart(){
		$('.chart').each(function(){
			if($(this).highcharts()){
				$(this).highcharts().reflow();
			}
			
		})
	}