/**
 * 初始化专业方向major
 */
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
		//async: false,
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#major").empty();
			//$("#major").append("<option value=\"0\">全部</option>");
			for ( var i = 0; i < rows.length; i++) {
				$("#major").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}

/**
 * 隐藏域：id:usertype
 */
function init_usertype(){
	var url="userType_checkTopicAction.action";
	//var usertype = "";
	$.ajax({
		url : url,
		type : 'post',
		datatype : 'json',
		async: false,
		success : function(data) {
			var json = $.parseJSON(data);
			//usertype = json.usertype;	
			$("#usertype").val(json.usertype);
			//alert("New is:"+$("#usertype").val());
		}
		
	});
	
}

/**
 * 初始化角色role
 */
function init_role(){
	let code = "none";
	$.ajax({
		url : 'getModelInitAction',
		type : 'post',
		data : {
			'code' : code,
			'model' : 'role'
		},
		datatype : 'json',
		//async: false,
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#role").empty();
			for ( var i = 0; i < rows.length; i++) {
				$("#role").append(
						"<option value=\"" + rows[i].code + "\">"
								+ rows[i].name + "</option>");
			}
		}
	});
}



