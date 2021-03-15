//查询角色信息
function query_data() {
	var value = "";
	var url = "user_privsSettingsAction.action";
	var keyword = {
			
			"usercode" : "",
			"word" : ""
			
		};
	showOverlay();
	keyword.usercode=$("#sysuser").val().trim();
	$("#progressImgage").attr("class", "");
	$
			.ajax({
				url : url,
				type : 'post',
				
				data : {
					"keyword" : JSON.stringify(keyword)
				},
				datatype : 'json',
				success : function(data) {
					//$("#trcaption").text("角色信息");
					$("#trheader").html("<th>用户</th><th>角色</th><th>操作</th>");
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
								+ rows[i].usercode
								+ "\"><td>"
								+ rows[i].usercode
								+ "</td>+<td>"+rows[i].name+"</td><td><a onclick=\"showEditWin('"
								+ rows[i].usercode
								+ "','"
								+ rows[i].role
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a onclick=\"showDelWin('"
								+ rows[i].usercode
								+ "','"+ rows[i].name+"','"
								+ rows[i].role
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>&nbsp;&nbsp;<a onclick=\"showAddWin('"
								+ rows[i].usercode
								+ "','"
								+ rows[i].role
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>新增</a>"
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

function showAddWin(usercode, role) {
	init_roles();
	$("#pk").val(usercode);
	$("#code1").val(usercode);
	$("#a1").val(role);
	$("#jaiyi").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function showEditWin(usercode, role) {
	init_roles1();
	$("#pk").val(usercode);
	$("#code").val(usercode);
	$("#a1").val(role);
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function showDelWin(usercode, name,role) {	
	var usercode=usercode;
	var name=name;
	$("#pk").val(usercode);
	$("#a1").val(role);
	var html = "<p>确定要删除【" + usercode + "】所对应的角色:【" + name + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#button_delete").attr("class", "btn btn-warning");
	$("#showModal").modal('show');
}

/*
//为用户小新增加角色
function saveData() {
	var sysuser =$("#sysuser option:selected").text(); 
	var sysrole=$("#sysrole option:checked").text();
	//$("#a1").val($("#sysuser").val());
	//$("#a2").val($("#sysrole").val());
	//$("#sysuser").val().trim();
	var html = "<p>确定要为【" + sysuser + "】新增角色:【" + sysrole + "】？</p>";
	$("#frameInfor1").html(html);
	//$("#frameTitle").text("确定为该用户新增加角色？");
	$("#button_add1").attr("class", "btn btn-warning");
	$("#user_privs_add").modal('show');
}*/

/*
//为用户小新增加角色
function saveData1() {
	var value;
	var keyword = {
		
		"usercode" : "",
		"role" : "",
		"role_old":"",
		"command" : "ins"
	};

	value = $("#sysuser").val();
	if (value.length > 0) {
		keyword.usercode = value;
	} else {
		alert("请选择用户！");
		$("#sysuser").focus();
		return false;
	}
	value = $("#sysrole").val();
	if (value.length > 0) {
		keyword.role = value;
	} else {
		$("#sysrole").focus();
		alert("请选择对应角色！");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveuser_privsSettingsAction.action';
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
				alert("添加成功！");
				$("#user_privs_add").modal("hide");
				query_data();
			} else {
				alert("保存失败！");
			}
		}
	});
}
*/
function saveData_new() {
	var value;
	var keyword = {
		
		"usercode" : "",
		"role" : "",
		"role_old":"",
		"command" : "ins"
	};

	value = $("#code1").val();
	if (value.length > 0) {
		keyword.usercode = value;
	} else {
		alert("请选择用户！");
		$("#code1").focus();
		return false;
	}	
	
	var v1= $("#a1").val();
	value = $("#sysrole").val();
	if(value==v1){
		alert("与之前用户角色相同，未发生更改！");
		return false;
	}	
	else if (value.length > 0||value!=v1) {
		keyword.role = value;
		//keyword.role_old = v1;
	} 
	else {
		$("#sysrole").focus();
		alert("请选择对应角色！");
		return false;
	}
	/*value = $("#sysrole").val();
	if (value.length > 0) {
		keyword.role = value;
	} else {
		$("#sysrole").focus();
		alert("请选择对应角色！");
		return false;
	}*/	
	var url = "";
	$("#frameInfor").html("");
	url = 'saveuser_privsSettingsAction.action';
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
				alert("添加成功！");
				$("#jaiyi").modal("hide");
				query_data();
			} else {
				alert("保存失败！");
			}
		}
	});
}
//为用户修改角色
function saveData2() {
	var value;
	var keyword = {
		"pk" : "",
		"usercode" : "",
		"role" : "",
		"role_old":"",
		"command" : "ins"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		keyword.command = "upd";
	}
	//if()
	value = $("#code").val();
	if (value.length > 0) {
		keyword.usercode = value;
	} else {
		alert("请输入代码！");
		$("#code").focus();
		return false;
	}
	var v1= $("#a1").val();
	
	value = $("#sysrole1").val();
	if(value==v1){
		alert("与之前用户角色相同，未发生更改！");
		return false;
	}	
	else if (value.length > 0||value!=v1) {
		keyword.role = value;
		keyword.role_old = v1;
	} 
	else {
		$("#sysrole1").focus();
		alert("请输入角色名！");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveuser_privsSettingsAction.action';
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
		//"pk" : "",
		"usercode" : "",
		"role" : "",
		"command" : "del",
		"role_old" : ""
	};
	keyword.role=$("#a1").val();
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.usercode = value;
	} else {
		alert("请选择删除记录！");
		$("#showModal").modal("hide");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveuser_privsSettingsAction.action';
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