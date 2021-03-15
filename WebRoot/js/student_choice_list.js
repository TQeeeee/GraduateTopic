/**
 * 隐藏域：tcode:教师选题编号
 */
//查询学生可选的选题
function query_data() {
	var value = "";
	var choose = "0"
	if ($("input[name='Choose']:checked").val().trim() == "1") {
			choose = "1";
	}
	var url = "unconfirmedTopic_lookTopicAction.action";

	var keyword = {
			"usertype":"student",
			"word" : "",
			"choose":""
			};
	//读取查询关键词
	value = $("#word").val().trim();
	//alert(value);
	keyword.word=value;
	//读取查询类型
	
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
					// 将所有返回数据存放在页面
					$("#allrows").val(data);
					if(choose=="0"){
						$("#trheader")
						.html(
								"<th>题目</th><th>专业方向</th><th>教师名称</th><th>职称</th><th>类型</th><th>状态</th><th>操作</th>");
					}
					if(choose=="1"){
						$("#trheader")
						.html(
								"<th>题目</th><th>专业方向</th><th>教师名称</th><th>职称</th><th>类型</th><th>操作</th>");
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
							if(rows[i].state == 2){
								alert("选题:【" + rows[i].title + "】教师已拒绝");
							}
							if(rows[i].state == 0) now=state[0];
							if(rows[i].state == 1) now=state[1];
							if(rows[i].state == 2) now=state[2];
							html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
									+ rows[i].title + "</td><td>" + rows[i].major
									+ "</td><td>" + rows[i].name + "</td><td>"
									+ rows[i].t_level + "</td><td>" + rows[i].t_type
									+ "</td><td>" + now
									+ "</td><td>";
							
							html = html
									+ "<a onclick=\"showLookWin('"
									+ rows[i].title
									+ "','"
									+ rows[i].summary
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
									+ rows[i].title
									+ "','"
									+ rows[i].id
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
									+ "</td></tr>";
						}
					}
					if(choose=="1"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							
							html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
									+ rows[i].title + "</td><td>" + rows[i].major
									+ "</td><td>" + rows[i].name + "</td><td>"
									+ rows[i].t_level + "</td><td>" + rows[i].t_type
									+ "</td><td>";
							
							html = html
									+ "<a onclick=\"showLookWin('"
									+ rows[i].title
									+ "','"
									+ rows[i].summary
									+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
									+ rows[i].title
									+ "','"
									+ rows[i].id
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
function showLookWin(title,summary){
	//alert(title);
	$("#title").val(title);
	//alert(summary);
	$("#summary").val(summary);
	//不显示确定按钮
	$("#buttonSave").hide();
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
	
}
function showCheckWin(title,id){
	$("#tcode").val(id);
	$("#pk").val("");
	var html = "<p>确定要选择所选定的:【" + title + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonCheck").attr("class", "btn btn-info");
	$("#showModal").modal('show');
}

function showDelWin(title,id){
	$("#tcode").val("");
	$("#pk").val(id);
	var html = "<p>确定要删除所选定的:【" + title + "】？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonCheck").attr("class", "btn btn-info");
	$("#showModal").modal('show');
}


function CheckData(){
	var value="";
	
	var keyword = {
			"pk":"",
			"usertype":"student",
			"code":"",
			"command" : "ins"
		};
	
	value=$("#tcode").val();
	keyword.code=value;
	
	value=$("#pk").val();
	keyword.pk=value;
	
	if(value.length>0){
		keyword.command = "del";
	}
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
				
				alert("操作成功！");
				$("#tcode").html("");
				$("#pk").html("");
				$("#showModel").modal("hide");
				query_data();
			} else {
				
				alert("操作失败！");
				$("#showModel").modal("hide");
			}
		}
	});
}


function gonext() {
	var data = $("#allrows").val();
	var choose = "0"
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
				if(rows[i].state == 2){
					alert("选题:【" + rows[i].title + "】教师已拒绝");
				}
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>" + rows[i].major
						+ "</td><td>" + rows[i].name + "</td><td>"
						+ rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + now
						+ "</td><td>";
				
				html = html
						+ "<a onclick=\"showLookWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].summary
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].id
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
						+ "</td></tr>";
			}
		}
		if(choose=="1"){
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {	
			html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>" + rows[i].t_type
					+ "</td><td>";
			
			html = html
					+ "<a onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].id
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
					+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}


function gopre() {
	var data = $("#allrows").val();
	var choose = "0"
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
				if(rows[i].state == 2){
					alert("选题:【" + rows[i].title + "】教师已拒绝");
				}
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>" + rows[i].major
						+ "</td><td>" + rows[i].name + "</td><td>"
						+ rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + now
						+ "</td><td>";
				
				html = html
						+ "<a onclick=\"showLookWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].summary
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].id
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
						+ "</td></tr>";
			}
		}
		if(choose=="1"){
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {	
			html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>" + rows[i].t_type
					+ "</td><td>";
			
			html = html
					+ "<a onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].id
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
					+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}


function gofirst() {	
	var data = $("#allrows").val();
	var choose = "0"
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
				if(rows[i].state == 2){
					alert("选题:【" + rows[i].title + "】教师已拒绝");
				}
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>" + rows[i].major
						+ "</td><td>" + rows[i].name + "</td><td>"
						+ rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + now
						+ "</td><td>";
				
				html = html
						+ "<a onclick=\"showLookWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].summary
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].id
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
						+ "</td></tr>";
			}
		}
		if(choose=="1"){
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {	
			html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>" + rows[i].t_type
					+ "</td><td>";
			
			html = html
					+ "<a onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].id
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
					+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}

function golast() {
	var data = $("#allrows").val();
	var choose = "0"
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
				if(rows[i].state == 2){
					alert("选题:【" + rows[i].title + "】教师已拒绝");
				}
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>" + rows[i].major
						+ "</td><td>" + rows[i].name + "</td><td>"
						+ rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + now
						+ "</td><td>";
				
				html = html
						+ "<a onclick=\"showLookWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].summary
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
						+ rows[i].title
						+ "','"
						+ rows[i].id
						+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>删除</a>"
						+ "</td></tr>";
			}
		}
		if(choose=="1"){
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {	
			html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
					+ rows[i].title + "</td><td>" + rows[i].major
					+ "</td><td>" + rows[i].name + "</td><td>"
					+ rows[i].t_level + "</td><td>" + rows[i].t_type
					+ "</td><td>";
			
			html = html
					+ "<a onclick=\"showLookWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].summary
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showCheckWin('"
					+ rows[i].title
					+ "','"
					+ rows[i].id
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 light-red'></i>选择</a>"
					+ "</td></tr>";
			}
		}
		$("#tbodys").html(html);
	}
}
