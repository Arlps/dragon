var labelType, useGradients, nativeTextSupport, animate;
window.onload=function(){
    init();
    //背景色canvas
    // $('#infovis-bkcanvas').css('background',"#88BEAE");
}

function init() {
    // 模拟数据
    var json2={
        name:'root',
        id:"_0",
        children:[]
    }
    
    for (var i = 0; i <5; i++) {
        var obj={name:"son"+i, id:i+"_1",children:[],status:Math.random()}
            for (var j = 0; j <3; j++) {
                obj.children.push({name:"grand"+i+'-'+j,id:i+'-'+j+"_2",children:[],status:Math.random()})
            };
        json2.children.push(obj);
    };
    

    var arr=[];
	//init RGraph
    //<ST>, <Sunburst>, <Hypertree>, <RGraph>, <TM>, <ForceDirected>, <Icicle>
	var rgraph = new $jit.RGraph({
        //RGraph的属性有"Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"
		injectInto: 'infovis',
		background: {
			CanvasStyles: {
				strokeStyle: '#fff', // 圆圈颜色
                lineWidth:0.3
			}
		},
        // 鼠标放大移动
		Navigation: {
			enable: true,//放大缩小
			panning: true,//移动
			zooming: 50//放大系数
		},
		// 样式
		Node: {
            //'none', 'circle', 'triangle', 'rectangle', 'star', 'ellipse' and 'square'.
            type:'circle',
            color: '#fff',
            dim:5,
            overridable: true,
        },
		Edge: {color: '#ff0',lineWidth: 1},
        Tips:{ enable:false},
        interpolation: 'polar',
        // transition: $jit.Trans.Bounce.easeOut,
        duration:1500,
        fps: 40,
        // 右侧关系
		onBeforeCompute: function(node) {
			// Log.write("centering " + node.name + "...");
			// $jit.id('inner-details').innerHTML = node.data.relation; 
		},
		onCreateLabel: function(domElement, node, line) {
            // console.log(node)
            // console.log(line)  -->未定义
            var style = domElement.style;
            if(node._depth == 0) {
                node.Node.color="#f60";
                style.fontSize = "0.8em";
                style.color = "#f60";
                style.backgroundImage="url(img/logo1.png)"
            } else if(node._depth == 1) {
                node.Node.color="#bbb";
                style.fontSize = "0.7em";
                style.color = "#fff";
                style.backgroundImage="url(img/logo2.png)"
            } else {
                node.Node.color="#ccc";
                style.color = "#fff";
                style.backgroundImage="url(img/logo3.png)"
            }
            
            // （domElement）=（#infovis-label .node）
			domElement.innerHTML = node.name;
            domElement.ondblclick=function(){
                console.log("右击触发双击事件");
                alert(node.id)  
            }
            domElement.onmousedown=function(e){
                e.preventDefault();
                e.stopPropagation();
                $(domElement).unbind("mouseup");
                if(3 == e.which){ 
                    $(domElement).mouseup(function(){
                        $(domElement).trigger('dblclick');
                    })      
                }  
            }
			domElement.onclick = function() {
				rgraph.onClick(node.id, {
					onComplete: function() {
						// Log.write("done");
					}
				});
			};
		},

        // 转换位置的时候
		onPlaceLabel: function(domElement, node) {
			var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
            console.log(this)
		},

        onBeforePlotLine:function(line){
            console.log(line);

            // 改变线的颜色
            if(line.nodeFrom.name=="root"){
                line.Config.color="#0ff";
                // line.Edge.color="#0ff";
            }else{
                line.Config.color="#ff0"

            }
        },
        onBeforePlotNode:function(node){
        

        },
        onAfterPlotNode:function(node){
            // console.log(node)
        }

	});
    console.log(rgraph);
    // console.log(rgraph.graph.edges);
    // 环间距
    rgraph.config.levelDistance=120;

	//加载数据
	rgraph.loadJSON(json2);
	//trigger small animation
	rgraph.graph.eachNode(function(n) {
		// var pos = n.getPos();
		// pos.setc(-200, -200);
        // console.log(n);
        if(n._depth==1){n.Edge.color="#f00"}  
	});
	rgraph.compute('end');
	rgraph.fx.animate({
		modes: ['polar'],
		duration: 1500
	});
	// $jit.id('inner-details').innerHTML = rgraph.graph.getNode(rgraph.root).data.relation;
    // onBeforeCompute: $.empty,
    // onAfterCompute:  $.empty,
    // onCreateLabel:   $.empty,
    // onPlaceLabel:    $.empty,
    // onComplete:      $.empty,
    // onBeforePlotLine:$.empty,
    // onAfterPlotLine: $.empty,
    // onBeforePlotNode:$.empty,
    // onAfterPlotNode: $.empty,
}