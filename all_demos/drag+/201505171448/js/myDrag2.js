
$(window).resize(function(){
	$('.pie_chart').each(function(idx,ele){
		// $(this).highcharts().reflow()
	})
})
//业务视图 监测器状态 设备状态 CPU  内存 磁盘 综述
//'business','monitor','device','cpu','memory','disk','overview'
// 默认布局数据 取出的layout
var layout=[
	{
		"custom": false,
		"type": "overview",
		"time": "10",
		"scale": {
			"width": 12,
			"height": 1,
			"x": 0,
			"y": 0
		}
	}, {
		"custom": false,
		"type": "business",
		"time": "60",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 0,
			"y": 1
		}
	}, {
		"custom": false,
		"type": "monitor",
		"time": "10",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 4,
			"y": 1
		}
	}, {
		"custom": false,
		"type": "device",
		"time": "30",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 8,
			"y": 1
		}
	}, {
		"custom": false,
		"type": "cpu",
		"time": "30",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 0,
			"y": 4
		}
	}, {
		"custom": false,
		"type": "memory",
		"time": "30",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 4,
			"y": 4
		}
	}, {
		"custom": false,
		"type": "disk",
		"time": "30",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 8,
			"y": 4
		}
	}, {
		"custom": true,
		"type": "alarm",
		"title": "告警视图",
		"data": "data1",
		"func": "func2",
		"time": "10",
		"scale": {
			"width": 6,
			"height": 3,
			"x": 0,
			"y": 7
		}
	}, {
		"custom": true,
		"type": "topo",
		"title": "拓扑视图",
		"data": "data2",
		"func": "func1",
		"time": "30",
		"scale": {
			"width": 6,
			"height": 3,
			"x": 6,
			"y": 7
		}
	}
]
//定时器(刷新)
var t_overview,t_business,t_monitor,t_device,t_cpu,t_memory,t_disk,t_alarm,t_topo;

//渲染结构###########################################################################
$(function () {
	buildLayout(layout);
});
//主函数
function buildLayout(layout){
	$('.grid-stack').remove();
	$('<div class="grid-stack"></div>').appendTo('.grid-wrap');
	$.each(layout,function(idx,item){
		var isScroll=(item.type=="business"||item.type=="alarm")?"scroll":"";
		if(item.type=='overview'){
			var innerHTML='<div class="box box-default" id="'+item.type+'"></div>';
			var $dom=$('<div class="grid-stack-item" data-custom="'+item.custom+'" data-type="'+item.type+'" data-gs-x='+item.scale.x+' data-gs-y='+item.scale.y+' data-gs-width='+item.scale.width+' data-gs-height='+item.scale.height+' data-gs-min-width=8 data-gs-min-height=1 data-gs-max-height=1>'+
							'<div class="grid-stack-item-content">'+innerHTML+'</div>'+
						'</div>');
		}else{
			var innerHTML=  '<div class="box box-default">'+
							'<div class="box-header with-border">'+
								'<h2 class="box-title"><i class="fa fa-cog"></i> '+item+'</h2>'+
							'</div>'+
							'<div class="box-body '+isScroll+'" id="'+item.type+'"></div>'+
						'</div>';
			var minx=4;if(item.type=="alarm"){minx=6}
			var $dom=$('<div class="grid-stack-item" data-custom="'+item.custom+'" data-type="'+item.type+'" data-gs-x='+item.scale.x+' data-gs-y='+item.scale.y+' data-gs-width='+item.scale.width+' data-gs-height='+item.scale.height+' data-gs-min-width='+minx+' data-gs-min-height=3>'+
						'<div class="grid-stack-item-content">'+innerHTML+'</div>'+
					'</div>');
		}
		$dom.appendTo($('.grid-stack'));
		// 填充内容和数据
		render(item);
	});

	//设置布局插件参数 
	var options = {
		float: false, //这才是浮动
		animate: true,
		cell_height: 100,
		width: 12,
		vertical_margin: 10,
		always_show_resize_handle: false
	};
	$('.grid-stack').gridstack(options);
	resizeChart()
}

//根据模块类型选择不同的函数填充内容
function render(obj){
	switch (obj.type){
		case 'overview': overview(obj); break;
		case 'business': business(obj); break;
		case 'monitor': monitor(obj); break;
		case 'device': device(obj); break;
		case 'cpu': //cpu/memory/disk共用topN()
		case 'memory':
		case 'disk': topN(obj); break;
		case 'alarm': alarm(obj); break;
		case 'topo': topo(obj); break;
		default:break;
	}
}
// 顶部4块综述 overview
function overview(obj){
	var data=[
		{name:'SLA',icon:'dashboard',total:32,abnormal:2,color:66},
		{name:'业务可用率',icon:'cog',total:12,abnormal:4,color:88},
		{name:'设备',icon:'laptop',total:37,abnormal:5,color:99},
		{name:'监测器',icon:'stethoscope',total:973,abnormal:7,color:99}
	];
	var html='';
	$.each(data,function(idx,item){
		var color;
		switch (item.color){
			case 99:color='#b94a48';break;
			case 88:color='#fa9300';break;
			case 77:color='#C5842B';break;
			case 66:color='#cccc00';break;
			default:break;
		}
		html+=  '<div class="info-block2" onclick="">'+
					'<span class="alarm" style="background-color:'+color+'!important">'+item.abnormal+'</span>'+
					'<dl>'+
						'<dt>8</dt>'+
						'<dd><i class="fa fa-'+item.icon+'"></i>&nbsp;<span>'+item.name+'</span></dd>'+
					'</dl>'+
				'</div>';
	});
	$('#'+obj.type+'').html(html);
	// 刷新
	clearInterval(t_overview);
	t_overview=setTimeout(function(){
		overview(obj)
	},obj.time*1000)
}

// 业务视图 business
function business(obj){
	title(obj.type,'业务视图');
	//模拟数据
	var data=[
		{name:'ACRM业务系统',percentage:89},
		{name:'BCRM业务系统',percentage:100},
		{name:'CCRM业务系统',percentage:35},
		{name:'DCRM业务系统',percentage:77},
		{name:'ECRM业务系统',percentage:97},
		{name:'FCRM业务系统',percentage:85},
		{name:'GCRM业务系统',percentage:98},
		{name:'HCRM业务系统',percentage:69},
		{name:'ICRM业务系统',percentage:79},
	]
	var html='';
	$.each(data,function(idx,item){
		html+='<div class="col-md-6">'+
					'<div class="progress-group">'+
						'<span class="progress-text">'+item.name+'</span> <span class="progress-number">'+item.percentage+'%</span>'+
						'<div class="progress sm">'+
							'<div class="progress-bar progress-bar-aqua progress-bar-striped" style="width: '+item.percentage+'%;cursor: pointer;" onclick=""></div>'+
						'</div>'+
					'</div>'+
				'</div>';
	});
	$('#'+obj.type+'').html(html);
	clearInterval(t_business);
	setTimeout(function(){
		business(obj)
	},obj.time*1000)
}

// 监测器状态 monitor
function monitor(obj){
	title(obj.type,'监测器状态');
	var data=[
       ['警告', 2],
       ['正常',  45],
       ['主要',  4],
       ['次要', 0],
       ['紧急',  5]
    ];
    // highchart渐变设置
	Highcharts.setOptions({
        colors: ['#cdcd00','#468847','#a16611','#FA9300','#b94a48'] //设置part颜色
    });
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: { cx: 0.7, cy: 0.7, r: 0.5 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.1).get('rgb')] // darken
            ]
        };
    });
	$('#'+obj.type+'').highcharts({
		chart: {
			margin:[20,0,20,60],
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		//警告 正常 主要 次要 紧急
		// colors:['#cdcd00','#468847','#a16611','#FA9300','#b94a48'],
		title:false,
		tooltip: {
			pointFormat: '<b>数量:{point.y}  比例:{point.percentage:.1f}</b>%'
		},
		legend: {
			enabled:true,
			x:10,
			layout: 'vertical',
	        align: 'left',
	        verticalAlign: 'bottom',
	        borderRadius:'0px',
        	symbolPadding: 10,//图字间距
	        itemStyle:{
	        	fontSize:'12px',
	        	color:'#444'
	        },
	        itemHoverStyle:{
	        	color:'#3C8DBC'
	        },
	        // useHTML:true,
			labelFormatter:function(){
				return this.name+': '+this.y
			}
		},
		plotOptions: {
			series:{
				borderWidth: 1,
            	borderColor:'rgba(255,255,255,0.5)',
            	shadow: true,
			},
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
			    events: {  
		                click: function() {  
		                	stop_refresh();
		                    $('#appmain').html(null);             
		                    $('#appmain').show();
		                	var url="showallmonitor.action";
		                	$('#appmain').load(url,function(response,status,xhr){
		                	     $('#appmain').html(response);
		                	 });
		                }  
		        },  
		        showInLegend:true,
		         dataLabels: {
		        	 enabled: true,
		        	 // connectorColor:'{point.color}',//'rgba(0,0,0,0.5)',//线的颜色
		        	 fontSize: 18,
		        	 format: '<span style="color:#555; font-size:12px"><b>{point.name}</b>: {point.percentage:.1f}% </span>',
		        	 useHTML:true,
		        	 softConnector:false,
		        	 connectorPadding: 5,
					connectorWidth: 1,
					connectorLen: 1,
					distance: 40,
					shadow:true
		         },
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			type: 'pie',
			// innerSize: '70%',
			data: data
		}]
	});
	//刷新
	clearInterval(t_monitor);
	t_monitor=setTimeout(function(){
		monitor(obj)
	},obj.time*1000)
}

// 设备状态 device
function device(obj){
	title(obj.type,'设备状态');
	//模拟数据
	var data=[
		{name:'虚拟化平台',normal:12,abnormal:3},
		{name:'网络设备',normal:132,abnormal:43},
		{name:'网络设备',normal:12,abnormal:13},
		{name:'虚拟化平台',normal:212,abnormal:33},
		{name:'虚拟化平台',normal:112,abnormal:34},
		{name:'网络设备',normal:132,abnormal:31}
	]
	// 轮播html结构
	var mainHtml='<div id="myCarousel" class="carousel slide" style="height:100%">'+
				'<ol class="carousel-indicators"></ol>'+
				'<div class="carousel-inner" style="height:100%">'+
			    '</div>'+
			'</div>'
	$('#'+obj.type+'').html(mainHtml);

	var html="";
	var html2="";
	$('#myCarousel .carousel-inner').html(html);
	$('#myCarousel .carousel-indicators').html(html2)

	html='<div class="item active">';
	html2='<li class="active" data-target="#myCarousel" data-slide-to="' + 0 + '"></li>'
	for(var i=0; i<data.length; i++){
		if(i!=0 && i%2==0){
			html+='</div><div class="item">';
			html2+='<li data-target="#myCarousel" data-slide-to="' + i/2 + '"></li>';
		}
		html+='<div class="col-sm-6 pie_chart"></div>';
	}
	html+='</div>';
	
	$('#myCarousel .carousel-inner').html(html);
	$('#myCarousel .carousel-indicators').html(html2)
	$('#myCarousel .pie_chart').each(function(idx,ele){
		devicePie($(ele),data[idx])
	});
	if($('#myCarousel .item').length<=1){
		$('#myCarousel .carousel-indicators').hide()
	}
	$('#myCarousel').carousel({
		interval: 50000
	});
	setTimeout(function(){
		$(window).trigger('resize')
	},200)
	
	// 调整饼图自适应(未轮播导致)
	// $('#myCarousel').find('.item>div').each(function(idx,ele){
	// 	$(this).highcharts().reflow();
	// });
	var count=0;
	var itemNum=$('#myCarousel').find('.item').length;
	$('#myCarousel').on('slide.bs.carousel', function(event) {
		count++;
		if (count < itemNum) {
			var $items = $(event.relatedTarget);
			setTimeout(function() {
				$items.children('div').each(function(){
					$(this).highcharts().reflow();
				})
			}, 10);
		}
	});
	clearInterval(t_device);
	t_device=setTimeout(function(){
		device(obj)
	},obj.time*1000)
}
function devicePie($dom,data){
	Highcharts.setOptions({
        colors: ['#468847','#B94A48'] //设置part颜色
    });
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: { cx: 0.7, cy: 0.7, r: 0.5 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.1).get('rgb')] // darken
            ]
        };
    });
	$dom.highcharts({
		chart: {
			margin: [70, 10, 70, 10],
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: data.name,
			floating:true,
			y:40,
			style:{
				fontSize:'14px',
			}
		},
		tooltip: {
			pointFormat: '<b>数量:{point.y}  比例:{point.percentage:.1f}</b>%'
		},
		credits: {
			enabled: false
		},
		legend: {
			y:-20,
			itemStyle:{
	        	fontSize:'12px',
	        	color:'#444'
	        },
	        itemHoverStyle:{
	        	color:'#3C8DBC'
	        },
			labelFormatter:function(){
				return this.name+':'+this.y
			}
		},
		plotOptions: {
			series:{
				borderWidth: 1,
            	borderColor:'rgba(255,255,255,0.5)',
            	shadow: true,
			},
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
		        	enabled: false,
		        	 // connectorColor:'{point.color}',//'rgba(0,0,0,0.5)',//线的颜色
		        	fontSize: 18,
		        	format: '<span style="color:#555; font-size:12px"><b>{point.name}</b>: {point.percentage:.1f}% </span>',
		        	useHTML:true,
		        	softConnector:false,
		        	connectorPadding: 5,
					connectorWidth: 1,
					connectorLen: 1,
					distance: 20,
					shadow:true
		        },
				showInLegend: true
			}
		},
		// colors:['#468847','#B94A48'],
		series: [{
			type: 'pie',
			name: false,
			innerSize:'60%',
			data: [
			       ['正常', parseInt(data.normal),{sliced:true}],
			       // ['异常', parseInt(data.abnormal)];
			       {
				       	name:'异常',
				       	y:parseInt(data.abnormal),
				       	sliced:false,
				       	selected:true
			       }
			    ]
		}]
	},function(c) {
        // 环形图圆心
        // var centerY = c.series[0].center[1],
        //     titleHeight = parseInt(c.title.styles.fontSize);
        // c.setTitle({
        //     y:centerY + titleHeight/2
        // });
        // chart = c;
        // this.reflow()
    });
	
}

// topN  cpu/内存/磁盘
function topN(obj){
	title(obj.type,obj.type+' TopN');
	// 模拟数据
	var data={
		name:obj.type,
		x:["liuquan-PC:", "PC-201705111113:", "WIN2008-sybase2:", "DESKTOP-A244JG0:", "WIN-ME6FVAS3LQP:", "PC-201705111113:"],
		y:[65,43,89,56,77,43]
	}

	var $tools=$('<div class="box-tools pull-right"></div>').html('<button class="btn btn-box-tool" onclick=""><i class="fa fa-wrench"></i> 自定义</button>');
	$tools.appendTo($('#'+obj.type+'').prev('.box-header'));

	$('#'+obj.type+'').highcharts({
		chart: {
			type: 'column',
			marginBottom:100
		},
		title: false,
		subtitle:false,
		credits: {
			enabled: false
		},
		xAxis: {
			categories: data.x,
			label:{
				style:{
					fontSize:'10px'
				}
			}
		},
		yAxis: {
			min: 0,
			title: false
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			'<td style="padding:0"><b>{point.y:.1f}'+'%'+'</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		legend:{
			verticalAlign:'top',
			align:'left',
			y:-10
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					// color: '#525252',
					style: {
						fontWeight: 'normal',

					},
					formatter: function() {
						return this.y +''+'%';
					}
				}
			}
		},
		series: [{
			color: '#3C8DBC',
			name: data.name,
			data: data.y

		}]
	});
	clearInterval(window['t_'+obj.type]);
	window['t_'+obj.type]=setTimeout(function(){
		topN(obj)
	},obj.time*1000)
}

// alarm 告警列表
function alarm(obj){
	title(obj.type,'告警列表');
	var html='';
	var data=[1,1,1,1,1,1,1,1,1,1];
	$.each(data,function(idx,item){
		html+=  '<tr>'+
					'<td><span class="badge bg-warning">警告</span></td>'+
					'<td>192.168.2.183</td>'+
					'<td>liuquan-PC</td>'+
					'<td>Ping</td>'+
					'<td>Ping 192.168.2.183:Time Out : 5 seconds!</td>'+
					'<td>2017-11-01 09:55:08</td>'+
					'<td>2017-11-01 09:55:09</td>'+
					'<td>1</td>'+
					'<td>auto</td>'+
				'</tr>'
	});
	var tableHtml='<table id="table_alarm" class="table table-bordered table-hover table-responsive">'+
					'<thead>'+
						'<tr>'+
							'<th>级别</th>'+
							'<th>IP</th>'+
							'<th>对象</th>'+
							'<th>监测器类型</th>'+
							'<th>告警内容</th>'+
							'<th>起始时间</th>'+
							'<th>确认时间</th>'+
							'<th>次数</th>'+
							'<th>确认人</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>'+html+'</tbody>'+
				'</table>';
	$('#'+obj.type+'').html(tableHtml);
	$('#'+obj.type+'').niceScroll({
	    cursorcolor: "#ccc",//#CC0071 光标颜色
	    cursoropacitymax: 0.5, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
	    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
	    cursorwidth: "5px", //像素光标的宽度
	    cursorborder: "0", // 游标边框css定义
	    cursorborderradius: "5px",//以像素为光标边界半径
	    autohidemode: true //是否隐藏滚动条
	});
	cutTable($('#table_alarm'),[3,6,7,8]);
	//刷新
	clearInterval(t_alarm);
	t_alarm=setTimeout(function(){
		alarm(obj)
	},obj.time*1000)
}
// 砍列
function cutTable($table,arr){
	for (var i = 0; i < arr.length; i++) {
		$table.find('thead th').eq(arr[i]).hide();
		$table.find('tbody tr').each(function(idx,ele){
			$(ele).find('td').eq(arr[i]).hide()
		})
	};
}

function topo(obj){
	title(obj.type,'拓扑视图');
	$('#'+obj.type+'').html('<div id="mynetwork" style="height:270px;"></div>');
	var nodeSet = new vis.DataSet([
	    {id: 1, label: 'Node 1'},
	    {id: 2, label: 'Node 2'},
	    {id: 3, label: 'Node 3'},
	    {id: 4, label: 'Node 4'},
	    {id: 5, label: 'Node 5'},
    ]);
    var edgeSet = new vis.DataSet([
	    {from: 1, to: 3, label:"连接1"},
	    {from: 1, to: 2, label:"连接2"},
	    {from: 2, to: 4, label:"连接3"},
	    {from: 2, to: 5, label:"连接4"},
	    {from: 3, to: 5, label:"连接5"},
	    // {from: 1, to: 4, label:"连接6"}
    ]);
	// 创建一个网络
	var container = document.getElementById('mynetwork');
	// vis数据
	var data = {
		nodes: nodeSet,
		edges: edgeSet
	};
	var options = {
		nodes: {
			size: 18,
			font: {
				size: 14
			},
			shadow: {
				enabled: true,
				color: 'rgba(0,0,0,0.5)',
				size: 3,
				x: 2,
				y: 2
			}
		},
		edges: {
			width: 0.5,
			// chosen: true
		},
		"physics": {
			"forceAtlas2Based": {
				"springLength": 100
			},
			"minVelocity": 0.75,
			"solver": "forceAtlas2Based"
		},
		interaction: {
			// hover: true
		}
	};

	// 初始化网络
	network = new vis.Network(container, data, options);
	$('#mynetwork').css('height','100%');
	//刷新
	clearInterval(t_topo);
	t_topo=setTimeout(function(){
		topo(obj)
	},obj.time*1000)

}

//图表大小调整适应
function resizeChart(){
	$('.box-body').each(function(){
		if($(this).highcharts()){
			$(this).highcharts().reflow();
		}
		
	})
}

//模块标题
function title(type,str){
	$('#'+type+'').parents('.box').find('.box-title').html(str);
	//
}


//设置弹窗###########################################################################
$(function(){
	//弹窗中删除
	$('#block_normal,#block_custom').on('click','.deleteTr',function() {
		$(this).parents('tr').remove();
	});
})

//打开弹窗
function modalOpen(){
	$('#modal-layout').modal('show');
	resetSetting(layout2);
}

//弹窗中新增
function addRow(tableID){
	// 刷新时间
	var arr_time=[['10','10s'],['30','30s'],['60','1min'],['300','5min']];
	// 块
	var arr_normal=[['',''],['business','业务视图'],['monitor','监测器状态'],['device','设备状态'],['cpu','CPU TopN'],['memory','内存 TopN'],['disk','磁盘 TopN'],['overview','综述']];
	// 自定义块
	var arr_custom=[['',''],['alarm','告警视图'],['topo','拓扑视图']];
	// 数据域
	var arr_data=[['data1','数据域1'],['data2','数据域2']];
	// 功能域
	var arr_func=[['func1','功能域1'],['func2','功能域2']];
	

	var $tr=$('<tr></tr>');
	if(tableID=='block_normal'){
		if ($('#'+tableID+'>tbody tr').length>=arr_normal.length-1) { 
			alert('超出类型数量上限');return;
		};
		var html=
			'<td><select class="form-control input-sm" name="select_normal">'+makeOptions(arr_normal)+'</select></td>'+
			'<td><select class="form-control input-sm" name="select_time">'+makeOptions(arr_time)+'</select></td>'+
			'<td><span class="deleteTr" title="删除"><i class="fa fa-trash-o fa-lg"></i></span></td>';
	}else{
		if ($('#'+tableID+'>tbody tr').length>=arr_custom.length-1) { 
			alert('超出类型数量上限');return;
		};
		var html=
			'<td><select class="form-control input-sm" name="select_custom">'+makeOptions(arr_custom)+'</select></td>'+
			'<td><input type="text" class="form-control input-sm" name="input_title" style="width:100px"/></td>'+
			'<td><select class="form-control input-sm" name="select_data">'+makeOptions(arr_data)+'</select></td>'+
			'<td><select class="form-control input-sm" name="select_func">'+makeOptions(arr_func)+'</select></td>'+
			'<td><select class="form-control input-sm" name="select_time">'+makeOptions(arr_time)+'</select></td>'+
			'<td><span class="deleteTr" title="删除"><i class="fa fa-trash-o fa-lg"></i></span></td>';
	}
	$tr.html(html);
	$tr.appendTo($('#'+tableID+' tbody'));
	return $tr;
}
//下拉选项html拼凑
function makeOptions(arr){
	var html='';
	for (var i = 0; i < arr.length; i++) {
		html+='<option value="'+arr[i][0]+'">'+arr[i][1]+'</option>';
	}
	return html;
}

//保存弹窗所有设置的对象
var layout2=[];
layout2=layout;
// 保存弹窗所有设置
function saveSetting(){
	layout2=[];

	//验证是否为空
	var flag=true;
	$('#modal-layout table input,#modal-layout table select').each(function(){
		if($(this).val()==''){flag=false;}
	});
	if(!flag){ alert('值不能为空'); return;}

	//设置坐标
	var x=0,y=0,width=4,height=3;
	// 常用模块保存
	$('#block_normal tbody tr').each(function(){
		var type=$(this).find('select[name=select_normal]').val();
		var time=$(this).find('select[name=select_time]').val();
		
		if (type=='overview'){ width=12; height=1;}else{ width=4; height=3;}
		layout2.push({
			custom:false,
			type:type,
			scale:{
				width:width,
				height:height,
				x:x,
				y:y,
			},
			time:time
		});
		x+=width;
		if(x>=12){
			x=0;
			y+=height;
		}
	});
	// 自定义模块保存
	$('#block_custom tbody tr').each(function(){
		var type=$(this).find('select[name=select_custom]').val();
		var time=$(this).find('select[name=select_time]').val();
		var title=$(this).find('input[name=input_title]').val();
		var data=$(this).find('select[name=select_data]').val();
		var func=$(this).find('select[name=select_func]').val();
		if(type=='alarm'){ width=8; height=3;}else{ width=4; height=3;}
		layout2.push({
			custom:true,
			type:type,
			title:title,
			data:data,
			func:func,
			scale:{
				width:width,
				height:height,
				x:x,
				y:y
			},
			time:time
		});
		x+=width;
		if(x>=12){
			x=0;
			y+=height;
		}
	});
	//弹窗消失
	$('#modal-layout').modal('hide');
	buildLayout(layout2);
	console.log(JSON.stringify(layout2))
}
// 重置为已保存的数据
function resetSetting(layout){
	$('#modal-layout table>tbody').html('');
	$('#modal-layout .nav').children('li:first').addClass('active').siblings('li').removeClass('active');
	$('#modal-layout .tab-content').children('.tab-pane:first').addClass('active').siblings('.tab-pane').removeClass('active');
	$.each(layout,function(idx,item){
		if (!item.custom) {
			var $tr=addRow('block_normal');
			$tr.find('[name=select_normal]').val(item.type);
			$tr.find('[name=select_time]').val(item.time);
		} else{
			var $tr=addRow('block_custom');
			$tr.find('[name=select_custom]').val(item.type);
			$tr.find('[name=input_title]').val(item.title);
			$tr.find('[name=select_data]').val(item.data);
			$tr.find('[name=select_func]').val(item.func);
			$tr.find('[name=select_time]').val(item.time);
		};
	})
}



//保存拖拽后的布局########################################################
var layout3=[];
function saveLayout(){
	$.each(layout2,function(idx,item){
		var $dom=$('#'+item.type+'').parents('.grid-stack-item');
		if(!item.custom){
			layout3.push({
				"custom":item.custom,
				"type": item.type,
				"time": item.time,
				"scale": {
					"width": $dom.data('gs-width'),
					"height": $dom.data('gs-height'),
					"x": $dom.data('gs-x'),
					"y": $dom.data('gs-y'),
				}
			})
		}else{
			layout3.push({
				"custom":item.custom,
				"type": item.type,
				"title": item.title,
				"data": item.data,
				"func": item.func,
				"time": item.time,
				"scale": {
					"width": $dom.data('gs-width'),
					"height": $dom.data('gs-height'),
					"x": $dom.data('gs-x'),
					"y": $dom.data('gs-y'),
				}
			})
		}
	});

	alert('Layout saves success')
	console.log(JSON.stringify(layout3))
}



