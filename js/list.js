$(function(){
	// 异步加载商品列表
	$.getJSON("../mock/products.json", function(data){
		$.each(data, function(index, product){
			$(".template").clone(true)
						  .show()
						  .removeClass("template").addClass("box")
						  .find(".img").attr("src", product.img).end()
						  .find(".list_center_box_titl").text(product.title).end()
						  .find(".li_price").text(product.price).end()
						  .find(".li_id").val(product.id).end()
						  .appendTo(".list_center_main");
		});
		var _boxes = $(".list_center_main").children(".box");
		for(let i=0 ; i<_boxes.length; i++){
			$(_boxes).eq(i).hover(function(){
				$(this).css({
					border:"1px solid #cf1e2c"
				});
			},function(){
				$(this).css({
					border:"1px solid #fff"
				});
			});
		}
		var nav_li = $(".nav_ul").children("li");
		$(nav_li).eq(1).addClass("active").siblings().removeClass("active");


		$.cookie.json = true;
		// 获取登录用户信息
		var user = $.cookie("loginUser");
		// 添加购物车
		_cars = $(".add_car1");
		
		for(let i=0 ;i<_cars.length;i++){	
			$(_cars).eq(i).click(function(){
				var prod = {
				id : $(".li_id").eq(i).val(),
				title : $(".list_center_box_titl").eq(i).text(),
				price : $(".li_price").eq(i).text(),
				amount : 1
			};
			var _products = $.cookie("products") || [];
			var index = findProd(prod.id, _products);
			if (index !== -1)
				_products[index].amount++;
			else
				_products.push(prod);
			$.cookie("products", _products, {expires:7, path:"/"});
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

				$(".car_info").eq(i).show().children("a").click(function(){
					$(".car_info").hide()
				})
				function findProd(id, products) {
					for (var i = 0, len = products.length; i < len; i++) {
						if (products[i].id === id)
							return i;
					}
					return -1;
				}

			});

		}
		
	});	
});