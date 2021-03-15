/**
 * 读取教师专业方向编号，写入teacher_majorcode中，专业方向写入teacher_major
 */
function init_teachermajor() {
	var code = "none";
	$.ajax({
		url : 'teacherMajor_lookTopicAction',
		type : 'post',	
		datatype : 'json',
		async: false,
		success : function(data) {
			var json = $.parseJSON(data);
			var rows = json.rows;
			$("#teacher_major").val(rows[0].major);
			//alert($("teacher_major").val());
			$("#teacher_majorcode").val(rows[0].majorcode);
		}
	});
}