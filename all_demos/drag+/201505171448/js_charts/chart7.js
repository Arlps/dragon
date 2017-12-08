$(function () {
    $('#area7').highcharts({
    	chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            marginTop:40
        },
        title: {
            text: '',
            x: -20 //center
        },
        xAxis: {
//          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            //ceiling: 10,//最大
            showFirstLabel: false,
            min:0,
            lineWidth:0.5,
            lineColor:'#222',
            tickColor:'#222',
            tickLength: 5,
            tickWidth:0.5,
            tickLength: 5,
            tickPosition: 'inside',
            tickInterval: 1,
            showLastLabel: false,
            labels:{
            	y:12,
            	style: {
                    color: '#ccc',
                    fontSize:'10px'
                },
            }
        },
        yAxis: {
        	ceiling: 100,//最大
            min:0,
            title: {
                text: '',//'使用率%'
            },
            //y=0
            plotLines: [{
                value: 0,
                width:1,
                color: '#06151A'
            }],
            gridLineColor: '#06151A',//网格线颜色
            gridLineWidth: .5,//网格线宽度
            labels:{
            	style: {
                    color:'#2ac7d8'//'#ccc'
                },
            }
        },
        plotOptions:{
        	
        	series:{
            	borderWidth: 0,
            	borderColor:'#2ac7d8',
            	shadow: true,
            	marker:{enabled:false}
            },
            areaspline: {
            	dataLabels: {
                    enabled: true
                },
                //enableMouseTracking: false,
                lineWidth:0.5,
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgba(233,107,3,0.7)'],
                        [1, 'rgba(0,0,0,0)']
                    ]
                }
            }
        },
        legend: {
            layout: 'horizontal',//'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: -2,
            floating: true,
            //backgroundColor:'#06151A',
            borderColor:"#2ac7d8",
            //borderWidth:1,
            borderRadius:'3px',
            itemStyle: { cursor: 'pointer', color: '#3E576F',fontWeight:'normal',color:'#bbb'}
        },
        tooltip: {
            valueSuffix: ' %',
            crosshairs: [true,true]
        },
        credits: {  
          enabled:false  
		}, 
        series: [{
        	type:'areaspline',
        	symbol:'none',
            name: '数据',
            color:'rgba(233,107,3,0.7',
            data: [45,66,70,55,40,44,33,36,42,45,45,66,70,55,40,44,33,36,42,45]
        }]
    });
});
