/**
 * 隐藏域pk-选题记录编号，usertype-用户类型
 */
//查询选题信息
function query_data() {
	//alert($("#usertype").val());
	var value="";
	var choose = "";
	var usertype = "";
	var url = "confirmingTopic_lookTopicAction.action";
	choose = "0";
	// 读取用户类型
	usertype = $("#usertype").val();
	//alert(usertype);
	if ($("input[name='choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	if ($("input[name='choose']:checked").val().trim() == "2") {
		choose = "2";
	}
	var keyword = {
			"usertype" : "",
			"choose":""	
			
			};
	keyword.usertype = usertype;
	keyword.choose = choose;
	// 读取每页显示多少行信息
	value = $("#linage").val();
	var linage = 16;
	if (!isNaN(value)) {
		linage = parseInt(value);
		$("#linage").text(value);
	}
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
					// 将所有返回数据存放在页面
					$("#allrows").val(data);
					if(usertype == "teacher"){
						$("#trheader")
							.html(
									"<th>选题题目</th><th>专业方向</th><th>学生姓名</th><th>学生专业</th><th>操作</th>");

					}
					if(usertype == "student"){
						$("#trheader")
							.html(
									"<th>选题题目</th><th>专业方向</th><th>教师姓名</th><th>教师职称</th><th>教师类型</th><th>操作</th>");

					}
					
					var json = $.parseJSON(data);
					if (json.reccount == -1) {
						location.href = "login.jsp";
					}
					var rows = json.rows;
					// 计算出多少页
					var pages = parseInt(json.reccount);
					pages = Math.ceil(pages / linage);
					$("#reccount").text(json.reccount);
					$("#maxpages").text(pages);
					$("#pagenum").text("1");
					// 判断是否需要显示翻页面板
					if (pages > 1) {
						$("#page_tools").attr("class", "border-none");
					} else {
						$("#page_tools").attr("class", "border-none hidden");
					}
					// 获取记录数量
					var html = "";
					//alert(rows.length);
					if(usertype =="teacher"){
						if(choose=="0"){
							for ( var i = 0; i < rows.length && i < linage; i++) {
								
								html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
								+ rows[i].title + "</td><td>" + rows[i].major
								+ "</td><td>" + rows[i].name + "</td><td>"
								+ rows[i].stu_major + "</td><td>";
								
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].title
								+ "','"
								+ rows[i].summary
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
								+ rows[i].id
								+ "','"
								+ rows[i].title
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
								+ "</td></tr>";
							}
						}
						if(choose=="1"){
							for ( var i = 0; i < rows.length && i < linage; i++) {
								html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
								+ rows[i].title + "</td><td>" + rows[i].major
								+ "</td><td>" + rows[i].name + "</td><td>"
								+ rows[i].stu_major + "</td><td>";
							
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].title
								+ "','"
								+ rows[i].summary
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
								+ rows[i].id
								+ "','"
								+ rows[i].title
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
								+ "</td></tr>";
								
							}
						}
						if(choose=="2"){
							for ( var i = 0; i < rows.length && i < linage; i++) {
								html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
								+ rows[i].title + "</td><td>" + rows[i].major
								+ "</td><td>" + rows[i].name + "</td><td>"
								+ rows[i].stu_major + "</td><td>";
							
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].title
								+ "','"
								+ rows[i].summary
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
								+ "</td></tr>";	
							}
						}
					}
					
					if(usertype =="student"){
						if(choose=="0"){
							for ( var i = 0; i < rows.length && i < linage; i++) {
								
								html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
								+ rows[i].title + "</td><td>"
								+ rows[i].major + "</td><td>"
								+ rows[i].name + "</td><td>"
								+ rows[i].t_level + "</td><td>"
								+ rows[i].t_type + "</td><td>";
								
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].title
								+ "','"
								+ rows[i].summary
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
								+ rows[i].id
								+ "','"
								+ rows[i].title
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
								+ "</td></tr>";
							}
						}
						if(choose=="1"){
							for ( var i = 0; i < rows.length && i < linage; i++) {
								html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
								+ rows[i].title + "</td><td>"
								+ rows[i].major + "</td><td>"
								+ rows[i].name + "</td><td>"
								+ rows[i].t_level + "</td><td>"
								+ rows[i].t_type + "</td><td>";
							
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].title
								+ "','"
								+ rows[i].summary
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
								+ rows[i].id
								+ "','"
								+ rows[i].title
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
								+ "</td></tr>";
								
							}
						}
						if(choose=="2"){
							for ( var i = 0; i < rows.length && i < linage; i++) {
								html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
								+ rows[i].title + "</td><td>"
								+ rows[i].major + "</td><td>"
								+ rows[i].name + "</td><td>"
								+ rows[i].t_level + "</td><td>"
								+ rows[i].t_type + "</td><td>";
								
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].title
								+ "','"
								+ rows[i].summary
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
								+ "</td></tr>";
							}
						}
					}
					
					$("#tbodys").html(html);
					hideOverlay();
					$("#progressImgage").attr("class", "hidden");
				}
			});
	$("#framerows").attr("class", "table-center-block-rows");
}



function showDelWin(pk, text) {
	$("#pk").val(pk);
	var html = "<p>确定要删除所选定的记录:【" + text + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonDel").attr("class", "btn btn-info");
	$("#showModal").modal('show');
}

function showCheckWin(pk,text){
	alert(pk);
	$("#pk").val(pk);
	var html = "<p>确定要选择选题:【" + text + "】？</p>";
	$("#frameInforChk").html(html);
	$("#frameTitleChk").text("确认选题");
	$("#buttonChk").attr("class", "btn btn-info");
	$("#showCheck").modal('show');
}
function showLookWin(title,summary){
	$("#title").val(title);
	$("#summary").val(summary);
	$("#buttonSave").hide();
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}




function delData() {
	var pk = $("#pk").val();
	var value;
	var keyword = {
		"usertype" : "",
		"pk" : "",
		"code":"",
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
	value = $("#usertype").val();
	if(value.length>0){
		keyword.usertype = value;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'confirmingTopic_saveTopicAction.action';
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

function checkData(){
	var pk = $("#pk").val();
	
	var value;
	var keyword = {
		"usertype" : "",
		"pk" : "",
		"code":"",
		"command" : "upd"
	};
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
	} else {
		alert("请选择确认记录！");
		$("#showCheck").modal("hide");
		return false;
	}
	value = $("#usertype").val();
	if (value.length > 0) {
		keyword.usertype = value;
	}
	
	
	var url = "";
	$("#frameInforChk").html("");
	url = 'confirmingTopic_saveTopicAction.action';
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
			$("#showCheck").modal("hide");
			if (reccount > 0) {
				var code = "#" + pk;
				html = "";
				$(code).html(html);
				alert("确认成功！");
				query_data();
			} else {
				alert("确认失败！");
			}
		}
	});
}


function gonext() {
	var usertype = "";
	var choose = "";
	usertype = $("#usertype").val();
	// 读取用户类型
	if ($("input[name='choose']:checked").val().trim() == "0") {
		choose = "0";
	}
	if ($("input[name='choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	if ($("input[name='choose']:checked").val().trim() == "2") {
		choose = "2";
	}	
	var data = $("#allrows").val();
	var json = $.parseJSON(data);
	var rows = json.rows;
	// 读取当前页码
	var pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	var maxpages = parseInt($("#maxpages").text());
	// 如果 当前页已经等总页数则不能移动
	if (maxpages == pagenum) {
		alert("已经到了最后一页，不能再移动！");
	} else {
		pagenum = pagenum + 1;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		var linage = parseInt($("#linage").text());
		
		var html = "";
		
		if(usertype =="teacher"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";	
				}
			}
		}
		
		if(usertype =="student"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
				}
			}
		}
		
		
		$("#tbodys").html(html);
	}
}

function gopre() {
	var usertype = "";
	var choose = "";
	usertype = $("#usertype").val();
	// 读取用户类型
	if ($("input[name='choose']:checked").val().trim() == "0") {
		choose = "0";
	}
	if ($("input[name='choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	if ($("input[name='choose']:checked").val().trim() == "2") {
		choose = "2";
	}	
	var data = $("#allrows").val();
	var json = $.parseJSON(data);
	var rows = json.rows;
	// 读取当前页码
	var pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	var maxpages = parseInt($("#maxpages").text());
	// 如果 当前页已经等总页数则不能移动
	if (1 == pagenum) {
		alert("已经到了第一页，不能再移动！");
	} else {
		pagenum = pagenum -1;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		var linage = parseInt($("#linage").text());
		var html = "";
		if(usertype =="teacher"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";	
				}
			}
		}
		
		if(usertype =="student"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
				}
			}
		}
		
		$("#tbodys").html(html);
	}
}

function gofirst() {
	var usertype = "";
	var choose = "";
	usertype = $("#usertype").val();
	// 读取用户类型
	if ($("input[name='choose']:checked").val().trim() == "0") {
		choose = "0";
	}
	if ($("input[name='choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	if ($("input[name='choose']:checked").val().trim() == "2") {
		choose = "2";
	}	
	var data = $("#allrows").val();
	var json = $.parseJSON(data);
	var rows = json.rows;
	// 读取当前页码
	var pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	var maxpages = parseInt($("#maxpages").text());
	// 如果 当前页已经等总页数则不能移动
	if (1 == pagenum) {
		alert("已经到了第一页，不能再移动！");
	} else {
		pagenum = 1;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		var linage = parseInt($("#linage").text());
		var html = "";
		if(usertype =="teacher"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";	
				}
			}
		}
		
		if(usertype =="student"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
				}
			}
		}
		
		$("#tbodys").html(html);
	}
}

function golast() {
	var usertype = "";
	var choose = "";
	usertype = $("#usertype").val();
	// 读取用户类型
	if ($("input[name='choose']:checked").val().trim() == "0") {
		choose = "0";
	}
	if ($("input[name='choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	if ($("input[name='choose']:checked").val().trim() == "2") {
		choose = "2";
	}	
	var data = $("#allrows").val();
	
	var json = $.parseJSON(data);
	var rows = json.rows;
	// 读取当前页码
	var pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	var maxpages = parseInt($("#maxpages").text());
	// 如果 当前页已经等总页数则不能移动
	if (maxpages == pagenum) {
		alert("已经到了最一页，不能再移动！");
	} else {
		pagenum = maxpages;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		var linage = parseInt($("#linage").text());
		
		var html = "";
		if(usertype =="teacher"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].stu_major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";	
				}
			}
		}
		
		if(usertype =="student"){
			if(choose=="0"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>确认</a>"
					+ "</td></tr>";
				}
			}
			if(choose=="1"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
					
				}
			}
			if(choose=="2"){
				for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
					html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>"
					+ rows[i].major + "</td><td>"
					+ rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>"
					+ rows[i].t_type + "</td><td>";
					
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
				}
			}
		}
		
		$("#tbodys").html(html);
	}
}