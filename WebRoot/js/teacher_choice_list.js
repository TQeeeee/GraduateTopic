/**
 * 三个隐藏域：teacher_majorcode：该教师的专业方向编号
 *            major_code：选题的专业方向编号
 *            code：学生选题编号
 */


/**
 * 教师查看并选择学生选题（全部的学生选题）
 */
//查询学生选题
function query_data() {
	
	var value = "";
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	
	var url = "unconfirmedTopic_lookTopicAction.action";
	//查找专业方向,学生姓名,学生专业
	var keyword = {
			"usertype":"teacher",
			"word" : "",
			"choose":""
			};
	//读取查询关键词
	value = $("#word").val().trim();
	//alert(value);
	keyword.word=value;
	//读取查看类型
	keyword.choose=choose;
	// 读取每页显示多少行信息
	value = $("#linage").val();
	var linage = 16;
	if (!isNaN(value)) {
		linage = parseInt(value);
		$("#linage").text(value);
	}
	$("#progressImgage").attr("class", "");
																											
			$.ajax({
				url : url,
				type : 'post',
				data : {
					"keyword" : JSON.stringify(keyword)
				},
				datatype : 'json',
				success : function(data) {
					// 将所有返回数据存放在页面
					$("#allrows").val(data);
					//alert("ajax");
					if(choose=="0"){
						$("#trheader")
						.html(
								"<th>题目</th><th>专业方向</th><th>学生姓名</th><th>学生专业</th><th>状态</th><th>操作</th>");
					}
					if(choose=="1"){
						$("#trheader")
						.html(
								"<th>题目</th><th>专业方向</th><th>学生姓名</th><th>学生专业</th><th>操作</th>");
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
					var state = new Array("待确认","已确认","已拒绝");
					var now = "";
					if(choose=="0"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							if(rows[i].state==0) now=state[0];
							if(rows[i].state==1) now=state[1];
							if(rows[i].state==2) now=state[2];
							html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
									+ rows[i].title + "</td><td>" + rows[i].major
									+ "</td><td>" + rows[i].name + "</td><td>"
									+ rows[i].stu_major + "</td><td>"
									+ now + "</td><td>";
							
							html = html
									+ "<a onclick=\"showLookWin('"
									+ rows[i].title
									+ "','"
									+ rows[i].summary
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
									+ rows[i].id
									+ "','"
									+ rows[i].title
									+ "','"
									+ rows[i].state
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
									+ "</td></tr>";
						}
					}
					if(choose=="1"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							
							html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
									+ rows[i].title + "</td><td>" + rows[i].major
									+ "</td><td>" + rows[i].name + "</td><td>"
									+ rows[i].stu_major + "</td><td>";
							
							html = html
									+ "<a onclick=\"showLookWin('"
									+ rows[i].title
									+ "','"
									+ rows[i].summary
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
									+ rows[i].code
									+ "','"
									+ rows[i].title
									+ "','"
									+ rows[i].major_code
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
									+ "</td></tr>";
						}
					}
					
					$("#tbodys").html(html);
					hideOverlay();
					$("#progressImgage").attr("class", "hidden");
				}
			});
	$("#framerows").attr("class", "table-center-block-rows");
}


/**
 * 功能：显示选择模态框
 * 参数：code:学生选题编号，title:选题题目，major_code:选题专业方向编号
 */
function showCheckWin(code,title,major_code){
	$("#code").val(code);
	$("#pk").val("");
	$("#major_code").val(major_code);
	var html = "<p>确定要选择所选定的:【" + title + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonCheck").attr("class", "btn btn-info");
	$("#showModal").modal('show');
}

/**
 * 功能：显示删除模态框
 * 参数：id:确认记录编号，title:选题题目
 */
function showDelWin(code,title,state){
	$("#pk").val(code);
	if(state==1){
		alert("已师生互认，无法删除");
		return false;
	}
	var html = "<p>确定要删除所选定的:【" + title + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonCheck").attr("class", "btn btn-info");
	$("#showModal").modal('show');
}



/**
 * 功能：显示查看模态框
 * 参数：title：选题题目，summary:选题简介
 */
function showLookWin(title,summary){
	$("#title").val(title);
	$("#summary").val(summary);
	//不显示确定按钮
	$("#buttonSave").hide();
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}


/**
 * 功能：执行该函数向teacher_confirm
 **/
function CheckData() {
	var value="";
	value=$("#pk").val();
	var teacher_majorcode = $("#teacher_majorcode").val();
	var major_code = $("#major_code").val();
	var code = $("#code").val();
	var keyword = {
			"pk":"",
			"code" : "",
			"usertype":"teacher",
			"command" : "ins"
		};
	
	if(value.length>0){
		keyword.command="del";
		keyword.pk=value;
		var url="";
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
				var rows = json.rows;
				if (reccount > 0) {
					alert("删除成功！");
					
					html = "";
					$("#pk").html(html);
					$("#showModel").modal("hide");
					query_data();
				} else {
					alert("删除失败！");
				}
			}
		});
	}
	else{
		if(teacher_majorcode != major_code){
			alert("该选题方向与教师专业方向不符！");
			return false;
		}
		else{
			keyword.code=code;
			var url="";
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
					var rows = json.rows;
					if (reccount > 0) {
						alert("选择成功！");
						
						html = "";
						$("#code").html(html);
						html = "";
						$("#major_code").html(html);
						$("#showModel").modal("hide");
						query_data();
					} else {
						alert("选择失败！");
					}
				}
			});
		}
		
	}
		
	
}




function gonext() {
	var data = $("#allrows").val();
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
}
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
		var state = new Array("待确认","已确认","已拒绝");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				if(rows[i].state==0) now=state[0];
				if(rows[i].state==1) now=state[1];
				if(rows[i].state==2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>"
				+ now + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
				+ rows[i].id
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].state
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].major_code
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
				+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}	
}


function gopre() {
	var data = $("#allrows").val();
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
}
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
		var state = new Array("待确认","已确认","已拒绝");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				if(rows[i].state==0) now=state[0];
				if(rows[i].state==1) now=state[1];
				if(rows[i].state==2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>"
				+ now + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
				+ rows[i].id
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].state
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].major_code
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
				+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}

function gofirst() {	
	var data = $("#allrows").val();
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
}
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
		var state = new Array("待确认","已确认","已拒绝");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				if(rows[i].state==0) now=state[0];
				if(rows[i].state==1) now=state[1];
				if(rows[i].state==2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>"
				+ now + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
				+ rows[i].id
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].state
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].major_code
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
				+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}

function golast() {
	var data = $("#allrows").val();
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
}
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
		var state = new Array("待确认","已确认","已拒绝");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				if(rows[i].state==0) now=state[0];
				if(rows[i].state==1) now=state[1];
				if(rows[i].state==2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>"
				+ now + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
				+ rows[i].id
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].state
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>" + rows[i].major
				+ "</td><td>" + rows[i].name + "</td><td>"
				+ rows[i].stu_major + "</td><td>";
		
				html = html
				+ "<a onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].summary
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].major_code
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
				+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}