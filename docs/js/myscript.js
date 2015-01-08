$(function() {
	//IE6提示
	$('#ie6-close').click(function() {
		$('#ie6-warning').hide();
	})
	
	//load
	$(".topNav").load("g-nav.html .navs");
	$(".footer").load("g-footer.html .footer");
	
	//tab
	$(".tab-nav li").click(function() {
		var _this = $(this),
			s = _this.index(),
			$panel = _this.parents('.tab').first().find('.tab-panel').eq(s);
		//var	$pane=$(_this.find('a').attr('href'));//用id切换
		a_s_r(_this, 'cur');
		a_s_r($panel, 'cur');
	});

	//弹出层
	$('[data-toggle="modal"]').click(function() {
		var $target = $($(this).data('target'));
		$target.show();
		$('body').addClass('modal-open').append('<div class="modal-backdrop"></div>');
		modalCenter();
	})
	$('[data-dismiss="modal"]').click(function() {
		$(this).parents('.modal').hide();
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open').css('padding-right', '');
	})

	$(window).resize(function() {
		//弹出框上下居中
		modalCenter();
	});

	//下拉框
	$('.dropdown').hover(function() {
		$(this).toggleClass('open');
	})
	$('.dropdown-menu a').click(function() {
		$(this).parents('.dropdown').find('.dropdown-input').val($(this).text());
	})

	//文字在输入框上
	placeholder('.form-placeholder');

	//单选按钮
	$('.radio-btn').click(function() {
		a_s_r($(this), 'checked');
	})

	//多选按钮
	$('.checkbox-btn').click(function(e) {
		var _this = $(this),
			$input = _this.find('input');
		_this.toggleClass('checked');
		e.preventDefault();
		if (_this.hasClass('checked')) {
			$input.prop("checked", true);
		}else {
			$input.prop("checked", false);
		}
	})

	//评选框
	$('.textarea-box').bind("blur focus keydown keypress keyup", function(event) {
		var val = $(this).val(),
			maxLen = 10,
			num = 0,
			$num = $(this).parents('.textarea').find('.textarea-count'),
			total = val.replace(/[^\x00-\xff]/g, "aa").length; //检查是否是汉字或者全角,如果是汉字替换成aa;//正则/[\u0391-\uFFE5]/是用来匹配中文字符,包括标点,繁体等。
		num = Math.floor(total); //按字节计数	 
		$num.find('em').text(num);
		if (total > maxLen) {
			$num.addClass('warning');
		}else {
			$num.removeClass('warning');
		}
	})
	
	//搜索框
	$('.form-search02 .search-input').bind({
		click:function(e){
			e.stopPropagation(); 
		},
		focus:function(){
			$(this).parent().addClass('focus');
			if($(this).val()!==''){$('.search-result').show();}	
		},
		keyup:function(){
			if($(this).val()!==''){$('.search-result').show();}
		},
		blur:function(){
			if($(this).val()==''){$(this).parent().removeClass('focus');}
			$('.search-result').hide();
		}
	})
	$('body').click(function(){
		$('.search-result').hide();
	})

	//返回顶部
	var isTop = true,
		timer = null;
	$(window).scroll(function() {
		var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
		if (scrollt > 200) {
			$(".back-to-top,.icon-top").fadeIn(400);
		}else {
			$(".back-to-top,.icon-top").stop().fadeOut(400);
		}
		if (!isTop) {
			clearInterval(timer);
		}
		isTop = false;
	});
	$('.back-to-top,.icon-top').click(function() {
		var st = document.documentElement.scrollTop + document.body.scrollTop;
		setInterval(function() {
			if (st > 0) {
				st = st - 50;
				$("html,body").scrollTop(st);
			}
		}, 50)
		//$("html,body").animate({scrollTop:0},200);
	})

	
}) 


/*-------------自定义函数-------------------------*/
function a_s_r(o, c) {
	o.addClass(c).siblings().removeClass(c);
}
//文字在输入框上
function placeholder(obj) {
	var $group = $(obj),
		$label = $group.find('.form-label'),
		$control = $group.find('.form-input'),
		len = $control.length;
	for (var i = 0; i < len; i++) { //判断浏览器是否记住信息
			var val = $control.eq(i).val();
			if (val !== '') {
				$control.eq(i).prev('.form-label').hide();
			}
		}
	$control.keydown(function() {
			$(this).prev('.form-label').hide();
		}).blur(function() {
			var _this = $(this);
			if (_this.val() == '') {
				_this.prev().show();
			}
		});
}
//弹出框居中
function modalCenter() {
	var $targetC = $('.modal[data-launch="true"]').find('.modal-content:visible'),
		mH = $targetC.height(),
		allH = $(document).height(),
	//document.body.scrollHeight,//网页正文全文高
	wH = $(window).height(); //document.body.clientHeight;//网页可见区域高
	h = (wH - mH) / 2;
	if (allH > wH) {
			$('.modal-open').css('padding-right', 17)
		}
	h < 0 ? h = 0 : h = h;
	$targetC.css({
			'margin-top': h
		});
}
//漂浮框
function flotage(obj) {
	var x = 0,
		y = 0;
	var xin = true,
		yin = true;
	var step = 1;
	var delay = 20;
	obj.find('img').load(function() {
			var float = function() {
				var L = T = 0;
				var OW = obj.width(); //当前广告的宽
				var OH = obj.height(); //高
				var DW = $(document).width(); //浏览器窗口的宽
				var DH = $(window).height();
				x = x + step * (xin ? 1 : -1);
				if (x < L) {
					xin = true;
					x = L
				}
				if (x > DW - OW - 1) { //-1为了ie
					xin = false;
					x = DW - OW - 1
				}
				y = y + step * (yin ? 1 : -1);
				if (y > DH - OH - 1) {
					yin = false;
					y = DH - OH - 1;
				}
				if (y < T) {
					yin = true;
					y = T
				}
				var left = x;
				var top = y;
				obj.css({
					'top': top,
					'left': left
				});
			}
			var itl = setInterval(float, delay);
			obj.mouseover(function() {
				clearInterval(itl)
			});
			obj.mouseout(function() {
				itl = setInterval(float, delay)
			});
			obj.find('.close').click(function() {
				obj.remove()
			});
		});
}
//小于10补0
function o(x) {
	return x < 10 ? '0' + x : x;
}
//显示当前年月日 时分秒
function curTime() {
	var d = new Date(),
		year = d.getFullYear(),
		month = d.getMonth() + 1,
		date = d.getDate(),
		h = d.getHours(),
		m = d.getMinutes(),
		s = d.getSeconds(),
		ww = "星期" + "日一二三四五六".charAt(d.getDay());
	return year + "年" + o(month) + "月" + o(date) + '日 ' + ww + ' ' + o(h) + ':' + o(m) + ':' + o(s);
}
//显示当前年月日 星期 农历 
function current() {
	var str = "";
	var d = new Date();
	var yy = d.getFullYear(); //获取当前年份
	var mm = d.getMonth() + 1; //获取当前月份
	var dd = d.getDate();
	var hh = d.getHours();
	var mmm = mm;
	var m = d.getMinutes();
	var ss = d.getSeconds();
	var ww = "星期" + "日一二三四五六".charAt(d.getDay());
	//农历日期名
	var dayName = "*,初一,初二,初三,初四,初五,初六,初七,初八,初九,初十,十一,十二,十三,十四,十五,十六,十七,十八,十九,二十,廿一,廿二,廿三,廿四,廿五,廿六,廿七,廿八,廿九,三十".split(/,/g);
	//农历月份名
	var monName = "*,正,二,三,四,五,六,七,八,九,十,十一,腊".split(/,/g);
	//公历每月前面的天数
	var monthAdd = new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
	//农历数据
	var nongliData = new Array(2635, 333387, 1701, 1748, 267701, 694, 2391, 133423, 1175, 396438, 3402, 3749, 331177, 1453, 694, 201326, 2350, 465197, 3221, 3402, 400202, 2901, 1386, 267611, 605, 2349, 137515, 2709, 464533, 1738, 2901, 330421, 1242, 2651, 199255, 1323, 529706, 3733, 1706, 398762, 2741, 1206, 267438, 2647, 1318, 204070, 3477, 461653, 1386, 2413, 330077, 1197, 2637, 268877, 3365, 531109, 2900, 2922, 398042, 2395, 1179, 267415, 2635, 661067, 1701, 1748, 398772, 2742, 2391, 330031, 1175, 1611, 200010, 3749, 527717, 1452, 2742, 332397, 2350, 3222, 268949, 3402, 3493, 133973, 1386, 464219, 605, 2349, 334123, 2709, 2890, 267946, 2773, 592565, 1210, 2651, 395863, 1323, 2707, 265877);
	//计算到初始时间1921年2月8日的天数：1921-2-8(正月初一)
	var theDate = (yy - 1921) * 365 + Math.floor((yy - 1921.0) / 4) + dd + monthAdd[mm - 1] - 38;
	if ((yy % 4) == 0 && mm > 2) theDate++;
	//计算农历天干、地支、月、日
	var isEnd = 0;
	var m = 0,
		k, n;
	while (1) {
			if (nongliData[m] < 4095) k = 11;
			else k = 12;
			n = k;
			while (1) {
				if (n < 0) break;
				//获取NongliData[m]的第n个二进制位的值
				bit = nongliData[m]
				for (var i = 0; i < n; i++)
				bit = Math.floor(bit / 2.0);
				bit = bit % 2;
				if (theDate <= (29 + bit)) {
					isEnd = 1
					break;
				}
				theDate -= 29 + bit;
				n--;
			}
			if (isEnd == 1) break;
			m++;
		}
	curYear = 1921 + m;
	mm = k - n + 1;
	if (k == 12) {
			var mc = (Math.floor(nongliData[m] / 65536.0) + 1);
			if (mm == mc) mm = 1 - mm;
			else if (mm > mc) //NongliData(m)
			mm = mm - 1;
		}
	if (mm < 1) nMonth = "闰" + monName[-1 * mm];
	else nMonth = monName[mm];
	nDate = dayName[theDate];
	var jq = getjq(yy, mm, dd);
	str = '今天是：' + yy + "年" + o(mmm) + "月" + o(dd) + '日 ' + ww + ' 农历' + nMonth + '月' + nDate + ' ' + ' ' + jq;
	return str;
}
//节气
function getjq(yyyy, mm, dd) {
	var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
	var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
	var tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	var tmp2 = tmp1.getUTCDate();
	var solarTerms = "";
	if (tmp2 == dd) solarTerms = solarTerm[mm * 2 + 1];
	tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	tmp2 = tmp1.getUTCDate();
	if (tmp2 == dd) solarTerms = solarTerm[mm * 2];
	return solarTerms;

}