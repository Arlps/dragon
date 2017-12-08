$(function () {
    $('#column6').highcharts({
        chart: {
            type: 'column',
            backgroundColor:null,
            marginTop:40
        },
        title: {
            text: ''
        },
        xAxis: {
        	tickPosition: 'inside',
        	tickLength: 5,
        	lineWidth:0.5,
            lineColor:'#222',
            tickColor:'#222',
            tickWidth:1,
            categories:['A','B','C','D','E','F','G','H',], //['设备', '数据库'],
            title: {
                text: null
            },
            labels:{
            	style: {
                    color: '#FFF',
                    fontSize:'14px'
                },
            }
        },
        yAxis: {
            min: 0,
            opposite:false,
            gridLineColor: '#06151A',//网格线颜色
            gridLineWidth: 0.5,//网格线宽度
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style:{
                	color:'#2ac7d8'//'#ccc'
                }
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                pointPadding: 10, //数据点之间的距离值
                groupPadding: 0, //分组之间的距离值
                borderWidth: 0,
                shadow: true,
                pointWidth:10 //柱子之间的距离值
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
            enabled:true,//是否显示
            //width: 200,//每一项宽度
            //layout: 'horizontal',//垂直还是水平排列 horizontal
            itemHoverStyle: {color: '#FFf'},//鼠标悬浮颜色
            itemStyle: { cursor: 'pointer', color: '#3E576F',fontWeight:'normal',color:'#bbb'},//默认样式
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '正常',
            data: [90, 78, 85, 90, 75, 83, 90, 88],
            color:"rgba(2,153,251,0.8)"//"rgba(42,199,216,0.8)"
            //{'color':'rgba(39,164,194,0.6)','y':57}
        }, {
            name: '异常',
            data: [10, 22, 15, 10, 25, 17, 10, 12],
            color:'rgba(35,217,57,0.6)'//'rgba(233,107,3,0.6)'
        }]
    });
});
