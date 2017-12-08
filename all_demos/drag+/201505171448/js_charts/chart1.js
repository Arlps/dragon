$(function () {

    $('#pie').highcharts({
        chart: {
            type: 'pie',
            // backgroundColor: 'rgba(0,0,0,0)',
            // marginTop:-10
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            labels: {
                staggerLines: 2,//分两行显示
                rotation: 90,//旋转90度
                step:2,//省略式显示
                style: {
                    color: 'red'
                },
                x: 16,
                y: 0,
                lineColor:'#000',//轴颜色
                lineWidth: 10,
                maxPadding: 0.01,
            }
        },
        yAxis: {
            alternateGridColor: '#FDFFD5',//隔行显色
            ceiling: 10,//最大
            gridLineColor: '#2ac7d8',//网格线颜色
            gridLineWidth: 2,//网格线宽度
            gridZIndex: 1,//网线Z深度
            opposite:false,//y轴在右侧
            showFirstLabel: false,//不显示第一个标签
            
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
//          x: 0,
//          y: 100
        },
        title: {
		    text: ''
		},
        series: [{
            data: [
                ['正常',   45.0],
                ['主要',       26.8],
                {	
                    name: '次要',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['警告',    8.5],
                ['紧急',     6.2]
            ]
        }],
        plotOptions: {
            pie: {
                //cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
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
        credits: {  
          enabled:false  
		}, 
    });
});