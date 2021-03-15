/**
 * 用户管理，可以单独插入教师，学生，教务人员和管理员，可以查看教师和学生
 * 0-教师，1-学生
 */
/**
 * 查看所有教师和学生
 */
var query_data = function(){
	//从后台加载数据放入隐藏域
	let url = "user_manageSettingsAction.action";
	//获取用户输入的关键字
	let word = "";
	if($("#word").val() != ""){
		word = $("#word").val().trim();
	}
	let jsonobj = {};
	//获取选择的用户类型0-teacher,1-student
	if($("input[name='Choose']:checked").val().trim() == "0"){
		jsonobj = {"usertype":"0","word":word};
		$.ajax({
			url : url,
			type : 'post',
			data : {
				'keyword' : JSON.stringify(jsonobj)
			},
			datatype : 'json',
			success:function(res){
				console.log("teacher:"+res);
				$("#allrows").val(res);
				//根据返回的数据生成表格
				createHeader();
				displayTable();
			}
		});
	}else if($("input[name='Choose']:checked").val().trim() == "1"){
		jsonobj = {"usertype":"0","word":word};
		$.ajax({
			url : url,
			type : 'post',
			data : {
				'keyword' : JSON.stringify(jsonobj)
			},
			datatype : 'json',
			success:function(res){
				console.log("student:"+res);
				$("#allrows").val(res);
				//根据返回的数据生成表格
				createHeader();
				displayTable();
			}
		});
	}
}
var createHeader = function(){
	let usertype = $("input[name='Choose']:checked").val().trim();
	if(usertype == "0"){
		$("#trheader").html(
		"<th>教师编号</th><th>姓名</th><th>专业方向</th><th>最大可带学生数</th><th>职称</th><th>类别</th><th>是否有效</th><th>操作</th>"		
		);
	}else if(usertype == "1"){
		$("#trheader").html(
		"<th>学生编号</th><th>姓名</th><th>专业</th><th>是否有效</th><th>操作</th>"			
		);
	}
}

//生成tbody中的内容
var displayTable = function(){
	let data=$("#allrows").val();
	let json = $.parseJSON(data);
	let rows= json.rows;
	// 读取用户设置每页显示多少行信息
	
	let linage = 16;    //默认16行
	let value = $("#linage").val();
	if (!isNaN(value)) {
		linage = parseInt(value);
		$("#linage").text(value);
	}
	// 计算出多少页
	let reccount = parseInt(json.reccount);
	let pages = Math.ceil(reccount / linage);	
	$("#reccount").text(json.reccount);
	$("#maxpages").text(pages);
	//显示当前页为第一页
	$("#pagenum").text("1");	
	//判断是否需要分页显示
	if (pages > 1) {
		$("#page_tools").attr("class", "border-none");
	} else {
		$("#page_tools").attr("class", "border-none hidden");
	}
	var html = "";
	//显示当前页面
	for(let i = 0; i < reccount && i < linage; i++){
		html = createTableRow(rows,i,html);		
	}
	$("#tbodys").html(html);
	hideOverlay();
	$("#progressImgage").attr("class", "hidden");
	$("#framerows").attr("class", "table-center-block-rows");
}

//生成该某一行数据
var createTableRow = function(rows,i,html){
	let usertype = $("input[name='Choose']:checked").val().trim();
	let valid = "";
	if(usertype === "0"){
		if(rows[i].isvalid == "1"){
			valid = "是";
		}else{
			valid = "否";
		}
		html = html + 
		   "<tr>"
		   +"<td>" +rows[i].code+ "</td>"
		   +"<td>" +rows[i].name+ "</td>"
		   +"<td>" +rows[i].major+ "</td>"
		   +"<td>" +rows[i].maximun+ "</td>"
		   +"<td>" +rows[i].t_level+ "</td>"
		   +"<td>" +rows[i].t_type+ "</td>"
		   +"<td>" +valid+ "</td>"
		   +"<td>" +"<a class='glyphicon glyphicon-pencil' onclick=\"editTeacher('"+JSON.stringify(rows[i]).replace(/\"/g,"|")+"')\">修改</a>"
		   +"&nbsp;&nbsp;"+"<a class='glyphicon glyphicon-remove  light-red' onclick=\"removeTeacher('"+rows[i].code+"','"+rows[i].name+"')\">删除</a>"
		   +"</tr>";
		
		return html;
	}else if(usertype === "1"){
		html = html + 
		   "<tr class=\""+(rows[i].imported? "" : "bg-danger")+"\">"
		   +"<td>"
		   + "<input type=\"checkbox\" name=\"a\" onclick=\"setDataChecked(this,'"+rows[i].index+"')\""+(rows[i].checked ? " checked=\"checked\"":"" )+"></td>"
		   +"<td>" +rows[i].code+ "</td>"
		   +"<td>" +rows[i].name+ "</td>"
		   +"<td>" +rows[i].major+ "</td>"
		   +"</tr>";
	
		return html;
	}
}

//显示新增用户模态框
var addUser = function(){
	//隐藏域的值为用户编号，设置为空说明是新增用户
	$("#pk").val("");
	//判断用户类型
	let usertype = $("input[name='Choose']:checked").val().trim();
	if(usertype == "0"){
		$("#teacher_code").val("");
		$("#teacher_name").val("");
		$("#teacher_maxnum").val("");
		$("#teacher_level").val("");
		$("#teacher_type").val("");
		//显示模态框
		$("#showTeacher_edit").modal({
			keyboard : false
		});
		
	}else if(usertype == "1"){
		
	}
	
}

var saveTeacher=function(){
	
}

//显示修改教师信息模态框
var editTeacher = function(rowStr){
	rowStr=rowStr.replace(/\|/g,"\""); //$符号是个关键字。。将分隔符换成 |
	let row = JSON.parse(rowStr);
	$("#teacher_code").val(row.code);
	$("#teacher_name").val(row.name);
	$("#teacher_maxnum").val(row.maximun);
	$("#teacher_level").val(row.t_level);
	$("#teacher_type").val(row.t_type);
	$("#major").find("option[value='"+row.majorcode+"']").prop("selected",true);  //jiuzheyang
	//显示模态框
	$("#showTeacher_edit").modal({
		keyboard : false
	});
}

//显示删除教师模态框
var removeTeacher = function(code,name){
	var html = "<p>确定要删除所选定的记录:【" + name + "】？</p>";
	$("#frameInfor").html(html);
	$("#pk").val(code);
	$("#command").val("removeTeacher");
	//显示模态框
	$("#showModal").modal({
		keyboard : false
	});
}
//删除用户和修改密码
var operateData = function(){
	//判断要执行啥操作
	let command = $("#command").val();
	if(command === "removeTeacher"){
		//删除教师
		//获取隐藏域中的用户编号：code
		
	}else if(command === "removeStudent"){
		//删除学生
	}else if(command === "resetPassword"){
		//重置密码
	}
	
}
