/**
 * 查看教师已提交的选题
 * 选题编号-pk
 */


function query_data(){
	var value = "";
	var keyword ={
			"usertype":"teacher"
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
			var state = new Array("待评审","评审通过","评审未通过");
			var now = "";
			for ( var i = 0; i < rows.length; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				if(rows[i].state == 0){
					html = html
					+ "<tr pk=\""
					+ rows[i].tit_code
					+ "\"><td>"
					+ rows[i].title
					+ "</td><td>"
					+ rows[i].major
					+ "</td><td>"
					+ now
					+ "</td><td><a onclick=\"showLookWin('"
					+ rows[i].tit_code
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a onclick=\"showEditWin('"
					+ rows[i].tit_code
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a onclick=\"showDelWin('"
					+ rows[i].tit_code
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
				}
				else{
					html = html
					+ "<tr pk=\""
					+ rows[i].tit_code
					+ "\"><td>"
					+ rows[i].title
					+ "</td><td>"
					+ rows[i].major
					+ "</td><td>"
					+ now
					+ "</td><td><a onclick=\"showLookWin('"
					+ rows[i].tit_code
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a onclick=\"showEvalutedWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].score
					+ "','"
					+ rows[i].remark
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>评审详情</a>"
					+ "</td></tr>";
				}
				
			}
			$("#tbodys").html(html);
			hideOverlay();
			$("#progressImgage").attr("class", "hidden");
		}
	});
//$("#frameform").attr("class", "table-center-block hidden");
$("#framerows").attr("class", "table-center-block-rows");
}

function showEvalutedWin(title,score,remark){
	$("#evaluted_title").val(title);
	$("#score").val(score);
	$("#remark").val(remark);
	$("#showEvalute").modal({
		backdrop : 'static',
		keyboard : false
	});
}

//查看选题状态并且为只读
function showLookWin(code,title,major,summary){
	$("#title").val(title);
	
	$("#summary").val(summary);
	//不显示确定按钮
	$("#buttonSave").hide();
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
	
}
//申报选题
function showAddWin() {
	$("#pk").val("");
	$("#title").val("");
	//$("#major option[value='0']").hide();
	$("#summary").val("");
	$("#buttonSave").show();
	$("#showEditor").modal({
		keyboard : false
	});
}

function showEditWin(code, title,major,summary) {
	$("#pk").val(code);
	$("#title").val(title);
	//$("#major option[value='0']").hide();
	$("#summary").val(summary);
	$("#buttonSave").show();
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function showDelWin(code, title) {
	$("#pk").val(code);
	var html = "<p>确定要删除所选定的记录:【" + title + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonDel").attr("class", "btn btn-warning");
	$("#showModal").modal('show');
}

function saveData() {
	var value;
	var keyword = {
		"pk" : "",
		"title":"",
		"major":"",
		"summary":"",
		"command" : "ins",
		"usertype":"teacher"
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
	//value = $("#major option:selected").val();
	value = $("#teacher_majorcode").val();
	keyword.major = value;
	
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
			"title":"",
			"major":"",
			"summary":"",
			"command" : "del",
			"usertype":"teacher"
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
				alert("删除成功！");
				query_data();
			} else {
				alert("删除失败！");
			}
		}
	});
}

