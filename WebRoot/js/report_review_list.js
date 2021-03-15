//查询角色信息
function query_data() {
	var value = "";
	var url = "evaluteReport_lookReportAction.action";
	var choose = "0";
	//0-待评审，1-已评审
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";	
	}
	var keyword = {
			"usertype" : "teacher",
			"choose" : ""
			};
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
					if(choose=="0"){
						$("#trheader").html(
						"<th>题目</th><th>操作</th>");
					}
					if(choose=="1"){
						$("#trheader").html(
						"<th>题目</th><th>分数</th><th>状态</th><th>操作</th>");
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
					var state = new Array("待评审","审核通过","审核未通过");
					var now = "";
					if(choose=="0"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
							+ rows[i].title + "</td><td>";
							html = html
							+ "<a class=\"btn-link\" onclick=\"showEvaluteWin('"
							+ rows[i].code
							+ "','"
							+ rows[i].title
							+ "','"
							+ rows[i].filepath
							+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>评审</a>"
							+ "</td></tr>";
						}
					}
					if(choose=="1"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							if(rows[i].state == 0) now=state[0];
							if(rows[i].state == 1) now=state[1];
							if(rows[i].state == 2) now=state[2];
							html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
							+ rows[i].title + "</td><td>"
							+ rows[i].score + "</td><td>"
							+ now + "</td><td>";
							html = html
							+ "<a class=\"btn-link\" onclick=\"showLookWin('"
							+ rows[i].code
							+ "','"
							+ rows[i].title
							+ "','"
							+ rows[i].score
							+ "','"
							+ rows[i].remark
							+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
							+ "</td></tr>";
						}
					}
//					for ( var i = 0; i < rows.length && i < linage; i++) {
						
//						$("#reportTitle").val(rows[i].title);
//						$("#rScore").val(rows[i].score);
//						$("#rRemark").val(rows[i].remark);						
//						$("#downUrl").html("<a  href=\"streamDownload.action?fileName="+rows[i].filepath+"\">下载开题报告</a>");
//						html = html
//								+ "<tr pk=\""
//								+ rows[i].code
//								+ "\"><td>"
//								+ rows[i].title
//								+ "</td><td>";
//						if(rows[i].state=="0"){
//							html=html+"<a onclick=\"showEditWin('"
//								+ rows[i].code
//								+ "','"+ rows[i].title
//							+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>报告评审</a>"
//						}else{
//							$("#downurl").html("<a  href=\"streamDownload.action?fileName="+rows[i].filepath+"\">下载开题报告</a>");
//							html=html+"<a onclick=\"showRepWin('"+ rows[i].title
//							+ "')\"><i class='glyphicon glyphicon-hand-right bigger-130 green'></i>查看评审</a>";
//						}
//								+ "</td></tr>";
						
//					}
					$("#tbodys").html(html);
					hideOverlay();
					$("#progressImgage").attr("class", "hidden");
				}
			});
	$("#framerows").attr("class", "table-center-block-rows");
}

	function showEditWin(pk,title) {
		$("#pk").val(pk);
		$("#reporttitle").val(title);
		$("#reviewModel").modal({
			backdrop : 'static',
			keyboard : false
		});
	}

	function showRepWin() {
		$("#pk").val();
		$("#showReview").modal({
			backdrop : 'static',
			keyboard : false
		});
	}

	function showEvaluteWin(code,title,filepath){
		$("#pk").val(code);
		$("#reporttitle").val(title);
		$("#rScore").val("");
		$("#rRemark").val("");						
		$("#downUrl").html("<a  href=\"streamDownload.action?fileName="+filepath+"\">下载开题报告</a>");
		$("#reviewModel").modal({
			backdrop : 'static',
			keyboard : false
		});
	}


	function showLookWin(code,title,score,remark){
		$("#reportTitle").val(title);
		$("#rScore").val(score);
		$("#rRemark").val(remark);
		$("#showReview").modal({
			backdrop : 'static',
			keyboard : false
		});
	}


	function saveData() {
		var value;
		var keyword = {
			"pk" : "",		
			"score" : "",
			"remark" : "",
		};
		//alert($("#pk").val());
		value = $("#pk").val();
		if (value.length > 0) {
			keyword.pk = value;		
		}
		value = $("#score").val();
		if (value.length > 0 && /^[1-9]\d*$/.test(value)) {
			keyword.score = value;
		} else {
			alert("请输入报告分数，且报告分数只能是正整数！");
			$("#score").focus();
			return false;
		}
		value = $("#remark").val();
		if (value.length > 0) {
			keyword.remark = value;
		} else {
			$("#remark").focus();
			alert("请输入报告评价！");
			return false;
		}
		var url = "";
		$("#frameInfor").html("");
		url = 'saveReportReportAction.action';
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
					$("#reviewModel").modal("hide");	
					$("#pk").val("");
					$("#reportTitle").val("");
					$("#rScore").val("");
					$("#rRemark").val("");						
					$("#downUrl").html("");
					query_data();
				} else {
					alert("保存失败！");
				}
			}
		});
	}


function gonext() {
	var choose = "0";
	// 读取选择
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	var data = $("#allrows").val();
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>分数</th><th>状态</th><th>操作</th>");
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
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showEvaluteWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].filepath
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>评审</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
				+ "</td></tr>";
			}
		}
		
		
		$("#tbodys").html(html);
	}
}

function gopre() {
	var choose = "0";
	// 读取选择
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	var data = $("#allrows").val();
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showEvaluteWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].filepath
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>评审</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
				+ "</td></tr>";
			}
		}
		
		
		$("#tbodys").html(html);
	}
}

function gofirst() {
	var choose = "0";
	// 读取选择
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	var data = $("#allrows").val();
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showEvaluteWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].filepath
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>评审</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
				+ "</td></tr>";
			}
		}
		
		
		$("#tbodys").html(html);
	}
}

function golast() {
	var choose = "0";
	// 读取选择
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}	
	var data = $("#allrows").val();
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showEvaluteWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].filepath
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>评审</a>"
				+ "</td></tr>";
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
				+ rows[i].title + "</td><td>"
				+ rows[i].score + "</td><td>"
				+ now + "</td><td>";
				html = html
				+ "<a class=\"btn-link\" onclick=\"showLookWin('"
				+ rows[i].code
				+ "','"
				+ rows[i].title
				+ "','"
				+ rows[i].score
				+ "','"
				+ rows[i].remark
				+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
				+ "</td></tr>";
			}
		}
		
		
		$("#tbodys").html(html);
	}
}