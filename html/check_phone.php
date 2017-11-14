<?php 
	// 获取待检测的手机名
	$phone = $_REQUEST["phone"];

	mysql_connect("localhost:3306", "root", "");
	// 设置在数据库中读写库时编码为 utf8
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

	mysql_select_db("h51707");
	$sql = "SELECT * FROM users WHERE phone = '$phone'";
	$result = mysql_query($sql);
	$data = "";

	if ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo '{"status":0, "message":"exist"}';
	} else {
		echo '{"status":1, "message":"not exist"}';
	}

	mysql_close();
 ?>