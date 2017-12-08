$(function () {
    $('#line2').highcharts({
    	chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            marginTop:50,
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
            showLastLabel: false,
            min:0,
            lineWidth:0.5,
            lineColor:'#333',
            tickColor:'#06151A',
            tickLength: 5,
            tickWidth:0.5,
            tickPosition: 'inside',
            tickInterval: 1,
            labels:{
            	y:15,
            	style: {
                    color: '#ccc',
                    fontSize:'10px'
                },
            }
        },
        yAxis: {
        	//ceiling: 100,//最大
            min:0,
            max:100,
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
            gridLineWidth: 0.5,//网格线宽度
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
           },
//         line: {
//              dataLabels: {
//                  enabled: true
//              }
        },
        legend: {
            // layout: 'vertical',
            //float:true,
            //y:-120,
			align: 'right',
            verticalAlign: 'top',
            //backgroundColor:'#06151A',
            borderColor:"#2ac7d8",
            //borderWidth:1,
            borderRadius:'3px',
            itemStyle: { cursor: 'pointer', color: '#3E576F',fontWeight:'normal',color:'#bbb'}
        },
        tooltip: {
            valueSuffix: ' %',
            crosshairs: [true,true],
            plotOptions: {
                spline: {
                    marker: {
//                      radius: 4,
//                      lineColor: '#666666',
//                      lineWidth: 1
                    }
                }
            }
        },
        credits: {  
          enabled:false  
		}, 
        series: [{
            name: '数据A',
            color:'rgba(39,164,194,1)',
            //data: [45,66,70,55,40]
            data: [45,66,70,55,40,44,45,66,120,55,60]
        }, {
            name: '数据B',
            color:'rgba(233,107,3,1)',
            //data: [72,80,63,70,80]
            data:  [72,80,63,70,80,77,72,80,63,70,66]
        }, {
            name: '数据C',
            color:'rgba(64,114,161,1)',
            //data: [34,44,55,48,43]
            data:  [34,44,55,48,43,40,34,44,55,48,44]
        }, {
            name: '数据D',
            color:'rgba(35,173,52,1)',
            //data: [22,33,28,30,25]
            data: [22,33,28,30,25,22,22,33,28,30,34]
        }]
    });
});
