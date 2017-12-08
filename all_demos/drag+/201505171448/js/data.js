// 设置具体类型
	//var chartType=["pie","column","line","table","line","column","pie","table","line","table"];
	var dataJson={arr:[
		{	
			name:"cpu",
			type:"pie",
			data:{	
				x:0,
				y:[{
		            data: [
		            ['Firefox',45.0],
                	['IE',20],
                	['Safari',    8.5],
	                ['Opera',     6.2],
	                ['Others',   0.7]
                	]
		        }]
			}
		},
		{	
			name:"memory",
			type:"line",
			data:{	
				x:0,
				y:[{
		            name: 'Tokyo',
		            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		        }, {
		            name: 'New York',
		            data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
		        }],
			}
		},
		{	
			name:"warning",
			type:"column",
			data:{	
				x:0,
				y:[{
		            name: 'Tokyo',
		            data: [7.0, 6.9, 9.5, 14.5, 18.2]
		        }, {
		            name: 'New York',
		            data: [0.2, 0.8, 5.7, 11.3, 17.0]
		        }],
			}
		},
		{	
			name:"warning",
			type:"bar",
			data:{	
				x:0,
				y:[{
		            name: 'Tokyo',
		            data: [7.0, 6.9, 9.5, 14.5, 18.2]
		        }, {
		            name: 'New York',
		            data: [0.2, 0.8, 5.7, 11.3, 17.0]
		        }],
			}
		},
		{	
			name:"cpu",
			type:"pie",
			data:{	
				x:0,
				y:[{
		            data: [
		            ['Firefox',45.0],
                	['IE',20],
                	['Safari',    8.5],
	                ['Opera',     6.2],
	                ['Others',   0.7]
                	]
		        }]
			}
		},
		{	
			name:"memory",
			type:"line",
			data:{	
				x:0,
				y:[{
		            name: 'Tokyo',
		            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		        }, {
		            name: 'New York',
		            data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
		        }],
			}
		},
		{	
			name:"warning",
			type:"column",
			data:{	
				x:0,
				y:[{
		            name: 'Tokyo',
		            data: [7.0, 6.9, 9.5, 14.5, 18.2]
		        }, {
		            name: 'New York',
		            data: [0.2, 0.8, 5.7, 11.3, 17.0]
		        }],
			}
		},
		{	
			name:"warning",
			type:"table",
			data:{	
				x:0,
				y:[
					{A:0,B:0,C:0,D:0,E:0},
					{A:0,B:0,C:0,D:0,E:0},
					{A:0,B:0,C:0,D:0,E:0},
					{A:0,B:0,C:0,D:0,E:0},
					{A:0,B:0,C:0,D:0,E:0},
					{A:0,B:0,C:0,D:0,E:0}
				],
			}
		},
	]}



	// ---------------------------------------------------
		// always_show_resize_handle：如果设置为true，缩放手柄将会一直显示。默认为false。
		// animate：转换为动画。默认为false。
		// auto：如果设置为false将不会初始化已经存在的项。默认为true。
		// cell_height：单元格的高度。默认值为60。
		// draggable：允许覆盖 jQuery UI draggable 选项。默认值：{handle: '.grid-stack-item-content', scroll: true, appendTo: 'body'}。
		// handle：拖放手柄选择器。默认值为：'.grid-stack-item-content'。
		// height：最大行数。默认为0，意思是没有最大行数。
		// float：允许元素浮动。默认值：false。
		// item_class：元素组件的class。默认值'grid-stack-item'。
		// min_width：最小宽度。如果窗口的宽度小于网格的宽度，将会以单列显示。默认值为768。
		// placeholder_class：placeholder的class。默认值为'grid-stack-placeholder'。
		// resizable：允许覆盖jQuery UI resizable选项。默认值为：{autoHide: true, handles: 'se'}。
		// vertical_margin：垂直间隙的尺寸。默认值为20。
		// width：网格的列数。默认值为12。
		// 网格属性-----------------------------------------
		// data-gs-animate：转换为动画。
		// data-gs-width：列数。
		// data-gs-height：最大行数。默认为0，意思是没有最大行数。
		//  Item属性-------------------------------------------
		// ata-gs-x, data-gs-y：元素的位置。
		// data-gs-width, data-gs-height：元素的尺寸。
		// data-gs-max-width, data-gs-min-width, data-gs-max-height, data-gs-min-height：元素的约束。
		// data-gs-no-resize：禁止元素缩放尺寸。
		// data-gs-no-move：禁止元素移动。
		// data-gs-auto-position：忽略data-gs-x和data-gs-y属性，并将元素放置在第一个可用的位置上。
		// data-gs-locked：元素将被锁定。锁定后其它元素在缩放或移动时不能改变这个元素。但是该元素仍然可以被移动或缩放。如果不希望它移动或缩放，需要添加data-gs-no-move或data-gs-no-resize属性。