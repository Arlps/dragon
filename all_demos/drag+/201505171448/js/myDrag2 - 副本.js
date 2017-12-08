
//业务视图 监测器状态 设备状态 CPU  内存 磁盘 综述
//'business','monitor','device','cpu','memory','disk','overview'
// 默认布局数据
var layout=[
	{
		"type": "overview",
		"scale": {
			"width": 12,
			"height": 1,
			"x": 0,
			"y": 0
		},
		"time": 10
	}, {
		"type": "business",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 0,
			"y": 1
		},
		"time": 10
	}, {
		"type": "monitor",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 4,
			"y": 1
		},
		"time": 10
	}, {
		"type": "device",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 8,
			"y": 1
		},
		"time": 10
	}, {
		"type": "cpu",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 0,
			"y": 4
		},
		"time": 10
	}, {
		"type": "memory",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 4,
			"y": 4
		},
		"time": 10
	}, {
		"type": "disk",
		"scale": {
			"width": 4,
			"height": 3,
			"x": 8,
			"y": 4
		},
		"time": 10
	}
]

//渲染结构事件--------------------------------------------
$(function () {
	var layoutArr = ['overview','business','monitor','device','cpu','memory','disk'];
	buildLayout(layout);
});
//煮函数
function buildLayout(layout){
	$('.grid-stack').remove();
	$('<div class="grid-stack"></div>').appendTo('.grid-wrap');
	//坐标设置
	var x=0,y=0;
	$.each(layoutArr,function(idx,item){
		if(item=='overview'){
			var innerHTML='<div class="box box-default" id="'+item+'"></div>';
			var $dom=$('<div class="grid-stack-item" data-type="'+item+'" data-gs-x='+x+' data-gs-y='+y+' data-gs-width='+12+' data-gs-height='+1+' data-gs-min-width=8 data-gs-min-height=1>'+
							'<div class="grid-stack-item-content">'+innerHTML+'</div>'+
						'</div>');
			$dom.appendTo($('.grid-stack'));
			//增加每一个模块后坐标递增
			x+=12;
			if(x>=12){
				x=0;
				y+=3;
			}
		}else{
			var innerHTML=  '<div class="box box-default">'+
							'<div class="box-header with-border">'+
								'<h2 class="box-title"><i class="fa fa-cog"></i> '+item+'</h2>'+
							'</div>'+
							'<div class="box-body no-padding" id="'+item+'"></div>'+
						'</div>';
		
			var $dom=$('<div class="grid-stack-item" data-type="'+item+'" data-gs-x='+x+' data-gs-y='+y+' data-gs-width='+4+' data-gs-height='+3+' data-gs-min-width=4 data-gs-min-height=3>'+
							'<div class="grid-stack-item-content">'+innerHTML+'</div>'+
						'</div>');
			$dom.appendTo($('.grid-stack'));
			//增加每一个模块后坐标递增
			x+=4;
			if(x>=12){
				x=0;
				y+=3;
			}
		}
		
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

function render(item){
	switch (item){
		case 'overview': overview(item); break;
		case 'business': business(item); break;
		case 'monitor': monitor(item); break;
		case 'device': device(item); break;
		case 'cpu': //cpu/memory/disk共用topN()
		case 'memory':
		case 'disk': topN(item); break;
		default:break;
	}
}
// 4块综述 overview
function overview(item){
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
	$('#'+item+'').html(html);

	setTimeout(function(){
		overview(item)
	},20000)
}

// 业务视图 business
function business(item){
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
	$('#'+item+'').html(html);

	setTimeout(function(){
		business(item)
	},20000)
}

// 监测器状态 monitor
function monitor(item){
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
	$('#'+item+'').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		//警告 正常 主要 次要 紧急
		// colors:['#cdcd00','#468847','#a16611','#FA9300','#b94a48'],
		title:false,
		tooltip: {
			pointFormat: '<b>{point.percentage:.1f}</b>%'
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
		         dataLabels: {
		        	 enabled: true,
		        	 // connectorColor:'{point.color}',//'rgba(0,0,0,0.5)',//线的颜色
		        	 fontSize: 14,
		        	 format: '<span style="color:#555"><b>{point.name}</b>: {point.y} </span>',
		        	 useHTML:true,
		        	 softConnector:false,
		        	 connectorPadding: 5,
					connectorWidth: 1,
					connectorLen: 1,
					distance: 30,
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
			data: [
		       ['警告', 2],
		       ['正常',  45],
		       ['主要',  4],
		       ['次要', 0],
		       ['紧急',  5]
		    ]
		}]
	});

	setTimeout(function(){
		monitor(item)
	},20000)
}

// 设备状态 device
function device(item){
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
	$('#'+item+'').html(mainHtml);

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
		interval: 200000
	});

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

	setTimeout(function(){
		device(item)
	},20000)
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
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: data.name,
			y:20,
			style:{
				fontSize:'14px',
			}
		},
		tooltip: {
			pointFormat: ' <b>{point.percentage:.1f}%</b>'
		},
		credits: {
			enabled: false
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
					enabled: false
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
	});
}

// topN  cpu/内存/磁盘
function topN(item){
	// 模拟数据
	var data={
		name:item,
		x:["liuquan-PC:", "PC-201705111113:", "WIN2008-sybase2:", "DESKTOP-A244JG0:", "WIN-ME6FVAS3LQP:", "PC-201705111113:"],
		y:[65,43,89,56,77,43]
	}

	var $tools=$('<div class="box-tools pull-right"></div>').html('<button class="btn btn-box-tool" onclick=""><i class="fa fa-wrench"></i> 自定义</button>');
	console.log($('#'+item+''))
	$tools.appendTo($('#'+item+'').prev('.box-header'));

	$('#'+item+'').highcharts({
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

	setTimeout(function(){
		topN(item)
	},20000)
}

//图表大小调整适应
function resizeChart(){
	$('.box-body').each(function(){
		if($(this).highcharts()){
			$(this).highcharts().reflow();
		}
		
	})
}

//图表渐变


//设置弹窗------------------------------
$(function(){
	var layoutArr = ['business','monitor','device','cpu','memory','disk','overview'];
	//打开设置弹窗
	$('#setting').click(function(){
		$('#modal-layout').modal('show');
		reset(layoutArr);
	})
	//弹窗中新增
	$('#addLayout').click(function() {
		if($('#table-layout tbody tr').length<8){
			$('#table-layout tbody tr:nth-child(1)').clone(true).appendTo($('#table-layout tbody'))
		}else{
			alert("页面最多只能展示8项")
		}
	});
	//弹窗中删除
	$('.deleteTr').click(function() {
		if($('#table-layout tbody tr').length > 1) {
			$(this).parents('tr').remove();
		}
	});
	//弹窗中保存
	$('#saveLayout').click(function() {
		//检查是否为空
		var flag=true;
		$('select[name=layout]').each(function(){
			if($(this).val()==''){flag=false}
		});
		if(!flag){ alert('值不能为空'); return;}
		//隐藏弹出框
		$('#modal-layout').modal('hide');
		//生成新的数据
		layoutArr=[];
		$('#table-layout tbody tr').each(function(){
			layoutArr.push($(this).find('select[name=layout]').val());
		});
		console.log(layoutArr)
		//渲染布局
		buildLayout(layoutArr);
	})
	//弹窗中重置
	$('#resetLayout').click(function(){
		reset(layoutArr)
	})
	//打开弹窗的时候 或者重置的时候
	function reset(arr){
		var $tr=$('#table-layout tbody tr:nth-child(1)').clone(true);
		$('#table-layout tbody').empty();
		$.each(arr, function(idx, item) {
			$tr.clone(true).appendTo($('#table-layout tbody'));
		})
		$('#table-layout tbody tr').each(function(idx, ele) {
			console.log(arr[idx])
			$(this).find('select[name=layout]').val(arr[idx]);
		})
	}
})

//保存布局设置------------------------------------
$('#save').click(saveLayout)
function saveLayout(){
	var layout=[];
	$('.grid-stack .grid-stack-item').each(function(idx,ele){
		layout.push({
			type:$(this).data('type'),
			scale:{
				width:$(this).data('gs-width'),
				height:$(this).data('gs-height'),
				x:$(this).data('gs-x'),
				y:$(this).data('gs-y')
			},
			time:10
		})
	});
	layout.pop();//实际会多一个
	alert('Layout saves success')
	console.log(layout);
	console.log(JSON.stringify(layout))
}



