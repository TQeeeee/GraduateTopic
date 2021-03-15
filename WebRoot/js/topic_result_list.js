/**
 * 教师评审选题
 */
//查询选题信息
function query_data() {
	var value = "";
	var choose = "0";
	// 读取查看类型
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	var url = "evaluteTopic_lookTopicAction.action";
	var keyword = {
			"usertype" : "admin",
			"choose" : ""
			};
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
						$("#trheader").html(
						"<th>题目</th><th>专业方向</th><th>操作</th>");
					}
					if(choose=="1"){
						$("#trheader").html(
						"<th>题目</th><th>专业方向</th><th>分数</th><th>状态</th><th>操作</th>");
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
							
							html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
									+ rows[i].title + "</td><td>"
									+ rows[i].major + "</td><td>";
							
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].id
								+ "','"
								+ rows[i].title
								+ "','"
								+ rows[i].major
								+ "','"
								+ rows[i].summary
								+ "','"
								+ rows[i].score
								+ "','"
								+ rows[i].remark
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
								+ "</td></tr>";
						
							
						}
					}
					if(choose=="1"){
						for ( var i = 0; i < rows.length && i < linage; i++) {
							if(rows[i].state == 0) now=state[0];
							if(rows[i].state == 1) now=state[1];
							if(rows[i].state == 2) now=state[2];
							html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
									+ rows[i].title + "</td><td>"
									+ rows[i].major + "</td><td>"
									+ rows[i].remark + "</td><td>"
									+ now + "</td><td>";
							
								html = html
								+ "<a class=\"btn-link\" onclick=\"showLookWin('"
								+ rows[i].id
								+ "','"
								+ rows[i].title
								+ "','"
								+ rows[i].major
								+ "','"
								+ rows[i].summary
								+ "','"
								+ rows[i].score
								+ "','"
								+ rows[i].remark
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
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



function showLookWin(code,title,major,summary,score,remark){
	//$("#pk").val(code);
	$("#title").val(title);
	$("#major").val(major);
	$("#summary").val(summary);
	$("#score").val(score);
	$("#remark").val(remark);
	$("#showEditor").modal({
		keyboard : false
	});
}



function gonext() {
	var choose = "0";
	// 读取查看类型
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "','"
					+ rows[i].score
					+ "','"
					+ rows[i].remark
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
			
				
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>"
						+ rows[i].remark + "</td><td>"
						+ now + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
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
	// 读取查看类型
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "','"
					+ rows[i].score
					+ "','"
					+ rows[i].remark
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
			
				
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>"
						+ rows[i].remark + "</td><td>"
						+ now + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
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
	// 读取查看类型
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>分数</th><th>状态</th><th>操作</th>");
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
		
		var state = new Array("待评审","审核通过","审核未通过");
		var now = "";
		if(choose=="0"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "','"
					+ rows[i].score
					+ "','"
					+ rows[i].remark
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
			
				
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>"
						+ rows[i].remark + "</td><td>"
						+ now + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "','"
					+ rows[i].score
					+ "','"
					+ rows[i].remark
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
			
				
			}
		}
		
		
	}
}

function golast() {
	var choose = "0";
	// 读取查看类型
	if ($("input[name='Choose']:checked").val().trim() == "1") {
		choose = "1";
	}
	if(choose=="0"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>操作</th>");
	}
	if(choose=="1"){
		$("#trheader").html(
		"<th>题目</th><th>专业方向</th><th>分数</th><th>状态</th><th>操作</th>");
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
				
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
					+ "','"
					+ rows[i].score
					+ "','"
					+ rows[i].remark
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看</a>"
					+ "</td></tr>";
			
				
			}
		}
		if(choose=="1"){
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {
				if(rows[i].state == 0) now=state[0];
				if(rows[i].state == 1) now=state[1];
				if(rows[i].state == 2) now=state[2];
				html = html + "<tr pk=\"" + rows[i].id + "\"><td>"
						+ rows[i].title + "</td><td>"
						+ rows[i].major + "</td><td>"
						+ rows[i].remark + "</td><td>"
						+ now + "</td><td>";
				
					html = html
					+ "<a class=\"btn-link\" onclick=\"showLookWin('"
					+ rows[i].id
					+ "','"
					+ rows[i].title
					+ "','"
					+ rows[i].major
					+ "','"
					+ rows[i].summary
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

function output_file(){
          //自定义标题栏
          var title=['选题名称','专业方向','选题简介','分数','评语'];  
          //自定义过滤栏（不需要导出的行）
         // var filter=['id','logins']               

          //原始导出
          //JSONToExcelConvertor(data3,"report"); 
          //自定义导出
          JSONToExcelConvertor("topic_evaluate",title);
}



//导出excel文件
function JSONToExcelConvertor(FileName,title) {  
     
    var data = $("#allrows").val();
	var json = $.parseJSON(data);
	var rows = json.rows;

    var excel = "<table>";      

    //设置表头  
    var row = "<tr>";  

    if(title)
    {
        //使用标题项
        for (var i in title) {  
            row += "<th align='center'>" + title[i] + '</th>';
        }  

    }
    else{
        //不使用标题项
        for (var i in rows[0]) {  
            row += "<th align='center'>" + i + '</th>';
        } 
     }

        excel += row + "</tr>";  

    //设置数据  
    for (var i = 0; i < rows.length; i++) {  
        var row = "<tr>";  

        for (var index in rows[i]) {
           
                 var value = rows[i][index] == null ? "" : rows[i][index];  
                 row += "<td align='center'>" + value + "</td>"; 
          
        }  

        excel += row + "</tr>";  
            }  

            excel += "</table>";  

            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";  
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';  
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';  
    excelFile += '; charset=UTF-8">';  
    excelFile += "<head>";  
    excelFile += "<!--[if gte mso 9]>";  
    excelFile += "<xml>";  
    excelFile += "<x:ExcelWorkbook>";  
    excelFile += "<x:ExcelWorksheets>";  
    excelFile += "<x:ExcelWorksheet>";  
    excelFile += "<x:Name>";  
    excelFile += "{worksheet}";  
    excelFile += "</x:Name>";  
    excelFile += "<x:WorksheetOptions>";  
    excelFile += "<x:DisplayGridlines/>";  
    excelFile += "</x:WorksheetOptions>";  
    excelFile += "</x:ExcelWorksheet>";  
    excelFile += "</x:ExcelWorksheets>";  
    excelFile += "</x:ExcelWorkbook>";  
    excelFile += "</xml>";  
    excelFile += "<![endif]-->";  
    excelFile += "</head>";  
    excelFile += "<body>";  
    excelFile += excel;  
    excelFile += "</body>";  
    excelFile += "</html>";  


    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);  

    var link = document.createElement("a");      
    link.href = uri;  

    link.style = "visibility:hidden";  
    link.download = FileName + ".xls";  

    document.body.appendChild(link);  
    link.click();  
    document.body.removeChild(link);  
}  
