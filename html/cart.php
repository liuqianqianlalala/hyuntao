<?php 
	$username = $_REQUEST["username"];
	$action = $_REQUEST["action"]; // 操作动作

	mysql_connect("localhost:3306", "root", "");
	// 设置在数据库中读写库时编码为 utf8
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	// 选择数据库
	mysql_select_db("h51707");

	if ($action === "add") { // 新增购物车选购商品
		$id = $_REQUEST["prod_id"];
		$title = $_REQUEST["title"];
		$price = $_REQUEST["price"];
		$amount = $_REQUEST["amount"];

		// 创建插入数据的SQL语句
		$sql = "INSERT INTO  `h51707`.`cart` VALUES (NULL ,  '$username',  '$id',  '$title',  '$price',  '$amount',  '0')";
		// 执行SQL语句
		$result = mysql_query($sql);
		// 根据数据插入成功/失败判断
		if ($result) {
			echo '{"status":1, "message":"success"}';
		} else {
			echo '{"status":0, "message":"failed"}';
		}
	} else if ($action === "modify") { // 新增购物车选购商品
		$id = $_REQUEST["prod_id"];
		$amount = $_REQUEST["amount"];

		// 创建插入数据的SQL语句
		$sql = "UPDATE  `h51707`.`cart` SET amount='$amount' WHERE username='$username' AND prod_id='$id' AND status='0'";
		// 执行SQL语句
		$result = mysql_query($sql);
		// 根据数据修改成功/失败判断
		if ($result) {
			echo '{"status":1, "message":"success"}';
		} else {
			echo '{"status":0, "message":"failed"}';
		}
	}

	// 关闭数据库连接
	mysql_close();
 ?>