(function(){	
	var wininfo=[];
	/* 基本url,后台接口的入口文件改变则同时更改这里就可以不影响js里的url了,但是控制器和方法如果更改了则每个单独的应用对应的字面url也必须更改 */
	//var baseurl='/index.php/Admin/',
	var maxrltcount=10,
			minclicktime=200,
			wincount=0,
			maxwincount=6,
			winbox,winbttm;
	wm.load(function(){
		winbox=w('#content')[0];
		winbttm=w('.bottom')[0];
		//绑定窗口显示和隐藏事件
		winbttm.addact('click',function(e){
			var etar=wm.gettarget(e);
			//console.log(etar);
			if(etar.clss('small',true)){
				if(etar.clss('focus_small',true)){
					//etar.att('style')=focus_smallbg;
					etar.obj.tosmall();
				}else{
					//console.log(etar.att('style'));
					etar.obj.tobig();
				}
			}
		});
	});
	function showwin(url,tit){
		tit = tit || '新建窗口';
		var _self=this;
		if(wincount>=maxwincount){
			alert('您已经打开'+(maxwincount-1)+'个窗口啦,请先关闭一些无用窗口再打开新的窗口');
			return;
		}
		//分别创建大小窗口
		wincount++;
		_self.win=wm.createnode('div','<img src="/Public/Admin/img/onsub.gif" style="width:200px;margin:100px audo;" /><span class="close windowclose">关闭×</span>').clss('mywindow').moveto(winbox);
		_self.win.style.height=(window.innerHeight - 150)+'px';
		_self.small=wm.createnode('div',tit).moveto(winbttm).clss('small','add');
		
		//关联大小窗口
		_self.win.small=_self.small;
		_self.win.obj = _self;
		_self.small.big=_self.win;
		_self.small.obj=_self;
		//console.log(url);
		wm.show({
			'url':url,
			'dis':_self.win,
			'callback':function(dis){
				_self.tobig();
				_self.evaljs(url);
				
			},
			'inner':"<span class='windowtit'>"+tit+"</span>"+"<span class='windowtosmall'>最小化</span><span class='windowrefresh'>刷新</span><span class='close windowclose'>关闭×</span>"
		});
		_self.focusact();
		_self.tobig();
		//窗体移动没写,晚些再写
	}
	showwin.prototype.focusact=function(){
		var _self=this;
		_self.win.addact('mouseover',function(e){
			if(!_self.small.clss('focus_small',true)) _self.tobig();
		},false);
		//聚焦到win上时转化为当前窗体
		_self.win.addact('focus',function(e){
			if(!_self.small.clss('focus_small',true)) _self.tobig();
		},false);
	}
	showwin.prototype.tobig=function(){
		var _self=this;
		_self.win.style.visibility='visible';
		w('#content>.mywindow').clss('focus-mywindow','del');
		_self.win.clss('focus-mywindow','add');
		if(_self.win.editoropt){
			KindEditor.remove(_self.win.w('textarea[name="ctt"]')[0]);
			KindEditor.create(_self.win.w('textarea[name="ctt"]')[0], _self.win.editoropt);
		}
		
		
		winbttm.w('.small').clss('focus_small','del');
		_self.small.clss('focus_small','add');
	}
	showwin.prototype.tosmall=function(){
		var _self=this;
		//alert(123123123213);
		_self.win.style.visibility='hidden';
		//winbttm.w('.small')[0].att('style','background-color:#00a');
		_self.win.clss('focus-mywindow','del');
		_self.small.clss('focus_small','del');
		//if(_self.win.editoropt) KindEditor.remove(_self.win.w('textarea[name="ctt"]')[0]);
		
	}
	showwin.prototype.close=function(){
		var _self=this;
		wincount--;
		_self.win.moveto();
		_self.win=undefined;
		_self.small.moveto();
		_self.small=undefined;
		_self=undefined;
	}
	showwin.prototype.reload=function(){
		var _self=this;
		//删除原有窗口
		wincount--;
		var url = _self.win.att('href');
		var tit = _self.small.innerHTML;
		_self.win.moveto();_self.small.moveto();
		return new showwin(url,tit);//创建新的窗口并返回
	}
	showwin.prototype.getCA=function(url){
		//console.log(url);
		//console.log(reg);
		urlreg.lastIndex=0;
		return urlreg.exec(url);
	}
	showwin.prototype.evaljs=function(url){
		var _self=this;
		var prers=_self.getCA(url);
		//console.log(prers);
		if(!prers) prers={};
		if(!prers[1]) prers[1]='index';
		if(prers[1]=='index' && !prers[2]) prers[2]='index';
		//console.log(prers[1]);console.log(prers[2]);
		var c_a=prers[1].toLowerCase()+'_'+prers[2].toLowerCase();
		if(htmljs[c_a]) htmljs[c_a](_self.win);
	}
	showwin.getnowwin=function(){
		return w('.bottom .focus_small')[0].obj;
	}
	
	
	
	function rlt(opt){
		var _self=this;
		_self.type=opt.type;
		_self.nowdiv=opt.nowdiv;
		_self.disstr=opt.disstr;
		//console.log(opt.disstr);
		_self.nodeopt=opt.nodeopt;
		_self.rltdiv = wm.createnode('div','<img src="/Public/Admin/img/onsub.gif" style="width:200px;margin:100px audo;" /><i>×</i>').clss('selectcontain').moveto(_self.nowdiv.w('>div')[0]);
		//绑定点击关闭窗口的回调事件和关联事件
		_self.rltdiv.addact('click',function(e){
			var etar=wm.gettarget(e);
			if(etar.clss('closeforselected',true) && etar.parentNode==this){
				wm.stopprop(e);
				/* 更新disstr的内容 */
				_self.close();
			}else if(etar.clss('choise',true) && etar.nodeName=='SPAN'){
				wm.stopprop(e);
				if(_self.checkinput(etar)){
					var newnode=rlt.urlobj[_self.type]['checkadd'](opt.nodeopt,etar,_self.rltdiv);
					if(newnode) newnode.moveto(_self.rltdiv.w('>.selected')[0]);
				}
			}
		});
		//显示关联的内容
		_self.showselect();
	}
	rlt.prototype.close=function(){
		var _self=this;
		
		//返回已筛选的数据
		_self.nowdiv.w(_self.disstr)[0].innerHTML=_self.rltdiv.w('>div.selected')[0].innerHTML;
		
		//模拟点击事件,后续用来触发对应的事件,
		setTimeout(function(){
			if(_self.nowdiv.w(_self.disstr)[0].w('input').length>0) _self.nowdiv.w(_self.disstr)[0].w('input')[0].click();
		},minclicktime); 
		/* 窗口销毁 */
		_self.rltdiv.moveto();
	}
	rlt.checkfllmt=function(etar,fllmt){
		//检测是否是某一指定分类下的分类
		var lvarr = [etar.att('l1')];
		if(etar.att('l2')){
			lvarr.push(etar.att('l2'));
			if(etar.att('l3')) lvarr.push(etar.att('l3'));
		}
		var canchoise = false ;
		for( var i=0;i<lvarr.length;i++){
			//fllmt
			canchoise = canchoise || (wm.is_in(lvarr[i],fllmt)>-1);
		}
		if(!canchoise){
			//alert('请按要求选择相应的内容');
			return false;
		}else{
			return true;
		}
	};
	rlt.createtextnode=function(etar,name,count){
		//console.log(name);
		var name = (count==1 ? name : (name + '[]'));
		//console.log(name);
		var valuestr = '<span title="' + etar.att('title') + '">' + etar.att('title') + '</span>' + '<i title="删除">×</i><input name="' + name + '" value="' + etar.att('rltvalue') + '" type="hidden" />';
		return wm.createnode('div',valuestr);
	}
	rlt.prototype.checkinput=function(etar){
		var _self=this;
		var value = etar.att('rltvalue');
		var inputlist = _self.rltdiv.w('>.selected input');
		var isselected = false;
		for(var ik=0;ik<inputlist.length;ik++){
			if(inputlist[ik].value == value){
				isselected = true;
				break;
			}
		}
		if(isselected){
			alert('请不要重复选择');
			return false;
		}
		if(!(inputlist.length<_self.nodeopt.count)){
			alert('您只可以选择' + _self.nodeopt.count + '个目标,如需更改请删除原有选择');
			return false;
		}
		return true;
	};
	
	rlt.urlobj={
		'fl':{
			'url':baseurl+'Fl/getfllist.html',
			'callback':function(dis){
				//无回调
			},
			'checkadd':function(nodeopt,etar){
				if(wm.is_in(etar.att('level'),nodeopt.levelarr)<0){
					alert('您只可以选择指定级别、指定类型的分类');
					return false;
				}
				//生成关联分类节点
				if(nodeopt.fllmt && !rlt.checkfllmt(etar,nodeopt.fllmt)){
					alert('请按要求选择相应的分类');
					return false;
				}
				return rlt.createtextnode(etar,nodeopt.name,nodeopt.count);
			},
		},
		'art':{
			'url':baseurl+'Art/index.html',
			'callback':function(rltdiv){//这里的dis会是rlt实例化后的this.rltdiv
				var dis = 'Art/artlist.html';
				arthead(dis,rltdiv);
			},
			'checkadd':function(nodeopt,etar){
				if(nodeopt.fllmt && !rlt.checkfllmt(etar,nodeopt.fllmt)){
					alert('请按要求选择相应的内容');
					return false;
				}
				return rlt.createtextnode(etar,nodeopt.name,nodeopt.count);
			},
		},
		'rs':{
			'url':baseurl+'Rs/index.html',
			'callback':function(rltdiv){//这里的dis会是rlt实例化后的this.rltdiv
				//rsmanage(opt.nowdiv);//
				//console.log(rltdiv);
				htmljs['rs_index'](rltdiv);
			},
			'checkadd':function(nodeopt,etar,rltdiv){
				var rstype=etar.att('rstype');
				var rstypelist = nodeopt.rstypelist || {'img':4,'video':4,'doc':4};
				var typenum = rltdiv.w('>.selected input[rstype="'+rstype+'"]').length;
				if(rstypelist[rstype] &&  typenum < rstypelist[rstype] ){
					//console.log(123123);
					var name = nodeopt.count==1 ? nodeopt.name : nodeopt.name + '[]';
					var newdiv = wm.addkv(etar.parentNode).previousnode().cloneNode(true);
					wm.addkv(newdiv);
					newdiv.innerHTML += '<input type="hidden" name="' + name + '" value="'+etar.att('rltvalue')+'" rstype="' + rstype + '" /><i title="删除">×</i>';
					return newdiv;
				}else{
					alert('请安说明文档选择相应的资源');
					return false;
				} 
			},
		},
		/* 'mark':{
			'url':baseurl+'Index/soluhy.html?getlist=1',
			'callback':function(rltdiv){//这里的dis会是rlt实例化后的this.rltdiv
			},
			'checkadd':function(nodeopt,etar){
				return rlt.createtextnode(etar,nodeopt.name,nodeopt.count);
			},
		}, */
	};
	rlt.prototype.showselect=function(){
		var _self=this;
		var obj=rlt.urlobj[_self.type];
		//console.log(_self.nowdiv);console.log(_self.disstr);
		var hadctt = _self.nowdiv.w(_self.disstr)[0].innerHTML;
		var innerstr = "<span class='closeforselected'>确认关闭×</span><div class='hadchoise'>已选择</div><div class='selected rsrs'>" + hadctt + "</div>";
		wm.show({
			'url':obj.url,
			'dis':_self.rltdiv,
			'inner':innerstr,
			'callback':obj.callback,
		});
	}
	//window.rlt=rlt;
	
	
	//artmanage要拆分一下,分为头部和编辑,头部可以载入不同的列表页方便选择
	function arthead(dis,nowdiv){
		var disurl = baseurl + (dis ? dis : 'Art/manage.html' );
		wm.show({
			'url':disurl,
			'dis':nowdiv.w('>.mh>.artlist')[0],
		});
		function resetstyle(index){
			disdiv = nowdiv.w('.artlisthead')[0];
			disdiv.w('span').att('style','background-color:#fff');
			disdiv.w('span')[index].att('style','background-color:#0a0;color:#fff;');
			if(index!=1) disdiv.w('.flrst')[0].innerHTML='';
			if(index!=2) disdiv.w('.condition input')[0].value='';
		}
		nowdiv.w('.artlisthead')[0].addact('change',function(e){
			var etar=wm.gettarget(e);
			if((etar.name=='skey') && etar.value.length>0){
				var adisurl= disurl +  '?' + etar.name + '=' + etar.value ;
				wm.show({'dis':nowdiv.w('.artlist')[0],'url':adisurl});
				resetstyle(2);
			}
		});
		nowdiv.w('.artlisthead')[0].addact('click',function(e){
			var etar=wm.gettarget(e);
			if(etar.nodeName=='SPAN'&&etar.innerHTML=='全部'){
				html.prototype.reloaddis(nowdiv.w('.artlist')[0],disurl);
				resetstyle(0);
			}else if(etar.nodeName=='SPAN'&&etar.innerHTML=='分类'){
				new rlt({
					'type':'fl',
					'nowdiv':nowdiv,
					'disstr':'.flrst',
					'nodeopt':{'name':'flid','levelarr':[1,2,3],'count':1,}
				});
				resetstyle(1);
				//重置样式
			}else if(etar.name=='flid'){
				//这里通过模拟点击事件发生的
				var adisurl=disurl + '?' + etar.name + '=' + etar.value ;
				wm.show({
					'url':adisurl,
					'dis':nowdiv.w('.artlist')[0],
				});
				resetstyle(1);
				//重置样式
			}
		});
	}
	function artmanage(nowdiv){
		//var nowdiv=w('#content>div:last-child>.mh')[0];
		function editart(data){
			var ajaxobj={
				'url':baseurl + 'Art/saveart.html',
				'method':'post',
				'success':function(t){
					if(t!='success') alert(t);
				},
				'data':data,
				'error':function(t){
					alert(t);
				}
			}
			wm.ajax(ajaxobj);
		}
		if(nowdiv.w('>.mh>.artlist').length>0) nowdiv.w('>.mh>.artlist')[0].addact('click',function(e){
			//console.log(e);
			var etar=wm.gettarget(e);
			//console.log(etar.nodeName);
			var data=undefined;
			if(etar.nodeName=='A' && etar.innerHTML=='编辑'){
				var editurl=etar.href;
				new showwin(editurl,etar.innerHTML);
			}else if(etar.nodeName='SPAN' && etar.innerHTML=='隐藏' ){
				var artid=etar.parentNode.getAttribute('artid');
				data={'artid':artid,'ct':99};
				editart(data);
				data=undefined;
			}else if(etar.nodeName=='B'){
				//console.log(123123);
				new showwin(etar.att('href'),'特做'+etar.innerHTML);
			}else if(etar.nodeName=='A' && etar.innerHTML =='删除'){
				if(!confirm('确定要删除吗?确定文章和对应的关联、标签、产品参数等都将被删除')) return;
				//var artid = etar.parentNode.getAttribute('artid');
				var delajax={
					'url':etar.href,
					'success':function(t){
						if(t=='success'){
							html.prototype.reloaddis(nowdiv.w('.artlist')[0]);
						}else{
							alert(t);
						}
					},
					'error':function(t){
						alert(t);
					}
				}
				wm.ajax(delajax);
			}else if(etar.clss('seo',true)){
				//console.log(etar.parentNode);
				wm.addkv(etar.parentNode).w('.art-seo')[0].style.display='block';
			}else if(etar.clss('seoclose',true)){
				etar.parentNode.style.display='none';
			}
		});
		nowdiv.w('>.mh>.artlist')[0].addact('change',function(e){
			var etar=wm.gettarget(e);
			var data=undefined,artdis;
			//var artid=etar.parentNode.getAttribute('artid');
			if(etar.parentNode.className=='art'){
				artdis=etar.parentNode;
			}else{
				artdis=etar.parentNode.parentNode.parentNode;
			}
			var artid=artdis.getAttribute('artid');
			data={'artid': artid} ;
			data[etar.name]=etar.value;
			editart(data);
			data=undefined;
		});
	}
	
	function addart(fflidlmt,fllmt,nowdiv,fromtype){
		//var nowdiv = w('#content>div:last-child>div.mh')[0];
		activeload(3,nowdiv);
		/* 关联资源 */
		if(nowdiv.w('form div.relation.rs').length>0) nowdiv.w('form div.relation.rs')[0].addact('click',function(){
			var rltrsopt={
				'type':'rs',
				'nowdiv':nowdiv,
				'nodeopt':{'name':"rlt[rs]",'count':14,'rstypelist':{'img':4,'video':4,'doc':6,}},//给选择事件的参数
				'disstr':'form div.rltrs.cl.rsrs',
			}
			new rlt(rltrsopt);
		});
		/* 关联内容 可选 */
		if(nowdiv.w('form div.relation.art').length>0) nowdiv.w('form div.relation.art')[0].addact('click',function(){
			var opt={
				'type':'art',
				'nodeopt':{'name':"rlt[art]",'count':16,'fllmt':fllmt},//给选择事件的参数
				'nowdiv':nowdiv,
				'disstr':'form div.rltart.cl.lh',
			}
			new rlt(opt);
		});
		/* 父分类相关的事件绑定 */
		if(nowdiv.w('form span.choiseffl')[0]) nowdiv.w('form span.choiseffl')[0].addact('click',function(){
			var levelarr=(fromtype=='fl' ? [1,2] : [3]);
			var ffl_opt={
				'type':'fl',
				'nowdiv':nowdiv,
				'nodeopt':{'levelarr':levelarr,'count':1,'name':'fid','fllmt':fflidlmt},
				'disstr':'form div.ffl',
			};
			new rlt(ffl_opt);
		}); 
		//兼容分类相关事件绑定
		if(nowdiv.w('form span.choiseoldffl')[0]) nowdiv.w('form span.choiseoldffl')[0].addact('click',function(){
			var oldffl_opt={
				'type':'fl',
				'nowdiv':nowdiv,
				'nodeopt':{'levelarr':[3],'count':1,'name':'oldfid','fllmt':[6]},
				'disstr':'form div.oldffl',
			};
			new rlt(oldffl_opt);
		}); 
		/* 标签关联绑定 */
		if(nowdiv.w('form>div>div.relation.artmark').length>0) nowdiv.w('form>div>div.relation.artmark')[0].addact('click',function(){
			new rlt({
				'type':'fl',
				'nowdiv':nowdiv,
				'nodeopt':{'levelarr':[3],'fllmt':[251],'count':12,'name':'hy',},
				'disstr':'form>div.artmark.cl.lh',
			});
		});
		//封面
		if(nowdiv.w('.choisecover').length>0) nowdiv.w('.choisecover')[0].addact('click',function(){
			var opt={
				'type':'rs',
				'nodeopt':{'name':'rs_id','count':1,'rstypelist':{'img':1}},//给选择事件的参数
				'nowdiv':nowdiv,
				'disstr':'div.cover.rsrs',
			}
			new rlt(opt);
		});
		//产品属性绑定,可选
		if(nowdiv.w('a.prokv.bttn').length>0) nowdiv.w('a.prokv.bttn')[0].addact('click',function(){
			var url=this.href;
			new showwin(url,this.innerHTML);
		});
	}
	function rsmanage(nowdiv){
		//nowdiv.w('.rsrs').addact('click',playvideo);
		nowdiv.w('.upct')[0].addact('click',function(e){
			var dist=wm.gettarget(e);
			var updiv=nowdiv.w('.upfile')[0];
			var str=undefined;
			switch(dist.innerHTML){
				case '上传图片':
					str=rsmanage.view.img;
					break;
				case '上传视频':
					str=rsmanage.view.video;
					break;
				case '上传其它文件':
					str=rsmanage.view.doc;
					break;
				default:
			}
			if(str!=undefined){
				w('.upct span').att('style','');
				dist.att('style','background-color:rgba(120,120,120,.8)');
				updiv.innerHTML = str;
			}
		});
		/* 文件选择器事件 */
		nowdiv.w('.upfileform')[0].addact('change',function(e){
			var etar=wm.gettarget(e);
			etar.parentNode.style.backgroundColor='#8cf07b';
			if(etar.type=='file'){
				var dis=etar.parentNode.children[0];
				dis.innerHTML='已选择' + etar.files.length + '个文件';
				dis.style='color:#000;';
			}
		});
		/* 显示资源类型事件 */
		nowdiv.w('.condition')[0].addact('click',function(e){
			var etar = wm.gettarget(e);
			var rstypelist = ['all','img','video','doc'];
			var disurl = baseurl + 'Rs/rslist.html'
			if(etar.nodeName=='SPAN' && (wm.is_in(etar.att('viewtype'),rstypelist)>-1)){
				if(wm.is_in(etar.att('viewtype'),['img','video','doc'])>-1){
					disurl += '?rstype=' + etar.att('viewtype');
				}
				w('input',etar.parentNode)[0].value='';
				this.w('span').att('style','background-color:none;color:#000;');
				etar.att('style','background-color:#0a0;color:#fff;');
				wm.show({'dis':nowdiv.w('.rslist')[0],'url':disurl,});
			}
		});
		/* 搜索事件 */
		nowdiv.w('.condition')[0].addact('change',function(e){
			var etar = wm.gettarget(e);
			var disurl = baseurl + 'Rs/rslist.html'
			if(etar.att('name')=='skey'){
				disurl += '?skey=' + etar.value;
				this.w('span').att('style','background-color:none;color:#000;');
				wm.addkv(etar.parentNode).att('style','background-color:#0a0;color:#fff;');
				wm.show({'dis':nowdiv.w('.rslist')[0],'url':disurl,});
			}
		});
		/* 资源列表点击事件 也就是manage事件*/
		nowdiv.w('.rslist')[0].addact('click',function(e){
			var etar = wm.gettarget(e);
			//console.log(etar.att('src'));
			if(etar.nodeName=='SPAN' && etar.innerHTML=='删除' && etar.className=='del'){
				var ajaxobj={
					'url':baseurl + 'Rs/delfile.html?rsid=' + etar.parentNode.parentNode.getAttribute('rsid'),
					'success':function(t){
						alert( t == 'success' ? '删除成功' : t );
						wm.show({'dis':nowdiv.w('.rslist')[0],'url':nowdiv.w('.rslist')[0].att('href'),});
					},
					'error':function(t){
						alert(t);
					},
				};
				wm.ajax(ajaxobj);
			}
		});
		nowdiv.w('.rslist')[0].addact('change',function(e){
			/* 这里写ajax更新程序,暂时没用,后续添加 */
			var etar = wm.gettarget(e);
			var rsid = wm.addkv(etar.parentNode.parentNode).att('rsid');
			var data={rsid:rsid};
			data[etar.att('name')]=etar.value;
			wm.ajax({
				method:'post',
				url:baseurl + 'Rs/saversinfo.html',
				data:data,
				success:function(t){
					alert(t=='success' ? '操作成功' : t);
				},
				error:function(t){
					alert(t);
				},
			});
		});
	};
	rsmanage.view={
		'img':"<input type='hidden' value='img' name='rstype' /><div class='choisefile'><span class='nhe'>请选择上传的图片</span><input type='file' multiple='multiple' name='src[]'  accept='image/gif,image/jpeg,image/png' /></div><div class='formct'><input placeholder='名称默认本地名称' name='rsname' type='text' /></div>",
		'doc':"<input type='hidden' value='doc' name='rstype' /><div class='choisefile'><span class='nhe'>请选择上传的文件</span><input type='file' name='src[]' multiple='multiple' /></div><div class='formct'><input placeholder='名称默认本地名称' name='rsname' type='text' /></div>",
		'video':"<input type='hidden' value='video' name='rstype' /><div class='choisefile'><span class='nhe'>请选择视频的封面</span><input type='file' name='src' accept='image/gif,image/jpeg,image/png'  /></div><div class='choisefile'><span class='nhe'>请选择视频格式1</span><input type='file' name='src1' accept='video/mp4,video/ogg' /></div><div class='choisefile'><span class='nhe'>请选择视频格式2</span><input type='file' name='src2' /></div><div class='formct'><input placeholder='名称默认本地名称' name='rsname' type='text' /></div>",
	};
	
	//加载富文本编辑器
	function loadeditor(nowdiv,hadmyimg,lenwidth){
		hadmyimg = hadmyimg || false;
		var opt= {
			basePath:'/Public/editor/',
			width:'680px',
			height:'300px',
			resizeType : 1,
			filterMode : false,
			allowPreviewEmoticons : false,
			allowImageUpload : false,
			afterBlur:function(){
				//同步数据
				//this指编辑器
				//console.log(this.html());
				this.sync();
			},
			items : ['fontname', 'fontsize', 'forecolor','bold','formatblock','underline','indent','outdent','lineheight','removeformat', '|',
			'justifyleft', 'justifycenter', 'justifyright','justifyfull',/*  'insertorderedlist','insertunorderedlist', */'removeformat','|',
			'link','|','source','undo','redo','quickformat',,'|','plainpaste','wordpaste','|','preview','fullscreen'],
			fontSizeTable:['0.4rem','0.6rem','0.8rem','1rem','1.2rem','1.4rem','1.6rem','1.8rem','2.0rem'],
			colorTable:[
				['#333','#dd3c13','#777','#2783C6'],
			],
			pasteType:1,
		};
		if(hadmyimg){
			opt.items.splice(18,0,'myimg');
			if(!lenwidth) opt.width='800px';
		}else{
			if(lenwidth) opt.width='800px';
		}
		//delete(opt.items);
		nowdiv.editoropt=opt;
		KindEditor.create(nowdiv.w('textarea[name="ctt"]')[0], opt);
		/*
		if(typeof KindEditor != 'undefined'){
			setTimeout(function(){
				KindEditor.create(w('textarea[name="ctt"]')[0], opt);
			},50); 
		}else{
			var ajaxobj={
				url:'/Public/editor/kindeditor-min.js',
				success:function(t){
					window.eval(t);
					setTimeout(function(){
						KindEditor.create(w('textarea[name="ctt"]')[0], opt);
					},50); 
				},
			};
			wm.ajax(ajaxobj);
		}*/
	}
	

	function activeload(m,windowdis,reloaddis){
		var forms=windowdis.w('form');
		/* //添加表单自动验证事件 */
		for(var k = 0;k<forms.length;k++){
			/* //表单验证规则要写在表单上,格式为"(json对象)"就是用括号和双引号把对象包围起来再eval; */
			if(forms[k].att('ruler')) wm.formcheck(forms[k],eval(forms[k].att('ruler')));
			/* 有ruler则添加自动验证事件,先把服务器直接传过来的json字符串转化为ruler对象传递给表单校验函数,校验函数内部会把ruler对象赋值给form的ruler属性,所以走了个闭环一样的流程 */
		
			/* console.log(forms[k].preventsubmit); */
		/* //绑定提交表单事件以及提交表单回调; */
		/* 注意这里不能用if(forms[k].w('input.mysub'))这样的判断,是必定存在的,因为w函数的返回对象是一个类数组对象,该对象有length参数,如果length为0则为空,所以可以用length>0来做判断 */
			if(forms[k].w('input.mysub').length>0) forms[k].w('input.mysub')[0].addact('click',function(){
				
				var subform = this.form;
				/* //判断表单是否允许提交,如果允许则用ajax提交 */
				/* console.log(subform); */
				if(subform.preventsubmit != true){
					//提交一次后置为不可提交,在ajax回调中写这个属性的后续动作,防止重复提交;
					subform.att('preventsubmit',true);
					var ajaxobj = {
						'url':subform.action,
						'data':wm.getformdata(subform),
						'method':subform.method,
						'success':function(t){
							/* //需要表单提交的事件回调,简单的数据传输的回调不统一设定,各个页面自行酌情处理 */
							var mark=undefined;
							if(windowdis.w('div.onup').length>0) windowdis.w('div.onup')[0].moveto();
							switch(m){
								case 1:
									/* //刷新页面 */	
									alert(t=='success' ? '操作成功,将刷新页面' : t);
									window.location.reload(true);
									break;
								case 2:
									/* 退出重新登录 */
									alert(t=='success' ? '操作成功,即将退出登录,请重新登录' : t);
									window.location.href = baseurl + 'Base/out.html';
									break;
								case 3:
									/* //重新加载当前'窗口'*/
									if(t!='success' && !confirm(t+'出现错误,是否确定刷新当前窗口')){
										subform.att('preventsubmit',false);
										return;
									}										
									windowdis.obj.reload();
									break;
								case 4 :
								console.log(reloaddis);
									reloaddis.innerHTML=t;
								case 5 :
								/* do nothing ,这里窗口上的表单还在,要给表单添加允许提交属性*/
								//修改为将返回值显示在指定节点
									subform.att('preventsubmit',false);
									reloaddis.innerHTML=t;
									break;
								case 6:
								/* 在制指定的.mark上显示提示 */
								/* 允许表单提交 */
									subform.att('preventsubmit',false);
									/* 标识操作成功 */
									var mark = t==undefined ? '操作成功' : t;
									windowdis.w('.mark')[0].innerHTML = mark;
									break;
								case 7:
								/*重载页面指定的部分*/
									wm.show({'dis':reloaddis,'url':reloaddis.att('href')});
									if(t!='success') alert(t);
									break;
								case 8:
									//当前窗体关闭
									alert(t=='success' ? '操作成功将关闭当前窗体' : t);
									windowdis.obj.close();//关闭窗口要减去窗口数量
									break;
								default:
									alert('出现错误');
									window.location.href =baseurl + 'Base/out.html';
							}
						},
						'error':function(t){
							/* //失败则弹出返回的提示语并重置表单,删除提交中图片,允许提交标示; */
							//console.log(w('#content>div:last-child>div:last-child')[0]);
							windowdis.w('div.onup')[0].moveto();//传输动画消失
							/* this.att('preventsubmit',false); */
							windowdis.w('form')[0].att('preventsubmit',false);
							alert('加载失败'+(t || ''));
						}
					}
					//判断是否是文件上传事件,如果是文件上传事件则设置上传对象的相应属性为true;
					if(subform.enctype=='multipart/form-data' && subform.w('input[type="file"]').length>0) ajaxobj.isupload = true;
					//创建传输动画
					wm.createnode('div','<img src="/Public/Admin/img/onsub.gif" class="onup_i" />').clss('onup').moveto(windowdis);
					wm.ajax(ajaxobj);
				}
			});
		}
	}

	
	var htmljs={
		'rs_replace':function(nowdiv){
			activeload(3,nowdiv);
			var view={
				'img':"<input type='hidden' value='img' name='rstype' /><div class='choisefile'><span class='nhe'>请选择上传的图片</span><input type='file' name='src[]'  accept='image/gif,image/jpeg,image/png' /></div><div class='formct'><input placeholder='名称默认本地名称' name='rsname' type='text' /></div>",
				'doc':"<input type='hidden' value='doc' name='rstype' /><div class='choisefile'><span class='nhe'>请选择上传的文件</span><input type='file' name='src[]' /></div><div class='formct'><input placeholder='名称默认本地名称' name='rsname' type='text' /></div>",
				'video':"<input type='hidden' value='video' name='rstype' /><div class='choisefile'><span class='nhe'>请选择视频的封面</span><input type='file' name='src' accept='image/gif,image/jpeg,image/png'  /></div><div class='choisefile'><span class='nhe'>请选择视频格式1</span><input type='file' name='src1' accept='video/mp4,video/ogg' /></div><div class='choisefile'><span class='nhe'>请选择视频格式2</span><input type='file' name='src2' /></div><div class='formct'><input placeholder='名称默认本地名称' name='rsname' type='text' /></div>",
			};
			var rsdis = nowdiv.w('.rltrs.cl.rsrs')[0];
			var updis = nowdiv.w('form .upfile')[0];
			if(nowdiv.w('.replacect .bttn').length>0) nowdiv.w('.replacect .bttn')[0].addact('click',function(e){
				updis.innerHTML='';
				var opt={
					'type':'rs',
					'nodeopt':{'name':"rsid",'count':1,'rstypelist':{'video':1,'doc':1,'img':1,}},//给选择事件的参数
					'nowdiv':nowdiv,
					'disstr':'.rltrs.cl.rsrs',
				}
				new rlt(opt);
			});
			if(rsdis) rsdis.addact('click',function(e){
				var etar = wm.gettarget(e);
				if(etar.name=='rsid'){
					updis.innerHTML=view[etar.att('rstype')];
				}
			});
			nowdiv.w('form')[0].addact('change',function(e) {
			  var etar = wm.gettarget(e);
			  etar.parentNode.style.backgroundColor = '#8cf07b';
			  if (etar.type == 'file') {
				var dis = etar.parentNode.children[0];
				dis.innerHTML = '已选择' + etar.files.length + '个文件';
				dis.style = 'color:#000;';
			  }
			});
		},
		'user_index':function(nowdiv){
			wm.show({
				'url':baseurl + 'User/ulist.html',
				'dis':nowdiv.w('.usertb')[0],
				'callback':function(usertb){
					usertb.addact('change',function(e){
						var etar=wm.gettarget(e);
						var data={
							'userid':etar.att('userid'),
							'utype':etar.value,
						}
						var ajaxobj={
							'url':baseurl + 'User/edit.html',
							'data':data,
							'method':'post',
							'success':function(t){
								alert(t=='success' ? '操作成功' : t);
							},
							'error':function(t){
								alert(t);
							},
						}
						wm.ajax(ajaxobj);
					});
					usertb.addact('click',function(e){
						var etar=wm.gettarget(e);
						if(etar.nodeName=='A' && etar.innerHTML=='删除'){
							wm.ajax({
								'url':etar.href,
								'success':function(t){
									wm.show({'url':usertb.att('href'),'dis':usertb})
								},
								'error':function(t){
									alert(t);
								},
							});
						}
					});
				}
			});
		},
		'pro_edit':function(nowdiv){
			activeload(8,nowdiv);
			nowdiv.w('form')[0].addact('click',function(e){
				var etar=wm.gettarget(e);
				if(etar.className=='morekv bttn'){
					wm.createnode('div',"<input type='text' name='model[]' placeholder='型号' /><input type='text' name='prok[]' placeholder='参数名称' /><input type='text' name='prov[]' placeholder='参数值' /><span class='morekv bttn'>插入属性</span><i title='删除'>×</i>").clss('kvin').moveto(etar.parentNode,'before');
				}
			});
		},
		'pro_index':function(nowdiv){
			nowdiv.w('form')[0].addact('change',function(e){
				var etar=wm.gettarget(e);
				if(etar.name=='outtime') return;
				wm.ajax({
					'url':baseurl+'Pro/savemake.html',
					'data':{
						'prok':etar.att('prok'),
						'prov':etar.value,
						'model':etar.att('model'),
						'outtime':etar.form.outtime.value,
					},
					'method':'post',
					'success':function(t){
						if(t=='success') nowdiv.obj.reload();
						else alert(t);
					},
					'error':function(t){
						alert(t);
					}
				});
			});
		},
		'pro_makectt':function(nowdiv){
			activeload(3,nowdiv);
			loadeditor(nowdiv,false,false);
		},
		'index_banner':function(nowdiv){
			activeload(3,nowdiv);
		},
		'index_email':function(nowdiv){
			activeload(8,nowdiv);
		},
		'index_nav':function(nowdiv){
			activeload(8,nowdiv);
		},
		'art_askmanage':function(nowdiv){
			nowdiv.w('.bttn.addask')[0].addact('click',function(){
				new showwin(baseurl+'Art/addask',this.innerHTML);
			});
			artmanage(nowdiv);
		},
		'art_downmanage':function(nowdiv){
			nowdiv.w('.bttn.adddown')[0].addact('click',function(){
				new showwin(baseurl+'Art/adddown',this.innerHTML);
			});
			artmanage(nowdiv);
		},
		'art_adddown':function(nowdiv){
			addart([95],undefined,nowdiv);
			loadeditor(nowdiv,false,true);
		},
		'art_addask':function(nowdiv){
			addart([57],[8,7,15],nowdiv);
			loadeditor(nowdiv,true,true);
		},
		'art_addnews':function(nowdiv){
			addart([91],[8,7,15],nowdiv);
			loadeditor(nowdiv,true);
		},
		'art_addart':function(nowdiv){
				addart([9],undefined,nowdiv);
				loadeditor(nowdiv,true);
		},
		'art_addsolu':function(nowdiv){
			//console.log(123123);
				addart([7],[8,15],nowdiv);
				loadeditor(nowdiv);
		},
		'art_addpro':function(nowdiv){
			addart([8],[7,15,8],nowdiv);
			loadeditor(nowdiv);
		},
		'art_index':function(nowdiv){	
			arthead(undefined,nowdiv);
			artmanage(nowdiv);
		},
		'art_quickadd':function(nowdiv){
			//this.art_addpro(nowdiv);
			addart([8],[7,15,8],nowdiv);
		},
		'index_syctt':function(nowdiv){
			activeload(8,nowdiv);
			nowdiv.w('form span.forsoluvideo')[0].addact('click',function(){
				var opt={
					'type':'rs',
					'nodeopt':{'name':"soluvideo",'count':1,'rstypelist':{'video':1,}},//给选择事件的参数
					'nowdiv':nowdiv,
					'disstr':'form div.sysoluvideo',
				}
				new rlt(opt);
			});
			nowdiv.w('form span.forseevideo')[0].addact('click',function(){
				var opt={
					'type':'rs',
					'nodeopt':{'name':"seevideo",'count':1,'rstypelist':{'video':1,}},//给选择事件的参数
					'nowdiv':nowdiv,
					'disstr':'form div.syseevideo',
				}
				new rlt(opt);
			});
			nowdiv.w('form span.forproart')[0].addact('click',function(){
				var opt={
					'type':'art',
					'nodeopt':{'name':"proart[]",'count':8,'fllmt':[8]},//给选择事件的参数
					'nowdiv':nowdiv,
					'disstr':'form div.sysoluart',
				}
				new rlt(opt);
			});
			nowdiv.w('form span.forsoluart')[0].addact('click',function(){
				var opt={
					'type':'art',
					'nodeopt':{'name':"soluart[]",'count':4,'fllmt':[7]},//给选择事件的参数
					'nowdiv':nowdiv,
					'disstr':'form div.syproart',
				}
				new rlt(opt);
			});
		},
		'fl_addfl':function(nowdiv){
			//通用,可以选择所有的分类
			addart([6,7,9],undefined,nowdiv,'fl');
			loadeditor(nowdiv);
		},
		'fl_manage':function(nowdiv){
			function editfl(data){
				var ajaxobj={
						'url':baseurl + 'Fl/edit.html?' + Math.random(),
						'method':'post',
						'data':data,
						'success':function(t){
							/* console.log(this.data); */
							alert(t=='success'? '操作成功' : t );
							reloadnowwindow();
						},
						'error':function(t){
							alert(t);
						}
				}
				wm.ajax(ajaxobj);
			}
			if(nowdiv.w('div.eventmark').length>0) nowdiv.w('div.eventmark')[0].addact('click',function(e){
				/* var windowdis = this.parentNode.parentNode.parentNode; */
				var clickobj = undefined;
				var etar = wm.gettarget(e);
				var data = undefined;
				var flid = etar.parentNode.getAttribute('flid');
				switch(etar.className){
					/* 显示和隐藏是个大坑呢 */
					case 'hd show':
						if(confirm('确定要设置为公开吗?如果其父类为非公开操作将会失败')){
							data = {'ct':0,'flid':flid};
							editfl(data);
						}
						break;
					case 'hd hidden':
						if(confirm('确定要隐藏该分类吗?该分类下的子类以及该分类下的内容全都将隐藏')){
							data = {'ct':99,'flid':flid};
							editfl(data);
						}
						break;
					case 'del':
						if(confirm('确实要删除该分类和子类以及子类的内容吗?点击确定删除不可恢复,慎重')){
							wm.ajax({
								'url':baseurl + 'Fl/delfl/flid/'+flid+'.html',
								success:function(t){
									alert(t=='success' ? '删除成功' : t);
									reloadnowwindow();
								}
							});
						}
						break;
					case 'addchild':
						var url=baseurl + 'Fl/addfl/addflfid/' + flid ;
						/* //注意这里没有break; */
					case 'edit':
						var url;
						if(!url) url=baseurl + 'Fl/addfl/flid/' + flid;
						new showwin(url,etar.innerHTML);
						return ;
						/* 前面已经return了,不需要Break */
					default:
				}
			});
			nowdiv.w('div.eventmark')[0].addact('change',function(e){
				var etar = wm.gettarget(e);
				var flid = etar.parentNode.getAttribute('flid');
				if(etar.className=='ct' && !confirm('为分类设置的权限需求不能小于该分类的父分类的权限需求')) return;
				var data={};
				data.flid=flid;
				data[etar.name]=etar.value;
				editfl(data);
			});
		},
		'index_cominfo':function(nowdiv){
			nowdiv.w('form')[0].addact('change',function(e){
				//目标元素
				var etar = wm.gettarget(e);
				//console.log(etar);
				var ajaxobj ={
					'url':etar.form.action,
					'data':{'value':etar.value,'name':etar.att('disid'),},
					'method':'post',
					'success':function(t){
						nowdiv.w('.cominfo .mark')[0].innerHTML = ((t=='success') ? '操作成功' : t);
						//w('.cominfo .mark')[0].innerHTML = t;
					}
				}
				console.log(ajaxobj);
				wm.ajax(ajaxobj);
			});
		},
		'index_soluhy':function(nowdiv){
			activeload(3,nowdiv);//默认方式载入窗口
			var hydis=nowdiv.w('.hylist')[0];
			hydis.addact('change',function(e){
				var etar = wm.gettarget(e),
						data={};
				data[etar.att('name')]=etar.value;
				//data['hyid']=etar.att('hyid');
				var ajaxobj={
					'url':baseurl+'Index/soluhy/type/edit/hyid/'+etar.att('hyid'),
					'method':'post',
					'data':data,
					'success':function(t){
						if(t=='success') nowdiv.obj.reload();
						else alert(t) ;
					},
					'error':function(t){
						this.data=undefined;
						alert(t);
					}
				};
				wm.ajax(ajaxobj);
			});
			/* 绑定删除事件,注意这里用last-child选择器来获取到对应的'窗口' */
			hydis.addact('click',function(e){
				var etar = wm.gettarget(e);
				if(etar.nodeName == 'A'){
					if(confirm('删除行业后不会删除相应的解决方案,但所有相应解决方案都会删除该行业标签')){
						wm.ajax({
							url:etar.att('href'),
							success:function(t){
								if(t=='success'){
									nowdiv.obj.reload();
								}else{
									alert(t);
								}
							},
						});
					}
				}
			});
		},
		'index_desktop':function(nowdiv){
			var peizhi=nowdiv.w('>span.close')[0];
			var desktop = nowdiv.w('.desktop')[0]
			peizhi.innerHTML='配置';
			peizhi.addact('click',function(e){
				desktop.clss('setdesktop');
				peizhi.innerHTML= (peizhi.innerHTML=='配置' ? '取消' : '配置');
			});
			activeload(2,nowdiv);
			desktop.addact('click',function(e){
				var etar = wm.gettarget(e);
				//wm.stopprop(e);
				//wm.preventdefault(e);
				if(etar.nodeName=='A' || etar.nodeName=='SPAN'){
					if(etar.nodeName=='SPAN') etar = w(etar.parentNode);
					new showwin(etar.att('href1'),etar.att('title'));
				}/* else if(etar.nodeName=="INPUT"){
					//etar.checked=true;
					//etar.click();
					//etar.att('checked','checked');
					//etar['checked']=true;
				} */
			});
			nowdiv.small.clss('desktop');
		},
		'index_stylebg':function(nowdiv){
			activeload(2,nowdiv);
			nowdiv.w('.stylebg input.bgold')[0].addact('click',function(){
				if(confirm('此操作不可逆,请备份自己的图片,确定恢复默认背景吗?')){
					var ajaxobj={
						'url':baseurl + 'Index/stylebg/type/delbg.html',
						'success':function(t){
							if(t=='success'){
								alert('操作成功');
								window.location.href=baseurl + 'Base/out.html';
							}else{
								alert(t);
							}
						},
						'error':function(t){
							alert(t);
							alert(操作可能不成功);
						}
					}
					wm.ajax(ajaxobj);
				}
			});
		},
		'rs_index':function(nowdiv){
			activeload(7,nowdiv,nowdiv.w('.rslist')[0]);
			rsmanage(nowdiv);
			wm.show({"dis":nowdiv.w('div.rslist')[0],"url":baseurl + 'Rs/rslist.html',});
		},
		'log_index':function(nowdiv){
			nowdiv.style.overflowX='scroll';
			activeload(4,nowdiv,nowdiv.w('.rlist')[0]);
		},
		'log_tq':function(nowdiv){
			var  dis = nowdiv.w('.tqlist')[0];
			wm.show({'dis':dis,'url':baseurl+'Log/tqlist.html'});
			nowdiv.w('.tqsearch')[0].addact('click',function(e){
				var etar=wm.gettarget(e);
				if(etar.nodeName=="SPAN" && etar.att('searchname')){
					this.w('span').clss('searchon','del');
					etar.clss('searchon','add');
					this.w('input[name=clumn]')[0].value=etar.att('searchname');
				}
			});
			activeload(5,nowdiv,dis);
		},
		'log_note':function(nowdiv){
			var listdiv=nowdiv.w('div.notelist')[0]
			wm.show({
				dis:listdiv,
				url:baseurl+'Log/notelist.html',
			});
			listdiv.addact('click',function(e){
				var etar=wm.gettarget(e);
				if(etar.nodeName=='A'){
					var dis=wm.createnode('div').clss('bgbox').moveto(etar.parentNode);
					wm.show({'inner':etar.parentNode.outerHTML+'<i>×</i>','dis':dis,});
				}
			});
		},
		'log_groupindex':function(nowdiv){
			var timeback,
					fromin=w('input[name="fromtime"]')[0],
					toin=w('input[name="totime"]')[0];
			nowdiv.w('.choisetime')[0].addact('click',function(e){
				var _self=this;
				var etar=wm.gettarget(e);
				if(etar.clss('bttn',true)){
					nowdiv.w('.bttn').clss('bttnhad','del');
					etar.clss('bttnhad');
					var nowtime = new Date();
					var nows = parseInt(nowtime.getTime()/1000);
					var timelong;
					if(etar.clss('lastday',true)){
						nows = nows - 24*60*60 ;
						nowtime.setTime(nows*1000);
						nowtime.setHours(23);
						nowtime.setMinutes(59);
						nowtime.setSeconds(59);
						nowtime.setMilliseconds(999);
						var nows = parseInt(nowtime.getTime()/1000);
						timelong = 24*60*60;
					}else{
						timelong = parseInt(etar.att('value'));
					}
					if(timeback) nows -= timeback;
					toin.value = nows;
					fromin.value = nows - timelong;
				}
			});
			nowdiv.w('.oldtime')[0].addact('change',function(e){
				var etar = wm.gettarget(e);
				if(etar.name=='timeback'){
					timeback = parseInt(etar.value) || 0;
					if(toin.value) toin.value = parseInt(toin.value)-timeback;
					if(fromin.value) fromin.value = parseInt(fromin.value)-timeback;
				}
			});
			nowdiv.style.overflow='scroll';
			var zhuheight = 200;
			var onezhuwidth = 24;
			var zhujianju = 60;
			var groupbox = nowdiv.w('.groupbox')[0];
			var tbdiv = nowdiv.w('.tbdiv')[0];
			groupbox.att('style','position:relative;margin-top:50px;margin-bottom:50px;height:'+zhuheight + 'px;');
			//text-align:center;display:block;position:absolute;
			//var innerview = '<a class="nhe" style="width:%spx;bottom:-20px;left:%spx;" title="%s">%s</a><a class="nhe" style="width:%spx;top:50%;left:%spx;color:#f00;" title="%s">tq点击:%s</a><a class="nhe" style="width:%spx;top:-20px;left:%spx;" title="%s">%s</a>';
			//下面格式化时间时会用到
			Date.prototype.parseStr = function(format) {  
				var YYYY = this.getFullYear().toString(); //2011  
				  //console.log(YYYY);
				var YY = YYYY.substr(2,2);   // 11  
					format = format.replace("YYYY",YYYY);  
					format = format.replace("YY",YY);  
					  
				var M=this.getMonth()+1;  
				var MM=(M<10)?"0"+M:M;  
					format=format.replace("MM",MM);  
					format=format.replace("M",M);  
					  
				var D=this.getDate();  
				var DD=(D<10)?"0"+D:D;  
					format=format.replace("DD",DD);  
					format=format.replace("D",D);  
					  
				var h=this.getHours();  
				var hh=(h<10)?"0"+h:h;  
					format=format.replace("hh",hh);  
					format=format.replace("h",h);  
				var m=this.getMinutes();  
				var mm=(m<10)?"0"+m:m;  
					format=format.replace("mm",mm);  
					format=format.replace("m",m);  
				var s=this.getSeconds();  
				var ss=(s<10)?"0"+s:s;  
					format=format.replace("ss",ss);  
					format=format.replace("s",s);  
				//var dayOfWeek=this.getDay();  
					//format=format.replace("@WEEK@",WEEKs[dayOfWeek]);  
					//format=format.replace("@WEK@",WEKs[dayOfWeek]);  
				return format;  
			}  
			nowdiv.w('.mysub.bttn')[0].addact('click',function(e){
				groupbox.innerHTML='';
				tbdiv.innerHTML='';
				var disform=nowdiv.w('form')[0];
				var data=wm.getformdata(disform);
				var now = new Date();
				//2016-08-06 00:00:00
				if(!data.totime) data.totime=now.parseStr('YYYY-M-DD hh:mm:ss');
				//console.log(data.totime);
				if(data.fromtime && data.totime && data.group){
					var group = data.group;
					var ajaxobj={
						'url':disform.att('action'),
						'method':'post',
						'data':data,
						'success':function(t){
							//console.log(group);
							t=JSON.parse(t);
							var i=0,max=0,total=0,nowzhuheight=0,num=0,maxi,tqtotal=0,tqnum=0,
									tb = wm.createnode('table').att('style','font-size:10px;').moveto(tbdiv);;
							for(var k in t){
								//console.log(k);console.log(k[t]);
								num = parseInt(t[k][0] || 0);
								tqnum = parseInt(t[k][1] || 0);
								if(i==0){
									max = num;
								}
								if(group == 'time' || group == 'mark' || group == 'ip'){
									if(num>max) max = num ;
									maxi = i ;
								}
								total += num ;
								tqtotal += tqnum;
								var nbili = num/max;
								var strleft = zhujianju/2 -5;
								var strwidth = onezhuwidth + zhujianju -10;
								if(i<48){
									wm.createnode('tr','<td>'+k+'</td><td>'+num+'</td><td>'+tqnum+'</td><td>'+nbili.toFixed(3)+'</td>').moveto(tb);
									nowzhuheight = zhuheight * nbili ;
									var innerstr = '<a class="nhe" style="width:'+strwidth+'px;bottom:-20px;left:-'+strleft+'px;" title="'+k+'">'+k+'</a><a class="nhe" style="width:'+strwidth+'px;top:50%;left:-'+strleft+'px;color:#f00;title="tq点击:'+ (t[k][1] || 0) +'">tq点击:'+ tqnum +'</a><a class="nhe" style="width:'+strwidth+'px;top:-20px;left:-'+strleft+'px;" title="'+num+'">'+num+'</a>';
									var cdivstyle = 'position:absolute;background:#0A0;width:' + onezhuwidth + 'px;height:' + nowzhuheight + 'px;bottom:0;left:' + i *(onezhuwidth+zhujianju) +'px;text-align:center;';
									wm.createnode('div',innerstr).att('style',cdivstyle).moveto(groupbox);
								}else if(i==48){
									wm.createnode('tr','<td>统计最多显示'+i+'条数据</td><td>其余条数省略</td><td></td>').moveto(tb)
								};
								i++;
							}
							wm.createnode('tr','<td>名称</td><td>次数</td><td>tq点击次数</td><td>占第一个值的比例</td>').moveto(tb,0);
							wm.createnode('tr','<td>总数</td><td>'+total+'</td><td>'+tqtotal+'</td><td>' + (total/max) + '</td>').moveto(tb);
							wm.createnode('tr','<td>信息条数</td><td>'+ i +'</td><td><td></td></td>').moveto(tb);
							if(maxi !== undefined){
								setTimeout(function(){
									var listdiv = groupbox.w('>div');
									for( var j=0 ;j<maxi;j++){
										listdiv[j].style.height = zhuheight * parseInt(listdiv[j].w('a')[2].innerHTML)/max + 'px';
									}
								},300);
							};
						},
						'error':function(t){
							alert(t);
						},
					};
					//console.log(ajaxobj);
					wm.ajax(ajaxobj);
				}else{
					return;
				}
			});
		}
	};
	wm.load(function(){
		//给窗口添加禁止点击属性,定时一秒后移除该属性,配合冒泡事件 阻止连续点击
		w('body')[0].addact('click',function(e){
			if(this.att('isclick')=='1'){
				wm.preventdefault(e);
				wm.stopprop(e);
			}else{
				this.att('isclick','1');
				var _self = this;
				setTimeout(function(){
					_self.att('isclick','0');
				},minclicktime);//这里可以设置点击频率,高于这个频率的点击讲会被阻止
			}
		},true);//捕获事件
		var rs=showwin.prototype.getCA(window.location.href);
		if(rs[1].toLowerCase() != 'index' || rs[2].toLowerCase() != 'index') return;//防止登录等页面启动后面的程序
		if(w('#menuh').length>0) w('#menuh')[0].addact('click',function(e){
			wm.stopprop(e);
			wm.preventdefault(e);
			var etar=wm.gettarget(e);
			if(etar.att('href')){
				new showwin(etar.att('href'),etar.innerHTML);
			}
		});
		document.onkeydown=function(even){
				var e = even || window.event || arguments.callee.caller.arguments[0];
				var dis = wm.gettarget(e);
				 if(e.keyCode==13 && dis.type=='text'){
					wm.preventdefault(e);
				}
		}
		var desktop = new showwin(baseurl+ 'Index/desktop.html','个人桌面');
		w('#content')[0].addact('click',function(e){
			var etar=wm.gettarget(e);
			if(etar.nodeName=='A') wm.preventdefault(e);//阻止A跳转
		});
		//绑定窗口关闭事件和删除事件
		w('#content')[0].addact('click',function(e){
			var etar = wm.gettarget(e);
			if(etar.nodeName == 'SPAN' && etar.parentNode.parentNode == w('#content')[0] && etar.innerHTML=='关闭×'){//关闭窗口
				etar.parentNode.obj.close();
			}else if(etar.nodeName == 'SPAN' && etar.parentNode.parentNode == w('#content')[0] && etar.innerHTML=='刷新'){
				//console.log(1231232);
				etar.parentNode.obj.reload();
			}else if(etar.nodeName == 'SPAN' && etar.parentNode.parentNode == w('#content')[0] && etar.innerHTML=='最小化'){
				etar.parentNode.obj.tosmall();
			}else if(etar.nodeName=='I' && etar.innerHTML=='×'){//关闭小块
				wm.moveto(etar.parentNode);
			}else if(etar.parentNode.className=='page'){
				wm.preventdefault(e);
				wm.stopprop(e);
				wm.show({'dis':wm.addkv(etar.parentNode.parentNode.parentNode),'url':etar.att('href')});
			}else if(etar.nodeName=='IMG'){
				wm.stopprop(e);
				wm.preventdefault(e);
				wm.show({'inner':'<img src="' + ( etar.att('src1') || etar.att('src') ) + '" /> <i>×</i>','callback':function(dis){dis.moveto('#content')}});
			}
		});
		
		
	});
	//统一输出命名空间
	window.outsome={
		'showwin':showwin,
		'rsmanage':rsmanage,
		'activeload':activeload,
	};
})();