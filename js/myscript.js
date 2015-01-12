$(function(){
	//IE6提示
	$('#ie6-close').click(function(){
		$('#ie6-warning').hide();
	})
	//
	$('#nav li').click(function(){
		a_s_r($(this),'active')	
	})
	$('#navbar_toggle').click(function(){
		$('#nav').toggle();
	})

	renderCvs($('.thumbnail').not('.books'),200,122);
	renderCvs($('.books'),200,260)
})
/*-------------自定义函数-------------------------*/
function a_s_r(o,c){
	o.addClass(c).siblings().removeClass(c);	
}

//优化图片懒加载，在移动页面上用canvas转换图片为base64，能起到图片加载缓存的效果。
var renderCvs=function(parent,w,h,max){
	var lazyloadImage=$('.lazyload',parent);
	if(lazyloadImage.length<1){
		return;	
	}
	var max=max||lazyloadImage.length;
	for(var i=0;i<max;i++){
		var imgId=lazyloadImage[i].id;
		var imageCache=localStorage.getItem(imgId);
		if(imageCache){
			lazyloadImage[i].src=imageCache;
			continue;	
		}
		var img=new Image();
		img.index=i;
		img.id=imgId;
		img.crossorigin='anonymous';
		img.onload=function(){
			var _this = this;
			var zCvs = $('#'+this.id);
			var domCvs = zCvs[0];
			domCvs.src = this.src;
			zCvs.removeClass('lazyload');
			try{
				var cvs = document.createElement('canvas');
				cvs.style.display = 'none';
				document.body.appendChild(cvs);
				var rcvs = cvs.getContext('2d');
				cvs.width = w;
				cvs.height = h;
				rcvs.drawImage(this,0,0,w,h);
				setTimeout(function(){
				  var data = cvs.toDataURL();
				  localStorage.setItem(_this.id,data);
				  document.body.removeChild(cvs);
				},200);
			}catch(ex){
			
			}
		}
		 img.src = lazyloadImage[i].getAttribute('data-src');
	}
}
