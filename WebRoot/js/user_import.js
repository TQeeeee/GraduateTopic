/**
 * 根据角色的不同，导入教师或学生
 */

//显示导入选题模态框
var showfileUpload = function(){
	$("#showFileUpload").modal({
		backdrop : 'static',
		keyboard : false
	});
}

function submitExcel(){
	alert("importing.....");
	//获取files对象
	var files = $("#uplfile").prop('files');
    var data = new FormData();
    //获取上传的第1个文件(...应该是允许上传多个文件？？？总之获取第一个..以后再改吧)
    data.append('file', files[0]);  //参数名：file
    var url = "";
    //判断导入的是教师选题还是学生选题
    if($("input[name='usertype']:checked").val().trim() == "0"){
    	url = "executeTeacherExcelAnalysis.action";
    }
    if($("input[name='usertype']:checked").val().trim() == "1"){
    	url = "executeStudentExcelAnalysis.action";
    }
    $.ajax({
    	 url: url,
         type: 'POST',
         data: data,
         cache: false, //禁止浏览器对该URL的缓存
         contentType: false,//告诉jquery不要去处理请求的数据格式
         processData: false,//告诉jquery不要设置请求头的类型
         success: function(data){
        	 //console.log(data);
        	 //后续操作
        	 //模态框隐藏
        	 $("#showFileUpload").modal("hide");
        	 //给数据加checked和imported属性，并放入隐藏域
        	 operateData(data);
        	 //设置trheader
        	 createHeader();
        	 //显示表格
        	 displayTable();
         }
    });
}



//给数据加index,checked和imported属性，并放入隐藏域
function operateData(data){
	let json = $.parseJSON(data);
	let reccount = parseInt(json.reccount);
	let rows = [];
	rows = json.rows;
	let newList = [];
	//用户类型
	let usertype = json.importtype;
	if(usertype == 'teacher'){
		//循环为每个jsonobject增加属性
		for(let i = 0;i < reccount;i++){
			let temp = {};
			temp.index = i;//没有试过+1是字符还是数值...等下再试吧
			temp.code = rows[i].code;
			temp.name = rows[i].name;
			temp.major = rows[i].major;
			temp.maxnum = rows[i].maxnum;
			temp.level = rows[i].level;
			temp.type = rows[i].type;
			temp.checked=false;
    		temp.imported=true;//默认全部是导入的
    		newList.push(temp);
		}
		json = {"usertype":"teacher","reccount":json.reccount,"rows":newList};
		//console.log(JSON.stringify(json));
		//赋值给隐藏域
		$("#allrows").val(JSON.stringify(json));
	}
	if(usertype == 'student'){
		//同上
		for(let i = 0;i < reccount;i++){
			let temp = {};
			temp.index = i;
			temp.code = rows[i].code;
			temp.name = rows[i].name;
			temp.major = rows[i].major;
			temp.checked=false;
    		temp.imported=true;//默认全部是导入的
			newList.push(temp);
		}
		json = {"usertype":"student","reccount":json.reccount,"rows":newList};
		//赋值给隐藏域
		$("#allrows").val(JSON.stringify(json));
	}
}


function createHeader(){
	let data=$("#allrows").val();
	let json = $.parseJSON(data);
	let usertype = json.usertype;
	if(usertype == "teacher"){
		$("#trheader")
		.html("<th><input type=\"checkbox\" onclick=\"setAllDataChecked(this)\"></th><th>教师工号</th><th>教师名称</th><th>专业方向</th><th>最大指导学生数</th><th>职称</th><th>类型</th>");
	}else{
		$("#trheader")
		.html("<th><input type=\"checkbox\" onclick=\"setAllDataChecked(this)\"></th><th>学号</th><th>学生姓名</th><th>专业</th>");
	}
	
}

function displayTable(){
	let data=$("#allrows").val();
	let json = $.parseJSON(data);
	let rows= json.rows;
	let usertype = json.usertype;
	// 读取用户设置每页显示多少行信息
	let value = $("#linage").val();
	let linage = 16;    //默认16行
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
		html = createTableRow(rows,i,html,usertype);		
	}
	$("#tbodys").html(html);
	hideOverlay();
	$("#progressImgage").attr("class", "hidden");
	$("#framerows").attr("class", "table-center-block-rows");
}

/**功能：生成当前行的一行数据
 * 参数：html,第i个原始数据，原始数据数组rows,用户类型usertype
 */
var createTableRow = function(rows,i,html,usertype){
	if(usertype == "teacher"){
		html = html + 
		   "<tr class=\""+(rows[i].imported? "" : "bg-danger")+"\">"
		   +"<td>"
		   + "<input type=\"checkbox\" name=\"a\" onclick=\"setDataChecked(this,'"+rows[i].index+"')\""+(rows[i].checked ? " checked=\"checked\"":"" )+"></td>"
		   +"<td>" +rows[i].code+ "</td>"
		   +"<td>" +rows[i].name+ "</td>"
		   +"<td>" +rows[i].major+ "</td>"
		   +"<td>" +rows[i].maxnum+ "</td>"
		   +"<td>" +rows[i].level+ "</td>"
		   +"<td>" +rows[i].type+ "</td>"
		   +"</tr>";
		
		return html;
	}
	if(usertype == "student"){
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


/**
 * 功能：设置原始数据某行数据是否被选中
 * 参数：某一行的index，这一行obj
 */

var setDataChecked=function(obj,index){
	//获取原始数据
	let data=$("#allrows").val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	for(let i=0;i<rows.length;i++){
		if(rows[i].index==index){
			rows[i].checked=obj.checked;
		}
	}
	json = {"usertype":json.usertype,"reccount":json.reccount,"rows":rows};
	//console.log(JSON.stringify(json));
	$("#allrows").val(JSON.stringify(json));
}



/**
 * 功能：设置原始数据所有行是否都被选中
 * 参数：obj
 * 
 */
function setAllDataChecked(obj){
	//获取原始数据
	let data=$("#allrows").val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	let reccount = parseInt(json.reccount);
	for(let i = 0;i < reccount;i++){
		//其实不晓得obj.checked是不是布尔型的值，先写了再说吧哈哈...
		rows[i].checked = obj.checked;
	}
	json = {"usertype":json.usertype,"reccount":json.reccount,"rows":rows};
	console.log(JSON.stringify(json));
	$("#allrows").val(JSON.stringify(json));
	//把页面刷新一下
	displayTable();
	
}

/**
 * 功能：分页显示的四个按钮
 */


function gonext(){
	//获取原始数据
	let data=$("#allrows").val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	let usertype = json.usertype;
	//获取记录数量
	let reccount = parseInt(json.reccount);
	//读取当前页码
	let pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	let maxpages = parseInt($("#maxpages").text());
	if (maxpages == pagenum) {
		alert("已经到了最后一页，不能再移动！");
	}else{
		pagenum = pagenum + 1;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		let linage = parseInt($("#linage").text());
		var html = "";
		for ( let i = (pagenum - 1) * linage; i < reccount
		&& i < pagenum * linage; i++) {
			html = createTableRow(rows,i,html,usertype);
		}
		$("#tbodys").html(html);
	}
}

function gopre(){
	//获取原始数据
	let data=$("#allrows").val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	let usertype = json.usertype;
	//获取记录数量
	let reccount = parseInt(json.reccount);	
	// 读取当前页码
	let pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	let maxpages = parseInt($("#maxpages").text());
	if (1 == pagenum) {
		alert("已经到了第一页，不能再移动！");
	}else{
		pagenum = pagenum - 1;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		let linage = parseInt($("#linage").text());
		var html = "";
		for ( let i = (pagenum - 1) * linage; i < reccount
		&& i < pagenum * linage; i++) {
			html = createTableRow(rows,i,html,usertype);
		}
		$("#tbodys").html(html);
	} 
	
}
function golast(){
	//获取原始数据
	let data=$("#allrows").val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	let usertype = json.usertype;
	//获取记录数量
	let reccount = parseInt(json.reccount);
	// 读取当前页码
	let pagenum = parseInt($("#pagenum").text());
	// 读取总记录数
	let maxpages = parseInt($("#maxpages").text());
	// 如果 当前页已经等总页数则不能移动
	if (maxpages == pagenum) {
		alert("已经到了最一页，不能再移动！");
	} else {
		pagenum = maxpages;
		$("#pagenum").text(pagenum);
		// 获取每页记录数
		let linage = parseInt($("#linage").text());
		var html = "";
		for ( let i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				html = createTableRow(rows,i,html,usertype);
		}
		$("#tbodys").html(html);
	}
}
function gofirst(){
	//获取原始数据
		let data=$("#allrows").val();
		let json=$.parseJSON(data);
		let rows=json.rows;
		let usertype = json.usertype;
		//获取记录数量
		let reccount = parseInt(json.reccount);	
		// 读取当前页码
		let pagenum = parseInt($("#pagenum").text());
		// 读取总记录数
		let maxpages = parseInt($("#maxpages").text());
		if (1 == pagenum) {
			alert("已经到了第一页，不能再移动！");
		}else{
			pagenum = 1;
			$("#pagenum").text(pagenum);
			// 获取每页记录数
			let linage = parseInt($("#linage").text());
			var html = "";
			for ( let i = (pagenum - 1) * linage; i < reccount
			&& i < pagenum * linage; i++) {
				html = createTableRow(rows,i,html,usertype);
			}
			$("#tbodys").html(html);
		} 
}


var importUser=function(){
	//获取原始数据
	let data = $("#allrows").val();
	let json = $.parseJSON(data);
	let usertype = json.usertype;
	let rows = json.rows;
	let users = [];
	//要传给后台的数据
	let importdata = {};
	let url = "importUserSettingsAction.action";
	alert("正在导入"+usertype+"....");
	//获取页面上选中的数据
	if(usertype === "teacher"){
		for(let i = 0;i < rows.length;i++){
			if(rows[i].checked){
				let temp = {};
				temp.code = rows[i].code;
				temp.name = rows[i].name;
				temp.major = rows[i].major;
				temp.maxnum = rows[i].maxnum;
				temp.level = rows[i].level;
				temp.type = rows[i].type;
				users.push(temp);
			}
		}
	}else if(usertype === "student"){
		for(let i = 0;i < rows.length;i++){
			if(rows[i].checked){
				let temp = {};
				temp.code = rows[i].code;
				temp.name = rows[i].name;
				temp.major = rows[i].major;
				users.push(temp);
			}
		}
		
	}
	if(users.length === 0){
		alert("没有数据被选中!");
		return ;
	}else{
		importdata = {"usertype":json.usertype,"users":users};
	}
	//将数据发送给后台
	 $.when(sendMessageSyncByDeferred(url,importdata)).done(function(res){
		 //console.log(res);
		 //返回的数值与原始数据比较，未成功导入的变红
		 let resdata = $.parseJSON(res);
		 let resusertype = resdata.usertype;
		 let succount = resdata.succount;
		 let failcount = resdata.failcount;
		 let resrows = resdata.rows;
		 alert("成功"+succount+"条，失败"+failcount+"条，可能原因是主键冲突！");
		 //遍历原始数据设置imported属性
		 for(let j = 0;j < parseInt(failcount);j++){
			 for(let i = 0; i < rows.length;i++){
				 //如果主键相同
				 if(resrows[j].code==rows[i].code){
					 rows[i].imported = false;
				 }
			 }
		 }
		 json = {"usertype":json.usertype,"reccount":json.reccount,"rows":rows};
		 $("#allrows").val(JSON.stringify(json));  //json对象不能直接赋值给input,需要先转化成字符串
		 //console.log(JSON.stringify(json));
		//为imported=false的添加红色背景
		 displayTable();
		 
	 });
	
}



