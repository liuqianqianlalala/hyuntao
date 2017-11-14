$(function(){
		
	// 引入头部
	$.cookie.json = true;
	// 获取登录用户信息
	var user = $.cookie("loginUser");
	// 异步加载头部资源
	$.get("include/header.html", function(data){
		if (user) { // 有登录成功的用户
			$(data).find(".login_reg")
				   .html("<a href='xxx.html'>欢迎您：" + user.username + "</a>"+" "+"<a href='login.html'>[退出]</a>")
				   .end()
				   .appendTo(".bigheader");
		} else {
			$(".bigheader").append(data);
		}
	});
	// 引入top
	$(".top").load("include/top.html",function(){
		$(".right_car").hover(function(){
		$(".shopping_car_hover").show();
		},function(){
			$(".shopping_car_hover").hide();
		});

	});
	// 引入nav
	$(".bignav").load("include/nav.html");
	// 引入右侧导航
	$(".right_sider").load("include/righter_nav.html",function(){
		var divs = $(".com",$(".right_sider_con"));		
		var _slides = $(".slide");
		for(let i=0;i<divs.length;i++){
			$(divs).eq(i).hover(function(){
				$(this).css("background-color","#cf1e2c");
				if(i==0){
					$(".slide").eq(i).stop().animate({
						opcaity:"show",
						left:-100
					},200);
				}
				if(i>1){
					$(".slide").eq(i-1).stop().animate({
						dopcaity:"show",
						left:-100
					},200);
				}
			},function(){
				$(this).css("background-color","#333");
				if(i==0){
					$(".slide").eq(i).stop().animate({
						opcaity:"hide",
						left:-130
					},200);
				}
				if(i>1){
					$(".slide").eq(i-1).stop().animate({
						opcaity:"hide",
						left:-130
					},200);
				}
			});
			// 点击回到顶部
			$(".right_sider_return").click(function(){
				$("html,body").animate({
					scrollTop:0
				},1000);
			})
		}
		
	});
	
	// 购买数量的增加
	
	$(".add").click(function(){
		var _num = $(".number").val();
		_num++;
		$(".number").val(_num);
	});
	$(".reduce").click(function(){
		var _num = $(".number").val();
		_num--;
		if(_num<1){
			_num = 1;
		}
		$(".number").val(_num);
	});
	// 加入购物车
	// $(".cart_main").delegate(".add_car", "click", function(){
		$(".add_car").click(function(){
		console.log(111)
		var prod = {
			id : $(".id").val(),
			title : $(".goos_middle_title").text(),
			price : $(".price").text(),
			amount : $(".number").val()
		};
		// 获取 cookie 中已保存的购物车数组结构，如果没有的话，新建数组
		var _products = $.cookie("products") || [];
		// 判断在数组中是否有当前选购的商品
		var index = findProd(prod.id, _products);
		if (index !== -1) // 已选购过
			_products[index].amount++;
		else // 未选购过
			_products.push(prod);
		// 将选购商品操作之后的数组保存到 cookie 中
		$.cookie("products", _products, {expires:7, path:"/"});
		// 同步保存到服务器数据库中
		if (user){			
			if (index !== -1)
				$.get("cart.php", {
					action:"modify",
					username:user.username,
					prod_id:prod.id,
					amount:_products[index].amount
				});
			else
				$.get("cart.php", {
					action:"add", 
					username:user.username,
					prod_id : prod.id,
					// img : prod.img,
					title : prod.title,
					price : prod.price,
					amount : prod.amount
				});
		}

		$(".car_info").show().children("a").click(function(){
					$(".car_info").hide()
				})

	});

	// 查找在商品数组中是否有某id的商品，返回其在数组中的下标，如果不存在，则返回-1
	function findProd(id, products) {
		for (var i = 0, len = products.length; i < len; i++) {
			if (products[i].id === id)
				return i;
		}
		return -1;
	}

	// 引入尾部
	$(".bigfooter").load("include/footer.html");

});