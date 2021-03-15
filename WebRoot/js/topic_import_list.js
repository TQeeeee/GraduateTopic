/**
 * 显示上传文件模态框
 **/
function showfileUpload(){
	alert("import.......");
	$("#showEditor").modal({
		backdrop : 'static',
		keyboard : false
	});
}
/**
*获取表格中选中的数据  数据来源是隐藏域的值
**/
var getCheckedValue=function(url){

	let data=$("#allrows").val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	let importingList=[];
	for(let i in rows){
		if(rows[i].checked==true){
			let temp={};
			temp.title=rows[i]["title"];
	        temp.major=rows[i]["major"];
	        temp.teacher=rows[i]["teacher"];
	        temp.summary=rows[i]["summary"];
	        importingList.push(temp);
		}
	}
	if(importingList.length==0){
		alert("没有数据被选中！");
		return ;
	}
	//同步发送数据
	 $.when(sendMessageSyncByDeferred(url,importingList)).done(function(res){
		 //console.log(res);
		 //将后台的数据和隐藏域中的数据比较
		 let jsonResult = $.parseJSON(res);
		 let errorRows = jsonResult.rows;
		 let failCount = parseInt(jsonResult.failCount);
		 let sucCount = parseInt(jsonResult.succount);
		 
		 //提示成功和失败的记录
		 alert("成功"+sucCount+"条,失败"+failCount+"条，可能原因是选题题目冲突！");
		 
		//将插入失败的数据和隐藏域的数据对比
		 for(let j=0;j<failCount;j++){
			 for(let i=0;i<rows.length;i++){
				 //如果没有导入过，并且数据 相等
					if(errorRows[j].title==rows[i].title &&
							errorRows[j].major==rows[i].major &&
							errorRows[j].teacher==rows[i].teacher){
						rows[i].imported = false;		
						
					}
			 }	 
		 }
		 json={"reccount":json["reccount"],"rows":rows};
     	 $("#allrows").val(JSON.stringify(json));  //json对象不能直接赋值给input,需要先转化成字符串
     	 
		//为imported=false的添加红色背景
		 displayTableRows()
		
	 });

    return ;
}

/**
 * 导入结束后，清空页面
 */
function cleanPage(){
	//清空隐藏域
	$("#allrows").val("");
	//页面内容隐藏
	$("#button_import").attr("class","hidden");
	$("#button_refresh").attr("class","hidden");
	//$("#button_import").attr("class","hidden");
	$("#framerows").attr("class","hidden");
}


/**
*根据数据行生成 表格的html
*@param rows 所有的数据行
*@param i	 生成的第几行行数据
*@param html 前面几行的html
**/
var createTableRow=function(rows,i,html){

	html = html + 
		"<tr class=\""+(rows[i].imported? "" : "bg-danger")+"\">"
		+ "<td>"
		+ "<input type=\"checkbox\" name=\"a\" onclick=\"setDataCheked(this,'allrows','"+rows[i].index+"')\""+(rows[i].checked ?"checked":"" )+"></td>"
		+ "<td>" + rows[i].title   + "</td>"
		+ "<td>" + rows[i].major   + "</td>"
		+ "<td>" + rows[i].teacher + "</td>"
		+ "<td hidden>"+ rows[i].summary + "</td>"
		+ "<td>"
		+ "<a onclick=\"showLookWin('"
		+ rows[i].title
		+ "','"
		+ rows[i].summary
		+ "')\">"
		+ "<i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情"
		+ "</a>"
		+ "</td>"
		+"</tr>";

	// 获取记录数量
	
	return html;

}

/**
 * 上传excel文件并在后台解析
 */
function topicDisplay(){
	var files = $("#uplfile").prop('files');
	   
    var data = new FormData();
    data.append('file', files[0]);  //参数名：file
    
    $.ajax({
        url: "executeTopicExcelAnalysis.action",
        type: 'POST',
        data: data,
        cache: false, //禁止浏览器对该URL的缓存
        contentType: false,//告诉jquery不要去处理请求的数据格式
        processData: false,//告诉jquery不要设置请求头的类型
        success: function(data){
            //后续操作
        	$("#showEditor").modal("hide");
        	let newList=[];
        	var json = $.parseJSON(data);
        	let dataPart=json["rows"];
        	for(let i in dataPart){
        		let temp={};
        		temp.index=parseInt(i)+1;
        		temp.title=dataPart[i]["title"];
        		temp.major=dataPart[i]["major"];
        		temp.teacher=dataPart[i]["teacher"];
        		temp.summary=dataPart[i]["summary"];
        		temp.checked=false;
        		temp.imported=true;//默认全部是导入的
        		newList.push(temp);
        		
        	}
        	json={"reccount":json["reccount"],"rows":newList};
        	$("#allrows").val(JSON.stringify(json));  //json对象不能直接赋值给input,需要先转化成字符串
        	alert("正在解析文件......");
        	//setTableRows("#listrows",data);
        	$("#button_import").attr("class","btn btn-primary btn-sm");
        	$("#button_refresh").attr("class","btn btn-primary btn-sm");
        	displayTableRows();
        	
        	
        }		
        });
    }

/**
*数据显示在页面上
*/
function displayTableRows(){
	//alert("进入处理函数");
	var data=$("#allrows").val();
	var json = $.parseJSON(data);
	if (json.reccount == -1) {
		location.href = "login.jsp";
	}
	var rows = json.rows;
	// 读取每页显示多少行信息
		var value = $("#linage").val();
		var linage = 16;
		if (!isNaN(value)) {
			linage = parseInt(value);
			$("#linage").text(value);
		}
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
	var html = "";
	for (let i = 0; i < rows.length && i < linage; i++) {
		html=createTableRow(rows,i,html);
	}
	$("#tbodys").html(html);
	
	hideOverlay();
	$("#progressImgage").attr("class", "hidden");
	$("#framerows").attr("class", "table-center-block-rows");
	
}


/**
 * 设置原始数据中某一行的值是否被选中
 * @param selectorId	原始数据所在隐藏域的id
 * @param index			选择数据的
 */
var setDataCheked=function(obj,selectorId,index){
	let data=$("#"+selectorId).val();
	let json=$.parseJSON(data);
	let rows=json.rows;
	
	rows[parseInt(index)-1].checked=obj.checked;
	data={"reccount":json.reccount,"rows":rows};
	//console.log("单选后的值:"+JSON.stringify(data)); //JSON.stringify函数的作用是把一个对象转化成字符串
	$("#"+selectorId).val(JSON.stringify(data));
}


/**
 * 设置所有原始数据是否被选中
 * @param selectorId 原始数据所在隐藏域的 id
 * @param check true false
 */
var setAllDataChecked=function(selectorId,check){
	let data=$("#"+selectorId).val(); //获取隐藏域的值
	let json=$.parseJSON(data);
	let rows=json.rows;
	for(let i in rows){
		rows[i].checked=check;
	}
	data={"reccount":json.reccount,"rows":rows};
	$("#"+selectorId).val(JSON.stringify(data));
}


/**
 * 全选
 */

function allSelect(){
	$("table tr").each(function(){
		let row=$(this); //这是代表每一行
		let rowCheked=$(this).children('td:first').find("input[type='checkbox']");  //这是每一行的 checked
		if(!rowCheked.prop('checked')){  //如果这行是选中的
			//checkedRowList.push(row);  //将选中这一整行加入checkedRowList里面
			rowCheked.prop('checked',true);
		}
	});
	setAllDataChecked("allrows",true);
}

/**
 * 取消全选
 */

function removeSelect(){
	$("table tr").each(function(){
		let row=$(this); //这是代表每一行
		let rowCheked=$(this).children('td:first').find("input[type='checkbox']");  //这是每一行的 checked
		if(rowCheked.prop('checked')){  //如果这行是选中的
			//checkedRowList.push(row);  //将选中这一整行加入checkedRowList里面
			rowCheked.prop('checked',false);
		}
	});
	setAllDataChecked("allrows",false);
}


/**
 * 全选或取消全选
 */
function changeState(){
	if($("#checkTopic").prop('checked')){
		allSelect();
	}
	if(!$("#checkTopic").prop('checked')){
		removeSelect();
	}
}



/**
 * 显示查看选题详情界面
 */
function showLookWin(title,summary){
	$("#title_look").val(title);
	$("#summary_look").val(summary);
	
	$("#showLook_topic").modal({
		backdrop : 'static',
		keyboard : false
	});
}








//分页的四个按钮对应的处理函数gonext,golast,gopre,gofirst

function gonext(){
	var data=$("#allrows").val();
	var json=$.parseJSON(data);
	var rows=json.rows;
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
				html = createTableRow(rows,i,html);
			}
			$("#tbodys").html(html);
			
		}
}


function golast(){
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
			html = createTableRow(rows,i,html);
			
		}
		$("#tbodys").html(html);
		
	}
}

function gopre(){
	var data=$("#allrows").val();
	var json=$.parseJSON(data);
	var rows=json.rows;
	// 读取当前页码
		var pagenum = parseInt($("#pagenum").text());
		// 读取总记录数
		var maxpages = parseInt($("#maxpages").text());
		// 如果 当前页已经等总页数则不能移动
		if (1 == pagenum) {
			alert("已经到了第一页，不能再移动！");
		} else {
			pagenum = pagenum - 1;
			$("#pagenum").text(pagenum);
			// 获取每页记录数
			var linage = parseInt($("#linage").text());
			var html = "";
			for ( var i = (pagenum - 1) * linage; i < rows.length
			&& i < pagenum * linage; i++) {	
				html = createTableRow(rows,i,html);
			}
			$("#tbodys").html(html);
			
		}
	
}

function gofirst(){
	var data=$("#allrows").val();
	var json=$.parseJSON(data);
	var rows=json.rows;
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
				html=createTableRow(rows,i,html);
			}
			$("#tbodys").html(html);
		
		}
}







