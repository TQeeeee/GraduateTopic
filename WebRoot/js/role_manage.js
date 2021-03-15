//查询角色信息
function query_data() {
	var value = "";
	var url = "role_manageSettingsAction.action";
	showOverlay();
	$("#progressImgage").attr("class", "");
	$
			.ajax({
				url : url,
				type : 'post',
				datatype : 'json',
				success : function(data) {
					//$("#trcaption").text("角色信息");
					$("#trheader").html("<th>角色</th><th>操作</th>");
					var json = $.parseJSON(data);
					//alert(data);
					if (json.reccount == -1) {
						alert(json.rows);
						location.href = "login.jsp";
					}
					var rows = json.rows;
					// 获取记录数量
					var html = "";
					for ( var i = 0; i < rows.length; i++) {
						html = html
								+ "<tr pk=\""
								+ rows[i].code
								+ "\"><td>"
								+ rows[i].name
								+ "</td><td><a onclick=\"showEditWin('"
								+ rows[i].code
								+ "','"
								+ rows[i].name
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a onclick=\"showDelWin('"
								+ rows[i].code
								+ "','"
								+ rows[i].name
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
								+ "</td></tr>";
					}
					$("#tbodys").html(html);
					hideOverlay();
					$("#progressImgage").attr("class", "hidden");
				}
			});
	//$("#frameform").attr("class", "table-center-block hidden");
	$("#framerows").attr("class", "table-center-block-rows");
}

function showAddWin() {
	$("#pk").val("");
	$("#code").val("");
	$("#name").val("");
	$("#showEditor").modal({
		keyboard : false
	});
}

function showEditWin(code, name) {
	$("#pk").val(code);
	$("#code").val(code);
	$("#name").val(name);
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function showDelWin(pk, text) {
	$("#pk").val(pk);
	var html = "<p>确定要删除所选定的记录:【" + text + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonDel").attr("class", "btn btn-warning");
	$("#showModal").modal('show');
}

function saveData() {
	var value;
	var keyword = {
		"pk" : "",
		"code" : "",
		"name" : "",
		"command" : "ins"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		keyword.command = "upd";
	}
	value = $("#code").val();
	if (value.length > 0) {
		keyword.code = value;
	} else {
		alert("请输入代码！");
		$("#code").focus();
		return false;
	}
	value = $("#name").val();
	if (value.length > 0) {
		keyword.name = value;
	} else {
		$("#name").focus();
		alert("请输入角色名！");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveRoleSettingsAction.action';
	$.ajax({
		url : url,
		type : 'post',
		data : {
			'keyword' : JSON.stringify(keyword)
		},
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			// 获取记录数量
			var reccount = parseInt(json.reccount);
			var rows = json.rows;
			if (reccount > 0) {
				alert("保存成功！");
				$("#showEditor").modal("hide");
				query_data();
			} else {
				alert("保存失败！");
			}
		}
	});
}

function delData() {
	var pk = $("#pk").val();
	var value;
	var keyword = {
		"pk" : "",
		"command" : "del"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
	} else {
		alert("请选择删除记录！");
		$("#showModal").modal("hide");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveRoleSettingsAction.action';
	$.ajax({
		url : url,
		type : 'post',
		data : {
			'keyword' : JSON.stringify(keyword)
		},
		datatype : 'json',
		success : function(data) {
			alert("你好！");
			var json = $.parseJSON(data);
			// 获取记录数量
			var reccount = parseInt(json.reccount);
			var html;
			$("#showModal").modal("hide");
			if (reccount > 0) {
				var code = "#" + pk;
				html = "";
				$(code).html(html);
				alert("删除成功！");
				query_data();
			} else {
				alert("删除失败！");
			}
		}
	});
}