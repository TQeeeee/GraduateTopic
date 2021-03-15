/**
 * 初始化教师可带最大学生数
 */
function init_teacher_maxnum(){
	var url="teacherMaxnumberTopicAction";
	$.ajax({
		url : url,
		type : 'post',
		datatype : 'json',
		async: false,
		success : function(data) {
			var json = $.parseJSON(data);
			$("#maxnumber").val(json.maximun);
		}
	});
	
}

/**
 * 
 */
