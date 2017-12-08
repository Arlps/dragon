; (function() { 
    window.jsPlumbDemo = {
      
             
        init: function() {

            jsPlumb.importDefaults({
                // default drag options
                DragOptions: { cursor: 'pointer', zIndex: 2000 },
                // default to blue at one end and green at the other
                EndpointStyles: [{ fillStyle: '#225588' }, { fillStyle: '#558822'}],//连线节点默认样式
                // blue endpoints 7 px; green endpoints 11.
                Endpoints: [["Dot", { radius: 1}], ["Dot", { radius: 1}]], //连线节点默认样式
                // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
                // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
                ConnectionOverlays: [
					["Arrow", { location: 1}],
                	["Label", {   location: 0.5,id: "label",cssClass: "aLabel"}] //连线标签样式，如果不需要标签，则屏蔽此行
				]
            });

            // this is the paint style for the connecting lines..
            var connectorPaintStyle = {
                lineWidth: 4,
                strokeStyle: "#deea18",
                joinstyle: "round",
                outlineColor: "#eaedef",
                outlineWidth: 2
            },
            // .. and this is the hover style. 
			connectorHoverStyle = {
			    lineWidth: 4,
			    strokeStyle: "#5C96BC",
			    outlineWidth: 2,
			    //outlineColor: "white"
			},
			endpointHoverStyle = { fillStyle: "#5C96BC" },
            // the definition of source endpoints (the small blue ones)
			sourceEndpoint = {
			    endpoint: "Dot",
			    paintStyle: {
			        strokeStyle: "#1e8151",
			        fillStyle: "transparent",
			        radius: 1, //连接线两头的节点半径
			        lineWidth: 2
			    },
			    isSource: true,
			    connector: ["Flowchart", { stub: [10, 20], gap: 1, cornerRadius: 5, alwaysRespectStubs: true}],
			    connectorStyle: connectorPaintStyle,
			    hoverPaintStyle: endpointHoverStyle,
			    connectorHoverStyle: connectorHoverStyle,
			    dragOptions: {},
			    overlays: [
                	["Label", {
                	    location: [0.5, 1.5],
                	    label: "",
                	    cssClass: "endpointSourceLabel"
                    }]
                ]
			},

			init = function(connection) {
			     connection.getOverlay("label").setLabel(connection.sourceId.substring(6) + "-" + connection.targetId.substring(6));//连线标签内容
			    connection.bind("editCompleted", function(o) {
			        if (typeof console != "undefined")
			            console.log("connection edited. path is now ", o.path);
			    });
			};

            var _addEndpoint = function(toId, sourceAnchor) {
                var sourceUUID = toId + sourceAnchor;
                jsPlumb.addEndpoint(toId, sourceEndpoint, { anchor: sourceAnchor, uuid: sourceUUID });

            };

            _addEndpoint("window1", "Bottom2"); //修改jsPlummb，自定义的底部锚点
            _addEndpoint("window1", "Bottom5");
            _addEndpoint("window1", "Bottom8");

            _addEndpoint("window2", "Top5"); 
            _addEndpoint("window2", "Bottom5"); 
            
            
            _addEndpoint("window3", "Top5");
            _addEndpoint("window4", "Top5");
            _addEndpoint("window4", "Bottom5");
            
 
            _addEndpoint("window5", "Top2");
            _addEndpoint("window5", "Top8");

 
            // listen for new connections; initialise them the same way we initialise the connections at startup.
            jsPlumb.bind("connection", function(connInfo, originalEvent) {
                init(connInfo.connection);
            });

            // make all the window divs draggable		//设置节点是否可拖动				
            jsPlumb.draggable(jsPlumb.getSelector(".window"), { grid: [20, 20] });
            // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector 
            // method, or document.querySelectorAll:
            //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

            // 设置流程图样式连接
           var connection12 = jsPlumb.connect({ uuids: ["window1Bottom2", "window2Top5"], editable: false });
           var connection13 =  jsPlumb.connect({ uuids: ["window1Bottom8", "window3Top5"], editable: false });
            
           var connection25 =  jsPlumb.connect({ uuids: ["window2Bottom5", "window5Top2"], editable: false });
           var connection45 =  jsPlumb.connect({ uuids: ["window4Bottom5", "window5Top8"], editable: false }); 
            
          
            
           //设置直线连接34
           var  connection13 = jsPlumb.connect({
                source: "window3",
                target: "window4",
                anchors: ["Bottom5", "Top5"],
              
                paintStyle: {
			        strokeStyle: "#deea18",
			        fillStyle: "transparent",
			        //radius: 1, //连接线两头的节点半径
			        lineWidth: 4
			    },
                hoverPaintStyle: connectorHoverStyle,
                connector: "Straight",
                endpointsOnTop: true,
                //overlays: [["Label", {cssClass: "component label",label: "4 - 5",}],"Arrow"],
                });
            
            
            }//init
        };//window.jsPlumbDemo
    })();