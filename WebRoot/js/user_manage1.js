//查询角色信息
function query_data() {
	
	var value = "";
	var url = "user_manageSettingsAction.action";
	value = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		value = "1";
	}
	var keyword = {
			"usertype" : "",
			"word" : ""
			};
	keyword.usertype=value;
	//读取查询关键词
	value = $("#word").val().trim();
	keyword.word=value;
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
					if (keyword.usertype == "0") {
						$("#trheader")
								.html(
										"<th>代码</th><th>姓名</th><th>专业方向</th><th>职称</th><th>类别</th><th>指导数</th><th>操作</th>");
					} else {
						$("#trheader").html(
								"<th>代码</th><th>姓名</th><th>专业</th><th>操作</th>");
					}
					var json = $.parseJSON(data);
					if (json.reccount == -1) {
						location.href = "login.jsp";
					}
					var rows = json.rows;
					//alter(rows);
					// 计算出多少页
					//alert(rows.length);
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
					for ( var i = 0; i < rows.length && i < linage; i++) {
						html = html + "<tr pk=\"" + rows[i].code + "\"><td>"
								+ rows[i].code + "</td><td>" + rows[i].name
								+ "</td><td>" + rows[i].major + "</td><td>";
						if (keyword.usertype == "0") {
							html = html + rows[i].t_level + "</td><td>"
									+ rows[i].t_type + "</td><td>"
									+ rows[i].maximun + "</td><td>";
						}
						html = html
								+ "<a class=\"btn-link\" onclick=\"showEditWin('"
								+ rows[i].code
								+ "','"
								+ rows[i].name
								+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
								+ rows[i].code
								+ "','"
								+ rows[i].name
								+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
								+ "</td></tr>";
					}
					$("#tbodys").html(html);
					hideOverlay();
					$("#progressImgage").attr("class", "hidden");
				}
			});
	$("#framerows").attr("class", "table-center-block-rows");
}

function showAddWin() {
	var cc="0";
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		cc = "1";
	}
	if(cc=="0"){
	$("#single_insert1").modal('show');}
	else if(cc=="1"){
		$("#single_insert2").modal('show');
		
	}
}
function file_import() {
	var cc="0";
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		cc = "1";
	}
	if(cc=="0"){
	$("#file_import1").modal('show');}
	else if(cc=="1"){
		$("#file_import2").modal('show');
		
	}
}

function showEditWin(code, name) {
	$("#pk").val(code);
	$("#code").val(code);
	$("#name").val(name);
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}

//数据显示
function data_analysis1(){
	var value = "";
	var suoshuode="你现在正在批量导入教师信息";
	var url = "file_analysis0.action";
	value = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		
		value = "1";
		url="file_analysis1.action";
		suoshuode="你现在正在批量导入学生信息";
		
	}	
	$("#a1").val(value);
	
	alert(value);
	alert(suoshuode);
	
	$("#progressImgage").attr("class", "");
	
	
	 $.get(function(data){
		
		 var usertype=$("#a1").val();
		 alert(usertype);
			$("#allrows").val(data);					
			if (usertype == "0") {
				$("#trheader")
						.html(
								"<th>代码</th><th>姓名</th><th>专业方向</th><th>职称</th><th>类别</th><th>指导数</th><th>密码</th><th>是否合法</th>");
			} else {
				$("#trheader").html(
						"<th>代码</th><th>姓名</th><th>专业</th><th>密码</th><th>是否合法</th>");
			}
			
			
			var json = $.parseJSON(data);				
			var rows =json.rows;			
			var member = eval("("+data+")");
			alert(rows.length);

			$("#page_tools").attr("class", "border-none hidden");
			// 获取记录数量
			var html = "";
			var box="checkbox";
			for ( var i = 0; i < row.length; i++) {
				
				html = html +"<input type="+checkbox+" value="+rows[i].usercode+" />"+"<tr \><td>"
						+ rows[i].usercode + "</td><td>" + rows[i].name
						+ "</td><td>" + rows[i].major + "</td><td>";
				if (usertype == "0") {
					html = html + rows[x].t_level + "</td><td>"
							+ rows[i].t_type + "</td><td>"
							+ rows[i].maximun + "</td><td>"
							+ rows[i].pwd + "</td><td>"
							+ rows[i].isvalid + "</td><td>";
				}
				else if (usertype == "1"){
					html = html + rows[i].pwd + "</td><td>"
					+ rows[i].isvalid + "</td><td>";
				}
				html = html
						
						+ "</td></tr>";
				
			}
			$("#tbodys").html(html);
			hideOverlay();
			$("#progressImgage").attr("class", "hidden");
		
		 });		
	 $("#framerows").attr("class", "table-center-block-rows");

	
}

function allselect(){	
	 var aInput = document.getElementsByClassName("ch1");
	 for(var i = 0; i < aInput.length; i++) {
			aInput[i].checked=true;
		}		
}
function cancelselect(){	
	//var aInput = document.getElementsByClassName("ch1");
 var aInput = document.getElementsByClassName("ch1");
 for(var i = 0; i < aInput.length; i++) {
		aInput[i].checked=false;
	}		
}

function many_insert(){
	var f_mount=0;
	var t_mount=0;
	alert("成功");
	$("input:checkbox[name='shuju1']:checked").each(function(){
		var value;
		var cc="0";
		if ($("input[name='UserType']:checked").val().trim() == "1") {
			cc = "1";
		}
		for(var i=0;i<r.length;i++){
	         if(r[i].checked){
	         var zong=r[i].nextSibling.nodeValue();
	       alert(zong);
		var keyword = {
			"model" : "teacher",
			
			"usercode" :"",
			"name" : "",
			"major" : "",
			"t_level" : "",
			"t_type" : "",
			"pwd" : "",
			"maximun" : "",
			"isvalid" : "",
			
			"command" : "ins",
			"usertype" : ""
		};
		keyword.usertype=cc;
		keyword.usercode=usercode;
		keyword.name=name;
		keyword.major=major;
		keyword.t_level=t_level;
		keyword.t_type=t_type;
		keyword.pwd=pwd;
		keyword.maximun=maximun;
		keyword.isvalid=isvalid;
		var url = "";
		//$("#frameInfor").html("");
		url = 'save_user_dataSettingsAction.action';
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
				var reccount="";
				 reccount = parseInt(json.reccount);
				var rows = json.rows;
				if (reccount > 0) {
					t_mount=t_mount+1;
					//$("#single_insert1").modal("hide");
					//query_data();
				} else {
					f_mount=f_mount+1;
				}
			}
		});			
	         }
		}
	         });
		
	alert("成功插入教师数据："+t_mount+"条，失败："+f_mount);
}
function many_insert1(){
	var f_mount=0;
	var t_mount=0;
	alert("成功");
	$("input:checkbox[name='shuju1']:checked").each(function(){
		var value;
		var cc="0";
		if ($("input[name='UserType']:checked").val().trim() == "1") {
			cc = "1";
		}
		var keyword = {
				"model" : "student",
				
				"usercode" :"",
				"name" : "",
				"major" : "",
				"t_level" : "",
				"t_type" : "",
				"pwd" : "",
				"maximun" : "1",
				"isvalid" : "",
				
				"command" : "ins",
				"usertype" : ""
		};
		keyword.usertype=cc;
		keyword.usercode=usercode;
		keyword.name=name;
		keyword.major=major;

		keyword.pwd=pwd;
		keyword.isvalid=isvalid;
		var url = "";
		
		url = 'save_user_dataSettingsAction.action';
		$.ajax({
			url : url,
			type : 'post',
			data : {
				'keyword' : JSON.stringify(keyword)
			},
			datatype : 'json',
			success : function(data) {
				var json = $.parseJSON(data);
				
				var reccount="";
				 reccount = parseInt(json.reccount);
				var rows = json.rows;
				if (reccount > 0) {
					t_mount=t_mount+1;
					} else {
					f_mount=f_mount+1;
				}
			}
		});	
	});	
	alert("成功插入学生数据："+t_mount+"条，失败："+f_mount);
}


function data_analysis2(){
	var result =$("#xx").text().trim();
	
	var value = "";
	var suoshuode="你现在正在批量导入教师信息";
	var url = "file_analysis0.action";
	value = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		
		value = "1";
		url="file_analysis1.action";
		suoshuode="你现在正在批量导入学生信息";		
	}	
	$("#a1").val(value);
	alert(suoshuode);		
	/*读取每页显示多少行信息*/
	$("#progressImgage").attr("class", "");			 
		var usertype=$("#a1").val();
			$("#allrows").val(result);					
			if (usertype == "0") {
				$("#trheader")				

						.html(
						"<th ><input  type='checkbox'onclick='allselect()' />全选<input  type='checkbox'onclick='cancelselect()' />取消全选&nbsp;&nbsp;<a onclick=\"many_insert()\">批量插入</a></th>"+						
						"<th>代码</th><th>姓名</th><th>专业方向</th><th>职称</th><th>类别</th><th>指导数</th><th>密码</th><th>是否合法</th>");
							} else {

				$("#trheader").html(
						"<th ><input  type='checkbox'onclick='allselect()' />全选<input  type='checkbox'onclick='cancelselect()' />取消全选&nbsp;&nbsp;<a onclick=\"many_insert1()\">批量插入</a></th>"+
						"<th>代码</th><th>姓名</th><th>专业</th><th>密码</th><th>是否合法</th>");
			}
			
			
			var jsonObj = eval('(' + result + ')');
			var rows=jsonObj.rows;
		
			$("#page_tools").attr("class", "border-none hidden");
			// 获取记录数量
			var html = "";
			var box='checkbox';   //+"<input type="+checkbox+" value="+rows[i].usercode+" />" type="+checkbox+"
			for ( var i = 0; i < rows.length; i++) {
				html = html +"<tr><td><input type='checkbox' name='shuju1' value="+rows[i].usercode+" class=\"ch1\"/>"+"</td><td>"
						+ rows[i].usercode + "</td><td>" + rows[i].name
						+ "</td><td>" + rows[i].major + "</td><td>";
				if (usertype == "0") {
					html = html + rows[i].t_level + "</td><td>"
							+ rows[i].t_type + "</td><td>"
							+ rows[i].maximun + "</td><td>"
							+ rows[i].pwd + "</td><td>"
							+ rows[i].isvalid + "</td><td>";
				}
				else if (usertype == "1"){
					html = html + rows[i].pwd + "</td><td>"
					+ rows[i].isvalid + "</td><td>";
				}
				html = html					
						+ "</td></tr>";
				
			}
			$("#tbodys").html(html);
			hideOverlay();
			$("#progressImgage").attr("class", "hidden");
		
			
	 $("#framerows").attr("class", "table-center-block-rows");

}

function data_analysis(){
	var value = "";
	var suoshuode="你现在正在批量导入教师信息";
	var url = "file_analysis0.action";
	value = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		
		value = "1";
		url="file_analysis1.action";
		suoshuode="你现在正在批量导入学生信息";
		
	}
	
	$("#a1").val(value);
	var keyword = {
			"usertype" : "",
			"word" : "哈哈"
			};
	keyword.usertype=$("#a1").val();
	//alert(keyword.usertype);
	//读取查询关键词
	//value = $("#word").val().trim();
	//keyword.word=value;
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
					alert(keyword.usertype);
					alert(data);
					$("#allrows").val(data);					
					if (keyword.usertype == "0") {
						$("#trheader")
								.html(
										"<th>代码</th><th>姓名</th><th>专业方向</th><th>职称</th><th>类别</th><th>指导数</th><th>密码</th><th>是否合法</th>");
					} else {
						$("#trheader").html(
								"<th>代码</th><th>姓名</th><th>专业</th><th>密码</th><th>是否合法</th>");
					}
					
					
					var json = $.parseJSON(data);				
					//var daa=json.reccount;
					var rows =json.rows;
					
					var member = eval("("+data+")");
					alert(rows.length);
					//alert(daa);
					//alert(rows);
					//alert(rows);
					// 计算出多少页
					if (pages > 1) {
						$("#page_tools").attr("class", "border-none");
					} else {
						$("#page_tools").attr("class", "border-none hidden");
					}
					// 获取记录数量
					var html = "";
					var box="box";
					for ( var i = 0; i < row.length; i++) {
						
						html = html +"<checkbox name="+box+">"+"<tr pk=\"" + rows[i].usercode + "\"><td>"
								+ rows[i].usercode + "</td><td>" + rows[i].name
								+ "</td><td>" + rows[i].major + "</td><td>";
						if (keyword.usertype == "0") {
							html = html + rows[x].t_level + "</td><td>"
									+ rows[i].t_type + "</td><td>"
									+ rows[i].maximun + "</td><td>"
									+ rows[i].pwd + "</td><td>"
									+ rows[i].isvalid + "</td><td>"+"</checkbox>";
						}
						else if (keyword.usertype == "1"){
							html = html + rows[i].pwd + "</td><td>"
							+ rows[i].isvalid + "</td><td>"+"</checkbox>";
						}
						html = html
								+ "</td></tr>";
						
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
///////////////
////////////////
function saveData() {
	var value;
	var cc="0";
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		cc = "1";
	}
	var keyword = {
		"model" : "sysuser",
		"usertype" :"",
		"pk" : "",
		"code" : "",
		"name" : "",
		"command" : "ins"
	};
	keyword.usertype=cc;
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		keyword.command = "upd";
	}
	value = $("#code").val();
	if (value.length > 0) {
		keyword.code = value;
	} else {
		alert("请输入代码！");
		$("#code").focus();
		return false;
	}
	value = $("#name").val();
	if (value.length > 0) {
		keyword.name = value;
	} else {
		$("#name").focus();
		alert("请输入角色名！");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveDataQueryAction.action';
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
			var reccount="";
			 reccount = parseInt(json.reccount);
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
////////////
function single_insert1() {
	var value;
	var cc="0";
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		cc = "1";
	}
	var keyword = {
		"model" : "teacher",
		
		"usercode" :"",
		"name" : "",
		"major" : "",
		"t_level" : "",
		"t_type" : "",
		"pwd" : "",
		"maximun" : "",
		"isvalid" : "",
		
		"command" : "ins",
		"usertype" : ""
	};
	keyword.usertype=cc;
	
	/*value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		
	}*/
	value = $("#usercode").val();
	if (value.length > 0) {
		keyword.usercode = value;
	} else {
		alert("请输入代码！");
		$("#usercode").focus();
		return false;
	}
	value = $("#name9").val();
	if (value.length > 0) {
		keyword.name = value;
	} else {
		$("#name9").focus();
		alert("请输入用户姓名！");
		return false;
	}
	value = $("#pwd").val();
	if (value.length > 0) {
		keyword.pwd = value;
	} else {
		$("#pwd").focus();
		alert("密码！");
		return false;
	}
	value = $("#maximun").val();
	if (value.length > 0) {
		keyword.maximun = value;
	} else {
		$("#maximun").focus();
		alert("可指导学生数目！");
		return false;
	}
	value = $("#major").val();
	if (value.length > 0) {
		keyword.major = value;
	} else {
		$("#major").focus();
		alert("请选择专业！");
		return false;
	}
	value = $("#t_level").val();
	if (value.length > 0) {
		keyword.t_level = value;
	} else {
		$("#t_level").focus();
		alert("请输入职称！");
		return false;
	}
	value = $("#t_type").val();
	if (value.length > 0) {
		keyword.t_type = value;
	} else {
		$("#t_type").focus();
		alert("请选择类型！");
		return false;
	}
	value = $("#isvalid").val();
	if (value.length > 0) {
		keyword.isvalid = value;
	} else {
		$("#isvalid").focus();
		alert("请确定其合法性！");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'save_user_dataSettingsAction.action';
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
			var reccount="";
			 reccount = parseInt(json.reccount);
			var rows = json.rows;
			if (reccount > 0) {
				alert("保存成功！");
				$("#single_insert1").modal("hide");
				query_data();
			} else {
				alert("保存失败！");
			}
		}
	});
}

function single_insert2() {
	var value;
	var cc="0";
	//alert("hello");
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		cc = "1";
	}
	var keyword = {
		"model" : "student",
		
		"usercode" :"",
		"name" : "",
		"major" : "",
		"t_level" : "",
		"t_type" : "",
		"pwd" : "",
		"maximun" : "1",
		"isvalid" : "",
		
		"command" : "ins",
		"usertype" : ""
	};
	keyword.usertype=cc;
	
	/*value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
		
	}*/
	value = $("#usercode1").val();
	if (value.length > 0) {
		keyword.usercode = value;
	} else {
		alert("请输入代码！");
		$("#usercode1").focus();
		return false;
	}
	value = $("#name1").val();
	if (value.length > 0) {
		keyword.name= value;
	} else {
		$("#name1").focus();
		alert("请输入用户姓名！");
		return false;
	}
	value = $("#pwd1").val();
	if (value.length > 0) {
		keyword.pwd = value;
	} else {
		$("#pwd1").focus();
		alert("密码！");
		return false;
	}

	value = $("#major1").val();
	if (value.length > 0) {
		keyword.major = value;
	} else {
		$("#major1").focus();
		alert("请选择专业！");
		return false;
	}
	value = $("#isvalid1").val();
	if (value.length > 0) {
		keyword.isvalid = value;
	} else {
		$("#isvalid1").focus();
		alert("请确定其合法性！");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'save_user_dataSettingsAction.action';
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
			var reccount="";
			 reccount = parseInt(json.reccount);
			var rows = json.rows;
			if (reccount > 0) {
				alert("保存成功！");
				$("#single_insert2").modal("hide");
				query_data();
			} else {
				alert("保存失败！");
			}
		}
	});
}
///////////////
function delData() {
	var pk = $("#pk").val();
	var value;
	var cc="0";
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		cc = "1";
	}
	var keyword = {
		"model" : "sysuser",
		"pk" : "",
		"usertype" : "",
		"command" : "del"
	};
	keyword.usertype=cc;
	value = $("#pk").val();
	if (value.length > 0) {
		keyword.pk = value;
	} else {
		alert("请选择删除记录！");
		$("#showModal").modal("hide");
		return false;
	}
	var url = "";
	$("#frameInfor").html("");
	url = 'saveDataQueryAction.action';
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

function gonext() {
	var usertype = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		usertype = "1";
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
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
			html = html + "<tr pk=\"" + rows[i].code + "\"><td>" + rows[i].code
					+ "</td><td>" + rows[i].name + "</td><td>" + rows[i].major
					+ "</td><td>";
			if (usertype == "0") {
				html = html + rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + rows[i].maximun + "</td><td>";
			}
			html = html
					+ "<a class=\"btn-link\" onclick=\"showEditWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
		}
		$("#tbodys").html(html);
	}
}

function gopre() {
	var usertype = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		usertype = "1";
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
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
			html = html + "<tr pk=\"" + rows[i].code + "\"><td>" + rows[i].code
					+ "</td><td>" + rows[i].name + "</td><td>" + rows[i].major
					+ "</td><td>";
			if (usertype == "0") {
				html = html + rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + rows[i].maximun + "</td><td>";
			}
			html = html
					+ "<a class=\"btn-link\" onclick=\"showEditWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
		}
		$("#tbodys").html(html);
	}
}

function gofirst() {
	var usertype = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		usertype = "1";
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
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
			html = html + "<tr pk=\"" + rows[i].code + "\"><td>" + rows[i].code
					+ "</td><td>" + rows[i].name + "</td><td>" + rows[i].major
					+ "</td><td>";
			if (usertype == "0") {
				html = html + rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + rows[i].maximun + "</td><td>";
			}
			html = html
					+ "<a class=\"btn-link\" onclick=\"showEditWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
		}
		$("#tbodys").html(html);
	}
}

function golast() {
	var usertype = "0";
	// 读取用户类型
	if ($("input[name='UserType']:checked").val().trim() == "1") {
		usertype = "1";
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
		for ( var i = (pagenum - 1) * linage; i < rows.length
				&& i < pagenum * linage; i++) {
			html = html + "<tr pk=\"" + rows[i].code + "\"><td>" + rows[i].code
					+ "</td><td>" + rows[i].name + "</td><td>" + rows[i].major
					+ "</td><td>";
			if (usertype == "0") {
				html = html + rows[i].t_level + "</td><td>" + rows[i].t_type
						+ "</td><td>" + rows[i].maximun + "</td><td>";
			}
			html = html
					+ "<a class=\"btn-link\" onclick=\"showEditWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-pencil bigger-130 green'></i>修改</a>&nbsp;&nbsp;<a  class=\"btn-link\" onclick=\"showDelWin('"
					+ rows[i].code
					+ "','"
					+ rows[i].name
					+ "')\"><i class='glyphicon glyphicon-remove bigger-130 light-red'></i>删除</a>"
					+ "</td></tr>";
		}
		$("#tbodys").html(html);
	}
}