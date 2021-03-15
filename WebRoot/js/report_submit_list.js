//查询角色信息
function query_data() {
	var value = "";
	var url = "report_submit_listReportAction.action";
	showOverlay();
	$("#progressImgage").attr("class", "");
	$
		.ajax({
			url : url,
			type : 'post',
			datatype : 'json',
			success : function(data) {
				//$("#trcaption").text("角色信息");
				$("#trheader").html("<th>报告标题</th><th>状态</th><th>分数</th><th>操作</th>");
				var json = $.parseJSON(data);
				//alert(data);
				if (json.reccount == -1) {
					alert(json.rows);
					location.href = "login.jsp";
				}
				var rows = json.rows;
				// 获取记录数量
				var html = "";
				for (var i = 0; i < rows.length; i++) {
					$("#topictitle").val(rows[i].title);
					$("#reporttitle").val(rows[i].title);
					$("#showtitle ").val(rows[i].title);
					$("#reportRemark ").val(rows[i].remark);
					html = html
						+ "<tr pk=\"" + rows[i].code + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].state + "</td><td>"
						+ rows[i].score
						+ "</td><td>";
					if(rows[i].state=="未上传"){
						html=html+"<a onclick=\"showEditWin('"+ rows[i].title
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>报告提交</a>"
					}else{
						$("#downurl").html("<a  href=\"streamDownload.action?fileName="+rows[i].filepath+"\">下载开题报告</a>");
						html=html+"<a onclick=\"showWin('"+ rows[i].title
						+ "')\"><i class='glyphicon glyphicon-hand-right bigger-130 green'></i>查看报告</a>";
					}
					if(rows[i].state=="评审通过"||rows[i].state=="未评审通过"){
						html=html+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onclick=\"showResWin('"
						+ rows[i].title
						+ "')\"><i class='glyphicon glyphicon-hand-right bigger-130 light-red'></i>查看报告评价</a>"
						+ "</td></tr>";}
				}
				$("#tbodys").html(html);
				hideOverlay();
				$("#progressImgage").attr("class", "hidden");
			}
		});
	//$("#frameform").attr("class", "table-center-block hidden");
	$("#framerows").attr("class", "table-center-block-rows");
}



function showEditWin() {
	$("#pk").val(pk);
	$("#myModal").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function showWin() {
	$("#pk").val(pk);
	$("#showModal").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function showResWin() {
	$("#pk").val(pk);
	$("#showResult").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function saveData() {
	var value;
	var keyword = {
		"pk" : "",
		"title" : "",
		"score" : "",
		"command" : "ins"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		keyword.command = "upd";
	}
	value = $("#title").val();
	if (value.length > 0) {
		keyword.code = value;
	} else {
		alert("报告标题！");
		$("#title").focus();
		return false;
	}
	value = $("#score").val();
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
