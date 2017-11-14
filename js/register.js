$(function(){
	$(".bigfooter").load("include/footer.html");
	// 生成图形验证码
	function loadCode() {
			$.ajax({
				type : "get",
				url : "http://route.showapi.com/932-2",
				data : {
					showapi_appid:"29550",
					showapi_sign:"08402fce064a484baad949d9a18f75e7",
					length : 4,
					specials : false
				},
				dataType : "json",
				success : function(data){
					data = data.showapi_res_body;
					$(".code_img_con").attr("src",data.image);
					$(".code_img_con").attr("sid",data.sid);
				}
			});
		}
		loadCode();
		// 点击验证码更换验证码
		$(".code_img_con").click(function(){
			loadCode();
		});
		// 检验验证码
		$(".reg_img").blur(function(){
			$.ajax({
				type : "get",
				url : "http://route.showapi.com/932-1",
				data : {
					showapi_appid:"29550",
					showapi_sign:"08402fce064a484baad949d9a18f75e7",
					checkcode : $(".reg_img").val(),
					sid : $(".code_img_con").attr("sid")
				},
				dataType : "json",
				success:function(data){
					data = data.showapi_res_body;
					if (data.valid) {
							$(".code_info").text("验证码输入正确");
						} else {
							$(".code_info").text("验证码输入错误");
						}
					}	
			});
		});

	// 切换选项卡
	var re_tables = $(".re_table");
	var _choose = $(".choose");
	for(let i=0;i<re_tables.length;i++){
		re_tables.eq(i).click(function(){
			for(let i=0;i<_choose.length;i++){
				_choose.eq(i).hide();
			}
			$(this).addClass("re_phone").siblings().removeClass("re_phone");
			_choose.eq(i).show();
			
		})
	}
	// 用户名
	var usernameExist = true;
	var test_us = false;
	var user_reg= /^\w{4,10}$/;
	$(".username").blur(function(){	
		$.ajax({
			type : "get",
			url : "check_user.php",
			data : {username: $(this).val()},
			dataType : "json",
			success:function(data){
				if (data.status == 0){
					$(".user_info").text("用户名已被占用");
					usernameExist = true;
				}
				else{
					if(user_reg.test($(".username").val())){
						usernameExist = false;
						$(".user_info").text("用户名可用");
						test_us  =true;
					}			
					else{
						$(".user_info").text("用户名格式错误");
					}			
				}
			}
		});
	});
	
	// 手机号
	var phone_number = true;
	var test_ph = false; 
	$(".input_phone").blur(function(){
		var phone_reg = /^[0-9]{11}$/;
		$.ajax({
			type : "get",
			url : "check_phone.php",
			data : {phone: $(this).val()},
			dataType : "json",
			success : function(data){
				if (data.status == 0){
					$(".phone_info").text("手机号已被占用");
					phone_number = true;
				}
				else{
					
					if(phone_reg.test($(".input_phone").val())){
						phone_number = false;
						$(".phone_info").text("手机号可用");
						test_ph = true;
					}
							
					else{
						$(".phone_info").text("手机号格式错误");
					}			
				}
			}
		});
		
		
	});
	// 设置密码
	var test_pas = false;
	$(".set_pass").blur(function(){
		var set_pass_reg = /^.{6,15}$/;
		if(set_pass_reg.test($(this).val())){
			$(".pass_info").text("密码格式正确");
			test_pas = true;
		}else{
			test = false;
			if($(this).val()==""){
				$(".pass_info").text("密码不能为空");
			}else
			$(".pass_info").text("密码位数错误");

		}
	});
	// 确认密码
	var test_conf = false;
	$(".confi_pass").blur(function(){
		if($(".set_pass").val()==""){
			$(".confi_pass_info").text("设置密码不能为空");
		}else{
			test = false;
			if($(this).val()==$(".set_pass").val()){
				$(".confi_pass_info").text("密码重复正确");
				test_conf = true;
			}else{
				$(".confi_pass_info").text("密码重复错误");
			}
		}		
	});
	// 点击注册，提交表单
	$(".reg_submit").click(function(){
		if(!phone_number||!usernameExist){
			if(test_us&&test_ph&&test_pas&&test_conf){
				$.post("register.php", {
					username:$(".username").val(),
					phone : $(".input_phone").val(),
					password : $(".set_pass").val()
				}, function(data){
					console.log(data);
					if (data.status == 1) 
						location = "login.html";
					else
						$(".sub").text("用户注册失败，请稍后重试");
				}, "json");
			}
		}
		else{
			$(".sub").text("用户注册失败，请稍后重试");
		}
	});
	
})
