var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();


function init(){
    //实例数据
    var json = {
        id: "0",
        name: "F5",
        data: {
        	type:'F5'
        },
        children: [ {id: "1",
             name: "引擎1",
             data: {type:'server'}
            },{
            id: "2",
            name: "引擎2",
            data: {},
             children: [{
		            id: "21",
		            name: "应用21",
		            data: {}
		            }, {
		        	 id: "22",
		             name: "应用22",
		             data: {type:'server'}
		            }, {
		        	id: "23",
		            name: "应用23",
		            data: {type:'server'}
		            }, {
		        	id: "24",
		            name: "应用24",
		            data: {type:'server'}
		           }]
            }, 
        	 {
        	id: "3",
            name: "引擎3",
            data: {type:'server'}
            }, {
        	id: "5",
            name: "引擎4",
            data: {type:'server'}
           }]
    };
    //end
    
    //创建一个 ST 实例
    var st = new $jit.ST({
        //渲染容器，一般是一个DIV
        injectInto: 'infovis',
        //展示出拓扑图的动画时间
        duration: 800,
        //设置动画类型
        transition: $jit.Trans.Quart.easeInOut,
        //设置横向节点距离
        levelDistance: 80,
        //点击节点后下级几点展示几层
        levelsToShow: 5,
        //是否可以移动
        Navigation: {
          enable:true,
          panning:true
        },
        //节点类型样式设置，节点类型支持扩展
        Node: {
            height: 80,
            width: 68,
            type: 'rectangle',
            lineWidth: 2,
            overridable: true
        },
        //线条类型(bezier,line,arrow,quadratic:begin,quadratic:end)样式设置
        Edge: {
        	type: 'bezier',
            lineWidth: 2,
            color:'#203b68',
            overridable: true
        },
        
        //计算节点位置前
        onBeforeCompute: function(node){
          
        },
        //计算节点位置后
        onAfterCompute: function(){
          
        },
        
        //创建节点文本时触发事件
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            label.onclick = function(){
            	  st.onClick(node.id);
            };
            var style = label.style;
            style.width = 68 + 'px';
            style.height = 80 + 'px';
            style.lineHeight= 150 + 'px';      
            style.cursor = 'pointer';
            style.color = '#000000';//'#c5c4c4';
            style.fontSize = '0.8em';
            style.textAlign= 'center';
            style.verticalAlign='bottom';
            style.background=node.data.type=='F5'?"url('./icon/f5.png') no-repeat top":"url('./icon/server.png') no-repeat top";
        },
        
        
        //渲染节点触发事件
        onBeforePlotNode: function(node){
            
        },
        
        
        //连线前触发事件，可以修改线条颜色等
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#FF0000";
                adj.data.$lineWidth = 5;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //加载数据
    st.loadJSON(json);
    //计算布局
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //展现根节点
    st.onClick(st.root);
    return st;
}
