/**
 * 
 */
function showAddWin(){
	var html = "<p>确定要进行评审分配？</p>";
	$("#frameInfor").html(html);
	$("#frameTitle").text("操作确定");
	$("#buttonAllocate").attr("class", "btn btn-warning");
	$("#showModal").modal('show');
}

function allocate(){
	var url = "";
	$("#frameInfor").html("");
	url = 'topicAllocatingTopicAction.action';
	$.ajax({
		url : url,
		type : 'post',
		datatype : 'json',
		success : function(data) {
			var json = $.parseJSON(data);
			// 获取记录数量
			var reccount = parseInt(json.reccount);
			$("#showModal").modal("hide");
			if (reccount == 0) {
				alert("分配成功！");
			} else {
				alert("分配失败！");
			}
		}
	});
}