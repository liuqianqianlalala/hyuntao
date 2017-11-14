$(function(){
// 导航图
	$(".banner").carousel({
			width : 1290,
			height : 350,
			imgs : [
				// {src:"../images/banner1.jpg",href:"http://www.baidu.com"},
				{src:"../images/banner2.png",href:"http://www.baidu.com"},
				{src:"../images/banner3.png",href:"http://www.baidu.com"},
			],
			isPrevNext : true,
			isAuto : true,
			shiftTime : 5000,
			type : "fade"
		});
// 品牌推荐
	var _lis = $(".reco").children("li")
	for(let i=0;i<_lis.length;i++){
		$(_lis[i]).hover(function(){
			$(_lis[i]).find("img").css({
				width:"155px",
				height:"85px"
			});
		},function(){
			$(_lis[i]).find("img").css({
				width:"150px",
				height:"80px"
			});
		});
	}
});