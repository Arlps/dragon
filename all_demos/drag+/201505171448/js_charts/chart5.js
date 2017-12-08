$(function () {
    $('#watch5').highcharts({
        chart: {
        	backgroundColor:null,
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    radialGradient: { x1: 0.5, y1: 0.5, x2: 1, y2: 1 },
                    stops: [
                        [0, '#fff'],
                        [1, '#ccc']
                    ]
                },
                borderWidth: 30,
                borderColor:'#033644',
                outerRadius: '80%'
            }]
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 5,
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#E96B03',
            tickPixelInterval: 30,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#fff',
            labels: {
                step: 2,
                rotation: 'auto',
                style:{
                	color:'#fff'
                }
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 70,
                color: '#7CAF14' // green
            }, {
                from: 70,
                to: 100,
                color: '#BE1D06' // red
            }]
        },
        series: [{
            name: '使用率',
            data: [65],
            tooltip: {
                valueSuffix: ' %'
            }
        }]
    },
                               // Add some life
                               function (chart) {
    });
});
