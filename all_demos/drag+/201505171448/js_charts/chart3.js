$(function () {
    Highcharts.chart('bar3', {
        chart: {
            type: 'bar',
            backgroundColor: 'rgba(0,0,0,0)',
            marginTop:30,
            marginRight:10,
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['业务A', '业务B', '业务C', '业务D'],
            labels: {
                rotation: 0,//旋转90度
                step:1,//省略式显示
                style: {
                    color:'#ccc',
                    fontSize:'12px'
                },
                x: -5,
                y: 5,
                lineColor:'#000',//轴颜色
                lineWidth: 100,
                tickLength: 5,
                showLastLabel: false,
                
            }
        },
        yAxis: {
        	//alternateGridColor: '#FDFFD5',//隔行显色
            ceiling: 100,//最大
            gridLineColor: '#06151A',//网格线颜色
            gridLineWidth: 0.5,//网格线宽度
            tickPosition: 'inside',
            //showLastLabel: false,
            min: 0,
            title: {
                text: '百分比%',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                step:1,
                style:{
                	color:'#2ac7d8',//'#ccc'
                }
            },
        },
        legend:{
        	enabled:false
        },
        exporting: { enabled:false },
        tooltip: {
            valueSuffix: ' %'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series:{
            	borderWidth: 0.5,
            	borderColor:'#2ac7d8',
            	shadow: true,
            }
        },
        credits: {
            enabled: false
        },
//      series: [{
//          name: '业务',
//          data: [57, 88, 43, 97]
//          
//      }]
//'#27A4C2','#E96B03','#4072A1','#23AD34'
        series: [{ 
        	name: '业务',
            data: [{'color':'rgba(39,164,194,0.6)','y':57}, 
                {'color':'rgba(233,107,3,0.6)','y':88}, 
                {'color':'rgba(64,114,161,0.6)','y':43}, 
                {'color':'rgba(35,173,52,0.6)','y':97}], 
            }]
    });
});