
var data=[{
      name:'A',
      son:[]
},{
      name:'B',
      son:[{
            name:'B1'
      },{
            name:'B2'
      }]
}]


var group=[{
      type: 'route',
      id: '192.168.10.155',
      name:'zgsw1',
      status: 0,
      treeId:41270,
      son: [{
            type: 'switch',
            id: '192.168.10.205',
            name:'前置交换机#1',
            status: 0,
            treeId:40531,
            son:[{
                  type: 'route',
                  id: '192.168.10.156',
                  name:'专网路由器',
                  status: 0,
                  treeId:41272,
                  son:[]
            },{
                  type: 'firewall',
                  id: '192.168.10.153',
                  name:' DMZ防火墙#2',
                  status: 1,
                  treeId:41266,
                  son:[]
            }]
      },{
            type: 'switch',
            id: '192.168.10.203',
            name:'PMU交换机#1',
            status: 0,
            treeId:39919,
            son:[{
                  type: 'firewall',
                  id: '192.168.10.152',
                  name:' DMZ防火墙#1',
                  status: 0,
                  treeId:41221,
                  son:[]
            },{
                  type: 'switch',
                  id: '192.168.10.102',
                  name:'HP SAN交换机#2',
                  status: 0,
                  treeId:39685,
                  son:[]
            }]
      },{
            type: 'firewall',
            id: '192.168.10.151',
            name:'IDC防火墙#1',
            status: 1,
            treeId:38754,
            son:[{
                  type: 'switch',
                  id: '192.168.10.101',
                  name:'HP SAN交换机#2',
                  status: 0,
                  treeId:39684,
                  son:[]
            }]
      },{
            type: 'firewall',
            id: '192.168.10.151',
            name:'DMZ防火墙#1',
            status: 0,
            treeId:38754,
            son:[{
                  type: 'switch',
                  id: '192.168.10.105',
                  name:'Ⅱ区SAN交换机#1',
                  status: 0,
                  treeId:42368,
                  son:[]
            },{
                  type: 'switch',
                  id: '192.168.10.106',
                  name:'Ⅱ区SAN交换机#2',
                  status: 0,
                  treeId:42426,
                  son:[]
            }]
      }]
}]