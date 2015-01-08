$(function() {	
	//菜单
	$('.menu li,.sideNav li').hover(function() {
			$(this).addClass('cur');
			$(this).find('.menu-sub,.sideNav-sub').stop().delay(100).slideDown();
		}, function() {
			$(this).removeClass('cur');
			$(this).find('.menu-sub,.sideNav-sub').stop().slideUp('fast');
		})

	/*菜单02*/
	$('.menu02 li').hover(function() {
			var $this = $(this);
			$this.find('.out').stop().animate({top: 50});
			$this.find('.over').stop().animate({top: 0});
			$this.find('.menu-sub').stop().slideDown();
		}, function() {
			var $this = $(this);
			$this.find('.out').stop().animate({top: 0});
			$this.find('.over').stop().animate({top: -50});
			$this.find('.menu-sub').stop().hide();
		})

	menuW = 900,
	//菜单宽
	$('.menu02 .menu-sub').each(function() {
		var $this = $(this),
			liW = $this.parent('li').width(),
			subW = $this.width(),
			subHalf = (subW - liW) / 2,
			mLeft = $this.parent('li').position().left,
			mRight = menuW - mLeft - liW,
			subP = mLeft - subHalf;
		if (subHalf > mLeft) {
			subP = 0;
		}else if (subHalf > mRight) {
			subP = menuW - subW;
		}
		$this.css('left', subP);
	});

	//菜单03
	$('.menu03>li').hover(function() {
		var $html = $(this).find('.menu-sub-links').html();
		$('.menu03-subMenu').slideDown();
		$('.menu03-subMenu .subMenuItem').html($html);
	})
	$('.menu03-subMenu').mouseleave(function(e) {
		$(this).slideUp();
	});

	//菜单05
	slidCur('.menu05',"left");
	
	//菜单08
	$('.menu08 li a').hover(function(){
		$(this).stop().animate({'width':120},300);
	},function(){
		$(this).stop().animate({'width':80},300);
	})
	
	//sideNav03
	slidCur('.sideNav03',"top");
	
})

function slidCur(o,p){
	var $m = $(o),
		$mCur = $m.find('.cur'),
		$mLI = $m.find('li'),
		$mBg = $m.find('.bg'),
		curP = 0,
		cssSetting = {};
	if($mCur[0]){
		curP = $mCur.position()[p];
	}
	cssSetting[p] = curP + 'px';		
	$mBg.stop().animate(cssSetting, 300);
	$mLI.hover(function() {
		var pos = $(this).position()[p];
		cssSetting[p] = pos + 'px';
		$mBg.stop().animate(cssSetting, 300);
	});	
}

