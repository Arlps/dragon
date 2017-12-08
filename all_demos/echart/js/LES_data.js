

    //数据
var data = {
	"nodes": [{
		"id": "0",
		"name": "A",
	}, {
		"id": "1",
		"name": "B",
	}, {
		"id": "2",
		"name": "C",
	}, {
		"id": "3",
		"name": "D",
	}, {
		"id": "4",
		"name": "E",
	}],
	"links": [{
		"id": "0",
		"name": "1-0",
		"source": "1",
		"target": "0",
		value:"连接关系",
		lineStyle:{
			normal:{
				type:'dotted',color:'#0f0'
			}
		},
		label:{
			normal:{
				show:true,
				formatter:'{c}'//'{a}:{b}:{c}'
			}
		}
	}, {
		"id": "1",
		"name": "2-0",
		"source": "2",
		"target": "0"
	}, {
		"id": "2",
		"name": "3-0",
		"source": "3",
		"target": "0",
	}, {
		"id": "3",
		"name": "3-2",
		"source": "3",
		"target": "2",
	}, {
		"id": "4",
		"name": "4-0",
		"source": "4",
		"target": "0",
	}]
}

var graph2 = {
	"nodes": [{
		"id": "0",
		"name": "A",
		"itemStyle": {
			"normal": {
				"color": "rgb(235,81,72)"
			}
		}
	}, {
		"id": "1",
		"name": "B",
		"itemStyle": {
			"normal": {
				"color": "rgb(236,81,72)"
			}
		}
	}, {
		"id": "2",
		"name": "C",
		"itemStyle": {
			"normal": {
				"color": "rgb(236,81,72)"
			}
		}
	}, {
		"id": "3",
		"name": "D",
		"itemStyle": {
			"normal": {
				"color": "rgb(236,81,72)"
			}
		}
	}, {
		"id": "4",
		"name": "E",
		"itemStyle": {
			"normal": {
				"color": "rgb(236,81,72)"
			}
		}
	}],
	"links": [{
		"id": "0",
		"name": null,
		"source": "1",
		"target": "0",
		"lineStyle": {
			"normal": {}
		}
	}, {
		"id": "1",
		"name": null,
		"source": "2",
		"target": "0"
	}, {
		"id": "2",
		"name": null,
		"source": "3",
		"target": "0",
		"lineStyle": {
			"normal": {}
		}
	}, {
		"id": "3",
		"name": null,
		"source": "3",
		"target": "2",
		"lineStyle": {
			"normal": {}
		}
	}, {
		"id": "4",
		"name": null,
		"source": "4",
		"target": "0",
		"lineStyle": {
			"normal": {}
		}
	}]
}

var theme=[{
	id:0,
	title: '客户',
	bloodID:[{id:1,title:'购买产品'},{id:2,title:'电力输入和输出'},{id:4,title:'电力需求'},{id:10,title:'电费结算'}],
	url:"xxxxxxxxx",
	level:1
},{
	id:1,
	title: '产品',
	bloodID:[{id:2,title:'产品支持'},],
	url:"xxxxxxxxx",
	level:2
},{
	id:2,
	title: '电网',
	bloodID:[{id:3,title:'电网结果,运行安全'},],
	url:"xxxxxxxxx",
	level:1
},{
	id:3,
	title: '安全',
	bloodID:[{id:5,title:'设备安全'},{id:11,title:'人生安全'}],
	url:"xxxxxxxxx",
	level:1
},{
	id:4,
	title: '市场',
	bloodID:[{id:10,title:'交易结算'},],
	url:"xxxxxxxxx",
	level:2
},{
	id:5,
	title: '设备',
	bloodID:[{id:6,title:'拼装'},],
	url:"xxxxxxxxx",
	level:2
},{
	id:6,
	title: '物质',
	bloodID:[{id:10,title:'资产核算'},{id:7,title:'项目物资'}],
	url:"xxxxxxxxx",
	level:3
},{
	id:7,
	title: '项目',
	bloodID:[{id:8,title:'规划'},{id:10,title:'项目成本控制'},],
	url:"xxxxxxxxx",
	level:3
},{
	id:8,
	title: '综合管理',
	bloodID:[],
	url:"xxxxxxxxx",
	level:3
},{
	id:9,
	title: '资产',
	bloodID:[{id:10,title:''},],
	url:"xxxxxxxxx",
	level:4
},{
	id:10,
	title: '财务',
	bloodID:[{id:11,title:'经营管理费用'},],
	url:"xxxxxxxxx",
	level:4
},{
	id:11,
	title: '人员与组织',
	bloodID:[],
	url:"xxxxxxxxx",
	level:4
}]