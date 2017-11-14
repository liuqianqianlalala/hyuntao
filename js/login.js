$(function(){
	// 点击登录按钮
	$(".submit").click(function(){
		$.getJSON("login.php", {
			username:$(".username").val(),
			password:$(".password").val()
		}, function(respData){
			if (respData.status == 1) { // 登录成功
				// 配置，使得在保存/读取cookie值时可以自动做格式转换
				$.cookie.json = true;
				// 保存登录成功的用户信息到cookie中
				$.cookie("loginUser", respData.data, {path:"/"});
				// 跳转页面
				location = "index.html";
			} else { // 登录失败
				// alert("用户名或密码错误");
				$(".error").text("用户名或密码错误");
			}
		});
	});
	// 引入尾部
	$(".bigfooter").load("include/footer.html");
});