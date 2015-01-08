$(function(){
	//IE6提示
	$('#ie6-close').click(function(){
		$('#ie6-warning').hide();
	})
	

})
/*-------------自定义函数-------------------------*/
function a_s_r(o,c){
	o.addClass(c).siblings().removeClass(c);	
}
