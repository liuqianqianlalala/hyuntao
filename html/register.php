<?php 
	// 获取请求中传递的用户数据
	$username = $_POST["username"];
	$password = $_POST["password"];
	$phone = $_POST["phone"];

	/* 将用户数据保存到数据库中 */
	// 连接数据库服务器
	$conn = mysql_connect("localhost:3306", "root", "");
	if (!$conn)
		die('Could not connect: ' . mysql_error());

	// 选择连接数据库名称
	mysql_select_db("h51707");
	// 创建插入数据的SQL语句
	$sql = "INSERT INTO users (username, password, phone) VALUES ( '$username','$password', '$phone')";
	// 执行SQL语句
	$result = mysql_query($sql);
	// 根据数据插入成功/失败判断
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
	}
	// 判断数据库连接
	mysql_close();
 ?>