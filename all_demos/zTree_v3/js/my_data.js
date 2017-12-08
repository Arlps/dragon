var data_templet = [{
	name: "",
	children: [{
		name: "",
		children: []
	}, {
		name: "",
		children: []
	}]
}];

//专题分类
var data_subject = [{
	name: "所有主题",
	children: [{
			name: "市场营销相关主题",
			children: []
		}, {
			name: "客户服务相关主题",
			children: []
		},
		{
			name: "人力资源相关主题 ",
			children: []
		},
		{
			name: "生产运行相关主题",
			children: []
		},
		{
			name: "企业管理相关主题",
			children: []
		},
		{
			name: "信息中心相关主题",
			children: []
		},
		{
			name: "远程中心系统",
			children: []
		},
		{
			name: "GIS系统",
			children: []
		},
		{
			name: "营销系统",
			children: []
		},
		{
			name: "计量自动化系统",
			children: []
		},
		{
			name: "海量准实时数据服务平台",
			children: []
		}
	]
}]

//来源分类
var data_source = [{
	name: "所有",
	children: [{
		name: "资产管理系统安全管理子系统",
		children: [{
			name: "操作票管理",
			children: []
		}, {
			name: "反措管理",
			children: []
		}, {
			name: "防污闪管理",
			children: []
		}, {
			name: "工作票管理",
			children: []
		}]
	}, {
		name: "资产管理系统项目子系统",
		children: []
	}, {
		name: "资产管理系统投资计划子系统",
		children: []
	}, {
		name: "调度自动化系统",
		children: []
	}, {
		name: "供电局配网自动化主站",
		children: []
	}, {
		name: "电能质量监控系统",
		children: []
	}, {
		name: "远程中心系统",
		children: []
	}, {
		name: "GIS系统",
		children: []
	}, {
		name: "营销系统",
		children: []
	}, {
		name: "计量自动化系统",
		children: []
	}, {
		name: "海量准实时数据服务平台",
		children: []
	}]
}]

var data_miss = [{
	name: "所有",
	children: [{
		name: "安全",
		children: []
	}, {
		name: "客户",
		children: []
	}, {
		name: "产品",
		children: []
	}, {
		name: "设备",
		children: []
	}, {
		name: "电网",
		children: []
	}, {
		name: "财务",
		children: []
	}, {
		name: "资产",
		children: []
	}, {
		name: "物资",
		children: []
	}, {
		name: "项目",
		children: []
	}, {
		name: "市场",
		children: []
	}, {
		name: "人员与组织",
		children: []
	}, ]
}];

//主题分类
var data_theme = [{
	name: "所有",
	children: [{
		name: "营配一体化",
		children: []
	}, {
		name: "规划管理",
		children: []
	}, {
		name: "数据质量管理",
		children: []
	}, {
		name: "资产全生命周期分析",
		children: []
	}, {
		name: "企业决策支持",
		children: []
	}, {
		name: "线损精益化分析",
		children: []
	}, {
		name: "设备缺陷分析",
		children: []
	}]
}];

var data_system = {
	'name': '<i class="fa fa-sitemap"></i>',
	'title': '资产管理系统安全生产子系统系统',
	'info': '表总数:12 相关系统数:2',
	'children': [{
			'name': '<i class="fa fa-sitemap"></i>',
			'title': '海量准实时数据服务平台',
			'info': '表总数:12 相关系统数:2'
		},
		{
			'name': '<i class="fa fa-sitemap"></i>',
			'title': 'GIS系统',
			'info': '表总数:12 相关系统数:2',
			'children': [{
				'name': '<i class="fa fa-sitemap"></i>',
				'title': '营销系统',
				'info': '表总数:12 相关系统数:2'
			}]
		},
		{
			'name': '<i class="fa fa-sitemap"></i>',
			'title': '资产管理系统项目子系统',
			'info': '表总数:12 相关系统数:2'
		},
		{
			'name': '<i class="fa fa-sitemap"></i>',
			'title': '资产管理系统计划投资子系统',
			'info': '表总数:12 相关系统数:2'
		},
		{
			'name': '<i class="fa fa-sitemap"></i>',
			'title': '远程中心系统',
			'info': '表总数:12 相关系统数:2',
			'children': [{
					'name': '<i class="fa fa-sitemap"></i>',
					'title': '广东省气象台气象系统',
					'info': '表总数:12 相关系统数:2'
				},
				{
					'name': '<i class="fa fa-sitemap"></i>',
					'title': '南方中心气象遥感系统',
					'info': '表总数:12 相关系统数:2'
				},
				{
					'name': '<i class="fa fa-sitemap"></i>',
					'title': '雷电定位系统',
					'info': '表总数:12 相关系统数:2'
				},
				{
					'name': '<i class="fa fa-sitemap"></i>',
					'title': '输电线路故障精确定位系统',
					'info': '表总数:12 相关系统数:2'
				}
			]
		},
	]
};

//指标
var data_index = [{
	name: "全部分类",
	children: [{
		name: "贷款",
		children: []
	}, {
		name: "存款",
		children: []
	}, {
		name: "资金交易",
		children: []
	}, {
		name: "财会及资金业务",
		children: []
	}, {
		name: "发行债券",
		children: []
	}, {
		name: "支付结算",
		children: []
	}, {
		name: "权益投资",
		children: []
	}, {
		name: "证券业务",
		children: []
	}, {
		name: "受托代理",
		children: []
	}, {
		name: "担保与承诺",
		children: []
	}, {
		name: "信托合作业务",
		children: []
	}, {
		name: "财务分析",
		children: []
	}, {
		name: "纪检监察",
		children: []
	}, ]
}];

//首页布局数据
var data_frame = [{
name: "资源树",
children: [{
		name: "专题资源",
		children: [{
			name: "热门专题Top10",
			children: []
		}, {
			name: "我关注的专题",
			children: []
		}, {
			name: "重点专题",
			children: []
		}, {
			name: "已接入上层应用",
			children: []
		}]
	}, {
		name: "库表资源",
		children: [{
			name: "热门库表Top10",
			children: []
		}, {
			name: "我关注的库表",
			children: []
		}, {
			name: "已接入源系统",
			children: []
		}, {
			name: "系统血缘图",
			children: []
		}]
	}, {
		name: "应用系统使用情况",
		children: [{
			name: "各系统本年各月访问人次",
			children: []
		}, {
			name: "各系统访问人次Top10",
			children: []
		}, {
			name: "各时间点系统访问热度",
			children: []
		}]
	}, {
		name: "应用中心情况",
		children: [{
			name: "各地市占用资源Top10",
			children: []
		}, {
			name: "近7天调度执行情况",
			children: []
		}]
	}, {
		name: "指标资源",
		children: []
	}]
}];

//组织管理  树数据
var data_organization = [{
	name: "全部",
	children: [{
		name: "广州市电网",
		children: [{
			name: "营业中心",
			children: []
		}, {
			name: "工程中心",
			children: []
		}, {
			name: "财务中心",
			children: []
		}]
	}]
}];


var data_tags= [{
	name: "ALL",
	children: [{
		name: "标注1",
		children: []
	}, {
		name: "标注2",
		children: []
	}, {
		name: "标注3",
		children: []
	}]
}];

var data_category= [{
	name: "物资管理",
	children: [{
		name: "计划与需求预测",
		children: [{
			name: "需求管理",
			children: []
		}]
	}, {
		name: "采购与供应商",
		children: [{
			name: "采购管理",
			children: []
		},{
			name: "合同管理",
			children: []
		},{
			name: "供应商管理",
			children: []
		}]
	}, {
		name: "履约品控",
		children: []
	}, {
		name: "仓储配送",
		children: []
	}, {
		name: "逆向物流",
		children: []
	}, {
		name: "其他",
		children: []
	}]
}]

var data_function=[{
	name: "资产管理系统安全管理子系统",
	children: [{
		name: "操作票管理",
		children: [{
			name: "反措管理",
			children: []
		},{
			name: "防污闪管理",
			children: []
		},{
			name: "工作票管理",
			children: []
		},{
			name: "防误闭锁装置使用管理",
			children: []
		},{
			name: "管理计划",
			children: []
		},{
			name: "工器具",
			children: []
		},{
			name: "生产设备信息管理",
			children: []
		},{
			name: "缺陷管理",
			children: []
		},{
			name: "作业表单",
			children: []
		},{
			name: "停电检修管理",
			children: []
		},{
			name: "跳闸管理",
			children: []
		},{
			name: "事故(事件)管理",
			children: []
		},{
			name: "设备台账管理",
			children: []
		}]
	}]
}];

var data_company = [{
	name: "企业决策支持",
	children: [{
		name: "（生产域）-设备健康档案-设备健康值评价",
		children: [{
			name:"主变压器健康值分析",
			children:[]
		}]
	}, {
		name: "（生产域）-设备健康档案-设备类型",
		children: [{
			name:"主变压器设备类型视图展示",
			children:[]
		}]
	}, {
		name: "（生产域）-设备健康档案-设备视图",
		children: [{
			name:"输电设施层级设备视图",
			children:[]
		}]
	}]
}];

//血缘关系数据
var data_blood = {
	node: ["远程中心系统营销系统", "GIS系统", "广东省气象台气象系统", "调度自动化系统", "电压监测系统", "输电线路覆冰监测系统", "计量自动化系统", "供电局配网自动化主站", "资产管理系统", "雷电定位系统", "变电站视频监控系统", "输电线路故障精确定位系统", "海量准实时数据服务平台", "南方卫星遥感中心气象遥感系统", "雷电定位系统", "营销系统"],
	link: [
		[0, 11],
		[1, 11],
		[2, 11],
		[3, 11],
		[13, 11],
		[15, 11],
		[12, 11],
		[4, 9],
		[14, 9],
		[5, 10],
		[6, 10],
		[7, 10],
		[8, 10]
	]
}

//血缘关系颜色
var data_rgbColor = ["145,232,225", "224,91,91", "43,144,143", "228,211,84", "241,92,128", "128,133,233", "247,163,92", "144,237,125", "67,67,72", "124,181,236"];
console.log(data_rgbColor)