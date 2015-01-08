$(function(){
	//IE6提示
	$('#ie6-close').click(function(){
		$('#ie6-warning').hide();
	})
	
	$('#mainNav li').click(function(){
		a_s_r($(this),'active');
	})
})
/*-------------自定义函数-------------------------*/
function a_s_r(o,c){
	o.addClass(c).siblings().removeClass(c);	
}
