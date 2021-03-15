function init_major() {
	var code = "none";
	$.ajax({
		url : 'getModelInitAction',
		type : 'post',
		data : {
			'code' : code,
			'model' : 'major'
		},
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#major").empty();
			$("#major").append("<option value=\"0\">全部</option>");
			for ( var i = 0; i < rows.length; i++) {
				$("#major").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}

//init_roles

function init_roles() {
	var code = "none";
	$.ajax({
		url : 'getrolesInitAction',
		type : 'post',
		data : {
			'code' : code,
			'model' : 'sysrole'
		},
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#sysrole").empty();
			$("#sysrole").append("<option value=\"0\">全部</option>");
			for ( var i = 0; i < rows.length; i++) {
				$("#sysrole").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}
//角色选择框2
function init_roles1() {
	var code = "none";
	$.ajax({
		url : 'getrolesInitAction',
		type : 'post',
		data : {
			'code' : code,
			'model' : 'sysrole'
		},
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#sysrole1").empty();
			$("#sysrole1").append("<option value=\"0\">全部</option>");
			for ( var i = 0; i < rows.length; i++) {
				$("#sysrole1").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}
//

///init_menus
function init_menus() {
	var code = "none";
	$.ajax({
		url : 'getmenusInitAction',
		type : 'post',
		data : {
			'code' : code,
			'model' : 'sysmenu'
		},
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#sysmenu").empty();
			$("#sysmenu").append("<option value=\"0\">全部</option>");
			for ( var i = 0; i < rows.length; i++) {
				$("#sysmenu").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}

/////init_users

function init_users() {
	var code = "none";
	$.ajax({
		url : 'getusersInitAction',
		type : 'post',
		data : {
			'code' : code,
			'model' : 'sysuser'
		},
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#sysuser").empty();
			$("#sysuser").append("<option value=\"0\">全部</option>");
			for ( var i = 0; i < rows.length; i++) {
				$("#sysuser").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}
