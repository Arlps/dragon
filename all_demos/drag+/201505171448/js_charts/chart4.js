$(function () {
    var gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor: null
        },
        title: null,
        pane: {
            center: ['50%', '65%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:'rgba(0,0,0,0.3)',//'#27282D',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc',
                borderWidth:0,
            }
        },
        yAxis: {
 			//官方16
            stops: [
                [0, '#55BF3B'],//
                [0.6, '#DDDF0D'],//#2BB321
                [0.8, '#DF5353']
            ],
            //官方256
//          stops: [
//              [0, 'rgba(171,211,30,1)'],//
//              [0.6, 'rgba(234,145,39,1)'],//#2BB321
//              [0.8, 'rgba(250,49,71,1)']
//          ],
            lineWidth: 0.1,
            gridLineColor: 'rgba(0,0,0,0)',
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y:100
            },
            // 0-100刻度
            labels: {
                y: 16,
                style:{
                	'color':'rgba(233,107,3,0.6)',
                	'fontWeight':'normal'
                }
            }
        },
        tooltip: {
        	enabled:true
        },
        plotOptions: {
            solidgauge: {
            	//百分比数字
                dataLabels: {
                    y: -40,
                    borderWidth: 1,
                    borderColor:'#2ac7d8',
                    useHTML: true,
                    
                }
            },
            series:{
            	borderWidth: 0 ,//0.5,
            	borderColor:'#2ac7d8',
            	backgroundColor:'#000',           	
            	shadow: true,
            }
        }
    };
    // The speed gauge '#27A4C2', '#000','#E96B03','#4072A1','#23AD34'
    $('.cpu').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'CPU使用率',
                style:{
                	'color':'#ccc',
                	'fontSize':'16px',
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '使用率',
            data: [38],
            dataLabels: {
                format: '<div style="text-align:center;"><span style="font-size:25px;color:#ccc">{y}</span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }));
    $('.ram').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '内存使用率',
                style:{
                	'color':'#ccc',
                	'fontSize':'16px',
                	'border':'1px solid yellow'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '使用率',
            data: [69],
            dataLabels: {
                format: '<div style="text-align:center; padding:0"><span style="font-size:25px;color:#ccc;margin:0">{y}</span><br/>' +
                '<span style="font-size:14px;color:#FF6500"></span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }));
    $('.disk').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '磁盘使用率',
                style:{
                	'color':'#ccc',
                	'fontSize':'16px',
                	'border':'1px solid yellow'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '使用率',
            data: [92],
            dataLabels: {
                format: '<div style="text-align:center;"><span style="font-size:25px;color:#ccc">{y}</span><br/>' +
                '<span style="font-size:14px;color:#FF6500"></span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }));
    
});