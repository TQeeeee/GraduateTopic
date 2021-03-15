//查询角色信息
function query_data() {
	var value = "";
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	
	var url = "evaluteReport_lookReportAction.action";
	var keyword = {
			"usertype" : "admin",
			"choose":"0"
			};
	//读取查询关键词
		
		keyword.choose=choose;
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
					
					if(choose=="0"){
						$("#trheader").html(
						"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th>");
					}
					if(choose=="1"){
						$("#trheader").html(
						"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th><th>分数</th><th>状态</th><th>操作</th>");
					}
					// 将所有返回数据存放在页面
					$("#allrows").val(data);		
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
					var state = new Array("待评审","审核通过","审核未通过");
					var now = "";
					if(choose=="0"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							html = html
							+ "<tr><td>"
							+ rows[i].title
							+ "</td><td>"
							+ rows[i].major
							+ "</td><td>"
							+ rows[i].student
							+ "</td><td>"
							+ rows[i].teacher
							+ "</td></tr>";
						}
					}
					if(choose=="1"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							if(rows[i].state == 0) now=state[0];
							if(rows[i].state == 1) now=state[1];
							if(rows[i].state == 2) now=state[2];
							html = html + "<tr><td>"
							+ rows[i].title + "</td><td>"
							+ rows[i].major + "</td><td>"
							+ rows[i].student + "</td><td>"
							+ rows[i].teacher + "</td><td>"
							+ rows[i].score + "</td><td>"
							+ now + "</td><td>";
							html = html
							+ "<a class=\"btn-link\" onclick=\"showLookWin('"
							+ rows[i].title
							+ "','"
							+ rows[i].score
							+ "','"
							+ rows[i].remark
							+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情</a>"
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

function showLookWin(title,score,remark){
	$("#reportTitle").val(title);
	$("#rScore").val(score);
	$("#rRemark").val(remark);
	$("#showReview").modal({
		backdrop : 'static',
		keyboard : false
	});
}


function gonext() {
	
	var value = "";
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}

	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th><th>分数</th><th>状态</th><th>操作</th>");
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
		// 获取记录数量
		var html = "";
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html
				+ "<tr><td>"
				+ rows[i].title
				+ "</td><td>"
				+ rows[i].major
				+ "</td><td>"
				+ rows[i].student
				+ "</td><td>"
				+ rows[i].teacher
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].major + "</td><td>"
				+ rows[i].student + "</td><td>"
				+ rows[i].teacher + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情</a>"
				+ "</td></tr>";
			}
		}
		
	
		$("#tbodys").html(html);
	}
}

function gopre() {
	var value = "";
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}

	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		// 获取记录数量
		var html = "";
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html
				+ "<tr><td>"
				+ rows[i].title
				+ "</td><td>"
				+ rows[i].major
				+ "</td><td>"
				+ rows[i].student
				+ "</td><td>"
				+ rows[i].teacher
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].major + "</td><td>"
				+ rows[i].student + "</td><td>"
				+ rows[i].teacher + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情</a>"
				+ "</td></tr>";
			}
		}
		
		
		$("#tbodys").html(html);
	}
}

function gofirst() {
	var value = "";
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}

	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		// 获取记录数量
		var html = "";
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html
				+ "<tr><td>"
				+ rows[i].title
				+ "</td><td>"
				+ rows[i].major
				+ "</td><td>"
				+ rows[i].student
				+ "</td><td>"
				+ rows[i].teacher
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].major + "</td><td>"
				+ rows[i].student + "</td><td>"
				+ rows[i].teacher + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情</a>"
				+ "</td></tr>";
			}
		}
		
		
		$("#tbodys").html(html);
	}
}

function golast() {
	var value = "";
	var choose = "0";
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}

	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>学生</th><th>指导教师</th><th>分数</th><th>状态</th><th>操作</th>");
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
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html
				+ "<tr><td>"
				+ rows[i].title
				+ "</td><td>"
				+ rows[i].major
				+ "</td><td>"
				+ rows[i].student
				+ "</td><td>"
				+ rows[i].teacher
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].major + "</td><td>"
				+ rows[i].student + "</td><td>"
				+ rows[i].teacher + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情</a>"
				+ "</td></tr>";
			}
		}
		
		$("#tbodys").html(html);
	}
}