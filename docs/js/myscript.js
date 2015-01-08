$(function(){
	//IE6提示
	$('#ie6-close').click(function(){
		$('#ie6-warning').hide();
	})
	
	//load
	$(".topNav").load("g-nav.html .navs");
	
	//tab
	$(".tab-nav li").click(function() {
		var _this=$(this),
			s=_this.index(),
			$pane=_this.parents('.tab').first().find('.tab-pane').eq(s);
		//var	$pane=$(_this.find('a').attr('href'));//用id切换
		a_s_r(_this,'cur');
		a_s_r($pane,'cur');
	});
	
	//弹出层
	$('[data-toggle="modal"]').click(function(){
		var $target=$($(this).data('target'));
		$target.show();
		$('body').addClass('modal-open').append('<div class="modal-backdrop"></div>');
		modalCenter();
	})
	$('[data-dismiss="modal"]').click(function(){
		$(this).parents('.modal').hide();
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open').css('padding-right','');
	})
	
	$(window).resize(function(){
		//弹出框上下居中
		modalCenter();
	});	
	
	//下拉框
	$('.dropdown').hover(function(){
		$(this).toggleClass('open');
	})
	
	$('.dropdown-menu a').click(function(){
		$(this).parents('.dropdown').find('.dropdown-input').val($(this).text());
	})
	
	//文字在输入框上
	placeholder('.form-placeholder');
	
	//单选按钮
	$('.radio-btn').click(function(){
		a_s_r($(this),'checked');
	})
	
	//多选按钮
	$('.checkbox-btn').click(function(e){
		var _this=$(this),
			$input=_this.find('input');
		_this.toggleClass('checked');
		e.preventDefault();
		if(_this.hasClass('checked')){
			$input.prop("checked", true);
		}else{
			$input.prop("checked", false);
		}
	})
	
	//评选框
	$('.textarea-box').bind("blur focus keydown keypress keyup", function(event){
		var val=$(this).val();
		var maxLen=10;
		var num=0; 
		var $num=$(this).parents('.textarea').find('.textarea-count');
		var total=val.replace(/[^\x00-\xff]/g,"aa").length;//检查是否是汉字或者全角,如果是汉字替换成aa;//正则/[\u0391-\uFFE5]/是用来匹配中文字符,包括标点,繁体等。
		num=Math.floor(total);//按字节计数	 
		$num.find('em').text(num);
		if(total>maxLen){
			$num.addClass('warning');	
		}else{
			$num.removeClass('warning');
		}
	})
	
	//返回顶部
	var isTop=true,
		timer=null;
	$(window).scroll(function(){   
		var scrollt = document.documentElement.scrollTop + document.body.scrollTop; 
		if( scrollt >200 ){  
			$(".back-to-top").fadeIn(400);  
		}else{      
			$(".back-to-top").stop().fadeOut(400);   
		}
		if(!isTop){clearInterval(timer);}
		isTop=false;
	});
	$('.back-to-top').click(function(){
		var st = document.documentElement.scrollTop + document.body.scrollTop;
		setInterval(function(){
			if(st>0){
				st=st-50;	
				$("html,body").scrollTop(st);
			}
		},50)
		//$("html,body").animate({scrollTop:0},200);
	})
})
/*-------------自定义函数-------------------------*/
function a_s_r(o,c){
	o.addClass(c).siblings().removeClass(c);	
}
//文字在输入框上
function placeholder(obj){
	var $group=$(obj),
		$label=$group.find('.form-label'),
		$control=$group.find('.form-input'),
		len=$control.length;
	for(var i=0;i<len;i++){//判断浏览器是否记住信息
		var val=$control.eq(i).val();
		if(val!==''){
			$control.eq(i).prev('.form-label').hide();
		}
	}
	$control.keydown(function(){
		$(this).prev('.form-label').hide();
	}).blur(function(){
		var _this=$(this);
		if (_this.val() == ''){
			_this.prev().show();
		}
	});
}
//弹出框居中
function modalCenter(){	
	var	$targetC=$('.modal[data-launch="true"]').find('.modal-content:visible'),
		mH=$targetC.height(),
		allH=$(document).height(),//document.body.scrollHeight,//网页正文全文高
		wH=$(window).height();//document.body.clientHeight;//网页可见区域高
		h=(wH-mH)/2;
	if(allH>wH){$('.modal-open').css('padding-right',17)}	
	h<0?h=0:h=h;
	$targetC.css({'margin-top':h});
}
//漂浮框
function flotage(obj){
	var x = 0,y = 0;  
	var xin = true, yin = true ;
	var step = 1 ;
	var delay = 20 ;
	obj.find('img').load(function(){
		var float = function(){
			var L = T = 0;
			var OW = obj.width();//当前广告的宽
			var OH = obj.height();//高
			var DW = $(document).width(); //浏览器窗口的宽
			var DH = $(window).height(); 
			 x = x + step *( xin ? 1 : -1 ); 
			if (x < L) { 
				xin = true; x = L
			} 
			if (x > DW-OW-1){//-1为了ie
				xin = false; x = DW-OW-1
			} 
			y = y + step * ( yin ? 1 : -1 ); 
			if (y > DH-OH-1) { 
				yin = false; y = DH-OH-1 ;
			}
			if (y < T) {        
				yin = true; y = T
			} 
			var left = x ; 
			var top = y; 
			obj.css({'top':top,'left':left});
		}
		var itl = setInterval(float,delay);
		obj.mouseover(function(){clearInterval(itl)}); 
		obj.mouseout(function(){itl=setInterval(float, delay)});
		obj.find('.close').click(function(){obj.remove()});
	});
}