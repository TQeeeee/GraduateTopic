/**
 * 获取后台数据进行处理
 */
function query_data(word){
		let url="getUserRoleSettingsAction.action";
		let data = {"word":word};
		let html="";
	//利用Deferred的同步来模拟异步
	    $.when(sendMessageSyncByDeferred(url,data)).done(function(res){
	    let json = $.parseJSON(res);
	    let reccount = parseInt(json.reccount);
	    let rows = json.rows;
	    if(reccount == -1){
	    	alert("您没有此操作的权限！！！请重新登陆");
	    	return ;
	    }
	    if(reccount == 0){
	    	alert("没有该用户！");
	    	return ;
	    }
	    //将查询结果放在隐藏域中
	    $("#user_allRole").val(res);
	    
	    html = createTableRow(reccount,rows,html);
	   }); 
	    $("tbodys").html(html);
}
function search_role(){
	let word = "";
	word=$("#word").val();
	if(isEmpty(word)){
		alert("查询条件不能为空！！！");
		return ;//return后后面的代码都不执行
	}
	query_data(word);
}

var createTableRow = function(reccount,rows,html){
	for(let i = 0;i < reccount;i++){
		html = html + 
		"<tr>"
		+ "<td>" + rows[i].usercode   + "</td>"
		+ "<td>" + rows[i].username   + "</td>"
		+ "<td>" + rows[i].rolecode + "</td>"
		+ "<td>" + rows[i].rolename + "</td>"
		+ "<td>"
		+ "<a onclick=\"showLookWin('"
		+ rows[i].usercode
		+ "','"
		+ rows[i].username
		+ "')\">"
		+ "<i class='glyphicon glyphicon-pencil bigger-130 green'></i>查看详情"
		+ "</a>"
		+ "</td>"
		+"</tr>";

	// 获取记录数量
	
	
	}
	return html;
}


function showLookWin(usercode,username){
	
}
