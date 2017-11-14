$(function(){
	// 异步加载省份信息
	$.when(
		$.ajax("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1"),
		$.ajax("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2")
	).then(function(data1, data2){
		console.log(data1, data2);
		var html = "<option value='-1'>请选择省份</option>";
		data1[0].showapi_res_body.data.forEach(function(province){
			html += `<option value="${province.id}">${province.areaName}</option>`;
		});
		data2[0].showapi_res_body.data.forEach(function(province){
			html += `<option value="${province.id}">${province.areaName}</option>`;
		});
		$("#province").html(html);
	});

	// 选择省份发生改变时，查询该省份下的所有城市
	$("#province").change(function(){
		// 获取选择省份的id
		var _parentId = $(this).val();
		if (_parentId == -1)
			return;
		// 根据选择省份id查询城市
		var url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		var html = "<option value='-1'>请选择城市</option>";
		$.getJSON(url, function(data){
			data.showapi_res_body.data.forEach(function(city){
				html += `<option value="${city.id}">${city.areaName}</option>`;
			});
			$("#city").html(html);
		});

		$("#district").html(`<option value="-1">请选择区县</option>`);
	});

	// 选择城市发生改变时，查询该城市下的所有区县
	$("#city").change(function(){
		// 获取选择城市的id
		var _parentId = $(this).val();
		if (_parentId == -1)
			return;
		// 根据选择城市id查询区县
		var url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		var html = "<option value='-1'>请选择区县</option>";
		$.getJSON(url, function(data){
			data.showapi_res_body.data.forEach(function(district){
				html += `<option value="${district.id}">${district.areaName}</option>`;
			});
			$("#district").html(html);
		});
	});
	$(".btn").click(function(){
		$(".bt_info").show();
	});
});