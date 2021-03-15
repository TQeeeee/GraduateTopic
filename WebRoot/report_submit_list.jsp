<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	System.out.println("basePath=" + basePath);
%>

<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML>
<html>
<head>

<link rel="stylesheet" type="text/css" href="css/public.css">
<link type="text/css" rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/report_submit_list.js"></script>
<script type="text/javascript" src="js/public.js"></script>

<script type="text/javascript">
$(function(){
		$("input[type='file']").on('change',function(){
			var $filename1 = $(this).val().split("\\");
			if($(this).val().length>0){
				$('.file-input').html($filename1[$filename1.length-1]);
			}
		})
	})
function check(){
var str = document.getElementById("f_file").value;
if(str.length==0)
{
alert("请选择报告上传");
return false;
}
return true;
}
</script>
</head>
<body>
	<div ng-app="" class="">
		<div class="tools-bar">
			<%-- <button  id="button_add" class="btn btn-success btn-sm" data-toggle="modal"
				data-target="myModal">
				<span class="glyphicon glyphicon-plus"></span>报告提交
			</button> --%>
			<%-- <button class="btn btn-success btn-sm" data-toggle="modal"
				data-target="#myModal"><span class="glyphicon glyphicon-plus"></span>报告提交
			</button> --%>
		</div>
		<div id="framerows" class="table-center-block-rows hidden">
			<!--startlist-->
			<table id="listrows"
				class="table table-striped table-bordered table-hover">
				<thead>
					<tr id="trheader">
						<th>报告标题</th>
						<th>状态</th>
						<th>分数</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="tbodys">
					
				</tbody>
			</table>
			<!--endlist-->
		</div>
	</div>
	<input type="hidden" id="pk" value="">
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-500">
			<div class="modal-content">
				<form action="fileupload.action" method="post"
					enctype="multipart/form-data" class="form-horizontal" onsubmit="return check()">
					<input type="hidden" id="txtDel" value="" />
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="frameTitle">报告提交</h4>
					</div>
					<!--startdetail-->
					<div class="modal-body" id="frameInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">报告标题：</td>
								<td><input class="text" type="text" style="width:400px;" readonly="true" id="topictitle"
									value="" /></td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">报告上传：</td>
								<td class="file-editor">
									<div class="file-input">选择文件</div> <input type="file"
									name="file" id="f_file"/>
								</td>
							</tr>
						</table>
					</div>
					<!--enddetail-->
					<div class="modal-footer">									
							<input type="submit" name="submit"  value="提交" class="btn btn-info" /> 
							<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				</form>
			</div>
		</div>
	</div>

<div class="modal fade" id="showModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-500">
			<div class="modal-content">
				<form action="fileupload.action" method="post"
					enctype="multipart/form-data" class="form-horizontal">
					<input type="hidden" id="txtDel" value="" />
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="frameTitle">查看报告</h4>
					</div>
					<!--startdetail-->
					<div class="modal-body" id="frameInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">报告标题：</td>
								<td><input class="text" type="text" style="width:400px;" readonly="true" id="showtitle"
									value="" /></td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">报告内容：</td>
								<td class="file-editor" id="downurl">								
									<a  href="streamDownload.action?fileName=report_8000116071.xml">下载开题报告</a>
								</td>
							</tr>
						</table>
					</div>
					<!--enddetail-->
					<div class="modal-footer">													
							<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="modal fade" id="showResult" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-500 height-500">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">报告结果</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">报告标题：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" readonly="true" id="reporttitle" /></td>
							</tr>							
								<tr class="row_space_editor">
								<td class="col_label">报告评语：</td>
								<td class="col_input_360"><textarea class="input_340" id="reportRemark" readonly="true"></textarea></td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						
					</div>
				</form>
			</div>
		</div>
	</div>



	<div class="progressbar">
		<img id="progressImgage" class="hidden" alt="loading"
			src="images/home/loader.gif" />
	</div>
	<div id="overlay"></div>

	<script type="text/javascript">
		$(document).ready(function() {
			query_data();
		});
	</script>

</body>
</html>
