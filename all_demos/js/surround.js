
$(document).ready(function(){

	var $contain=$('.contain');
	var $box=$('.box');
	var $left=$('.left');
	var $right=$('.right');
	var $high=$('.high');
	var $low=$('.low');
	var $leftCorner=$('.lc');
	var $rightCorner=$('.rc');
	var widthNow;
//自适应
	$(window).resize(function(){
		var winWidth=$('.cloud').width();
		var winHeight=$('.cloud').height();
		//console.log(winWidth+'&'+winHeight);

		//调整大小
		$box.css({
			width:winHeight*0.4,//winWidth*0.22,
			height:winHeight*0.4,
			marginLeft:-winWidth*0.22/2+$contain.width()/2,
			marginTop:-winHeight*0.4/2+$contain.height()/2,
		});

		//调整位置
		$left.css('left',-winWidth*0.3);
		$right.css('left',winWidth*0.3);
		$leftCorner.css('left',-winWidth*0.15);
		$rightCorner.css('left',winWidth*0.15);
		$high.css('top',-winHeight*0.3);
		$low.css('top',winHeight*0.3);

		$box.find('.inner').css('width',$box.width()*0.88)
		widthNow=$box.find('.inner').width()

	})
	$(window).trigger('resize');

// 侧边菜单显示隐藏
	var flag=false;
	$('.goright').click(function(){
		if(!flag){
			$('.sidebar').animate({'left':'0px'},200,function(){})
			$('.cover').fadeIn('fast')
		}else{
			$('.sidebar').animate({'left':'-200px'},200,function(){})
			$('.cover').fadeOut('fast')
		}
		flag=!flag;
	})

// 选中效果
	$box.find('.inner').mouseenter(function(){
		
		//$(this).stop().animate({width:'150px'},200)
		//$(this).animate({width:widthNow},200);
		$(this).append($('<div>').addClass('flash'))
		$(this).find('.flash').animate({left:'100%'},function(){
			$(this).remove('.flash')
		})
	}).mouseleave(function(){
		
	})

//旋转
	var degree=0;
	var timer=setInterval(function(){
		degree+=1;
		//$('.center').css('transform','rotate('+degree+'deg)')//transform:rotate(45deg); 
		if (degree%360==0) {
			$('.box').find('.inner').trigger('mouseenter')
		}
		//随机选取
		// if(degree%180==0){
		// 	var rnd=parseInt(Math.random()*7);
		// 	$box.eq(rnd).find('.inner').trigger('mouseenter')
		// }
	},10)
})