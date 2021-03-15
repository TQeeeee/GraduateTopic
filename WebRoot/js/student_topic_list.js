/**
 * 查看学生已提交的选题
 */

function query_data(){
	var value = "";
	var keyword ={
			"usertype":"student"
	};
	var url = "submittedTopic_lookTopicAction.action";//加载数据，查看已提交的选题
	showOverlay();
	$("#progressImgage").attr("class", "");
	$.ajax({
		url : url,
		type : 'post',
		data : {
			'keyword' : JSON.stringify(keyword)
		},
		datatype : 'json',
		success : function(data) {
			$("#trheader").html("<th>选题名称</th><th>专业方向</th><th>状态</th><th>操作</th>");
			var json = $.parseJSON(data);
			//alert(data);
			if (json.reccount == -1) {
				//alert(json.rows);
				location.href = "login.jsp";
			}
			var rows = json.rows;
			// 获取记录数量
			var html = "";
			var state = new Array("未选","已选","已确认");
			var now = "";
			for ( var i = 0; i < rows.length; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html
						+ "<tr pk=\""
						+ rows[i].tcode
						+ "\"><td>"
						+ rows[i].title
						+ "</td><td>"
						+ rows[i].tmajor
						+ "</td><td>"
						+ now
						+ "</td><td><a onclick=\"showLookWin('"
						+ rows[i].tcode
						+ "','"
						+ rows[i].title
						+ "','"
						+ rows[i].tmajor
						+ "','"
						+ rows[i].summary
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a onclick=\"showEditWin('"
						+ rows[i].state
						+ "','"
						+ rows[i].tcode
						+ "','"
						+ rows[i].title
						+ "','"
						+ rows[i].tmajor
						+ "','"
						+ rows[i].summary
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a onclick=\"showDelWin('"
						+ rows[i].state
						+ "','"
						+ rows[i].tcode
						+ "','"
						+ rows[i].title
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

//查看选题状态并且为只读
function showLookWin(code,title,major,summary){
	$("#Ttitle").val(title);
	$("#Tmajor").val(major);
	$("#Tsummary").val(summary);
	$("#showView").modal({
		backdrop : 'static',
		keyboard : false
	});
	
}
//申报选题
function showAddWin() {
	$("#pk").val("");
	$("#title").val("");
	$("#major option[value='0']").hide();
	$("#summary").val("");
	$("#showEditor").modal({
		keyboard : false
	});
	//$("#buttonSave").show();
}
//更改选题
function showEditWin(state,code, title,major,summary) {
	if(state==0){
		$("#pk").val(code);
		$("#title").val(title);
		$("#major option[value='0']").hide();
		$("#summary").val(summary);
		$("#buttonSave").show();
		
		$("#showEditor").modal({
			backdrop : 'static',
			keyboard : false
		});	
	}else if(state==1){
		
		var html = "<p>选题:【" + title + "】已选，不可再次编辑</p>";
		$("#frameInfor").html(html);
		$("#frameTitle").text("操作提示");
		$("#buttonDel").hide();
		$("#showModal").modal('show');
	}else{
		var html = "<p>选题:【" + title + "】已确认，不可再次编辑</p>";
		$("#frameInfor").html(html);
		$("#frameTitle").text("操作提示");
		$("#buttonDel").hide();
		$("#showModal").modal('show');
		
	}
	
}
//删除选题
function showDelWin(state,code, title) {
	if(state==0){
		$("#pk").val(code);
		var html = "<p>确定要删除所选定的记录:【" + title + "】？</p>";
		$("#frameInfor").html(html);
		$("#frameTitle").text("操作确定");
		$("#buttonDel").show();
		$("#buttonDel").attr("class", "btn btn-warning");
		$("#showModal").modal('show');
	}else if(state==1){
		var html = "<p>选题:【" + title + "】已选，不可删除</p>";
		$("#frameInfor").html(html);
		$("#frameTitle").text("操作提示");
		$("#buttonDel").hide();
		$("#showModal").modal('show');
	}else{
		var html = "<p>选题:【" + title + "】已确认，不可删除</p>";
		$("#frameInfor").html(html);
		$("#frameTitle").text("操作提示");
		$("#buttonDel").hide();
		$("#showModal").modal('show');
	}
	
}

function saveData() {
	$("#buttonSave").attr("disabled", "disabled"); 
	var value;
	var keyword = {
		"pk" : "",
		"title":"",
		"major":"",
		"summary":"",
		"command" : "ins",
		"usertype":"student"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		keyword.command = "upd";
	}
	value = $("#title").val();
	if (value.length > 0) {
		keyword.title = value;
	} else {
		alert("请输入选题名称！");
		$("#title").focus();
		return false;
	}
	value = $("#major option:selected").val();
	if (value == 0) {
		alert("请选择专业方向！");
		return false;
		
	} else {
		
		keyword.major = value;
		
	}
	
	
	value = $("#summary").val();
	if (value.length > 0) {
		keyword.summary = value;
	} else {
		alert("请输入选题简介！");
		$("#summary").focus();
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'submittedTopic_saveTopicAction.action';
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
				$("#buttonSave").removeAttr("disabled");
				query_data();
			} else {
				$("#showEditor").modal("hide");
				$("#buttonSave").removeAttr("disabled");
				alert("保存失败！");
			}
		}
	});
}


function delData() {
	//$("#buttonDel").attr("disabled", "disabled"); 
	var pk = $("#pk").val();
	var value;
	var keyword = {
			"pk" : "",
			"title":"",
			"major":"",
			"summary":"",
			"command" : "del",
			"usertype":"student"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
	} 
	var url = "";
	$("#frameInfor").html("");
	url = 'submittedTopic_saveTopicAction.action';
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
				$("#buttonDel").removeAttr("disabled");
				alert("删除成功！");
				$("#showModal").modal("hide");
				//$("#buttonDel").removeAttr("disabled");
				query_data();
			} else {
				$("#buttonDel").removeAttr("disabled");
				alert("删除失败！");
				$("#showModal").modal("hide");
				//$("#buttonDel").removeAttr("disabled");
				query_data();
			}
		}
	});
}



