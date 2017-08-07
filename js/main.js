/*
* @Author: yjm
* @Date:   2016-12-29 15:51:52
* @Last Modified by:   yjm
* @Last Modified time: 2017-01-03 21:06:48
*/

'use strict';
$(function(){
	// 第一步，获取屏幕的宽度
	function resize(){
		var windowWidth=$(window).width();
		// 第二步 判断屏幕属于大还是小 
		var isSmallScreen = windowWidth < 768;
		// 根据大小为界面上每一张轮播图设置背景
		/*$('#main_ad >.carousel-inner >.item') 获取到的是一个DOm数组（多个）*/
		$('#main_ad >.carousel-inner >.item').each(function(i,item) {
			var $item = $(item);
			 //因为得到的item是一个DOM对象，需要转换
			var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
			$item.css('backgroundImage', 'url("' + imgSrc + '")');

			// 因为需要小图时，尺寸要等比例变化，所以小图的时候使用img方式
			// $element.data()是一个专门用于取元素上的自定义属性(data-xxx,其中取得是xxx)的函数
			
			if(isSmallScreen){
				$item.html('<img src="'+imgSrc+'" alt="" />');
			}else{
				$item.empty();
			}
		});
		}
	
	$(window).on('resize',resize).trigger('resize');
	// 初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();
	// $('[data-toggle="tooltip"]').tooltip();
	/**
	 * 控制标签页的标签容器宽度
	 * 
	 */
	var $ulContainer = $('.nav-tabs');
	// 获取所有的子元素的宽度和
	var width = 30;  //因为原本ul上面有padding-left
	// 找到子元素，并遍历子元素
	// console.log($ulContainer.children());
	$ulContainer.children().each(function(index,element){
		// console.log(element.clientWidth);
		// console.log($(element).width());
		width += element.clientWidth;
	})
	// 此时width等于所有li的宽度和
	// 判断当前ul的宽是否超出屏幕，如果超出就显示横向滚动条
	if(width > $(window).width()){

		$ulContainer
		.css('width',width)
		.parent().css('overflow-x','scroll');
	}
	// a点击注册事件
	var $newsTitle = $('.news-title');
	$('#news .nav-pills a').on('click',function(){
		// 获取当前点击元素
		var $this = $(this);
		// 获取对应的title值，
		var title = $this.data('title');
		// 将title设置到相应的位置
		$newsTitle.text(title);
	});

// 获取界面上的轮播图容器（组件）
    var $carousels = $('.carousel');
    var startX, endX;
    var offset = 50;
    // 注册滑动事件
    $carousels.on('touchstart',function(e){
    	// 手指触摸开始时 记录一下手指所在的坐标X
    		startX = e.originalEvent.touches[0].clientX;
    		// console.log(startX);
    });

    $carousels.on('touchmove',function(e){
    	// 利用变量重复赋值
    		endX = e.originalEvent.touches[0].clientX;
    		
    });
    // 结束触摸一瞬间记录最后上午手指所在位置X
    $carousels.on('touchend',function(e){
    		// console.log(endX);
    		// 控制精度
    		// 获取每次运动的距离，当距离大于一定值时认为是有方向变化
    		var distance = Math.abs(startX - endX);
    		if(distance > offset){
    			// 2.根据获得的方向 选择上一张或者下一张
				// $('a').click();
				// 原生的carousel方法实现bootstrap上
    			$carousels.carousel(startX > endX? 'next': 'prev');
    		}
    		
    });
	// 1.先获取手指在轮播图这个元素上 的 一个滑动方向（左右）
	// touchstar ta
	
});