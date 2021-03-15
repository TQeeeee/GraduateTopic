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
<script type="text/javascript" src="js/report_review_list.js"></script>

<script type="text/javascript" src="js/public.js"></script>

<%-- <script>
$(document).ready(function(){
  $("#buttonSave").click(function(){
    $(this).hide();
  });
});
</script> --%>
</head>
<body>
	 <div ng-app="" class="">
	<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<button type="button" id="button_ok"
							class="btn btn-primary btn-sm">
							<span class="glyphicon glyphicon-repeat"></span>刷新
						</button> &nbsp;&nbsp;
						 查看: <label><input name="Choose"
							type="radio" value="0" checked />待评审选题 </label> &nbsp;&nbsp; <label><input
							name="Choose" type="radio" value="1" />已评审选题 </label>&nbsp;&nbsp; 
						
						每页记录<input
						type="text" id="linage" class="input_linage"
						value="<s:property value="linage"/>">&nbsp;条 </td>
					<td id="page_tools" class="border-none hidden"><span>总记录：</span><span
						id="reccount">0</span><span>&nbsp;&nbsp;当前页:</span><span
						id="pagenum">1</span><span>&nbsp;&nbsp;共</span><span id="maxpages">16</span><span>页</span>&nbsp;&nbsp;
						<button id="button_first" type="button"
							class="btn btn-default btn-sm">
							<span class="glyphicon glyphicon-step-backward"></span> 首页
						</button>
						<button id="button_pre" type="button"
							class="btn btn-default btn-sm">
							<span class="glyphicon glyphicon-hand-left"></span> 上页
						</button>
						<button id="button_next" type="button"
							class="btn btn-default btn-sm">
							<span class="glyphicon glyphicon-hand-right"></span> 下页
						</button>
						<button id="button_last" type="button"
							class="btn btn-default btn-sm">
							<span class="glyphicon glyphicon-step-forward"></span> 尾页
						</button></td>
				</tr>
			</table>
		</div>
		<div id="framerows" class="table-center-block-rows hidden">
			<!--startlist-->
			<table id="listrows"
				class="table table-striped table-bordered table-hover">
				<thead>
					<tr id="trheader">						
						<th>报告标题</th>						
						<th>操作</th>												
					</tr>
				</thead>
				<tbody id="tbodys">

				</tbody>
			</table>
			<!--endlist-->
		</div>
	</div>
  <!-- 
  <input type="hidden" id="pk" value=""> -->
	<div class="modal fade" id="reviewModel" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-500 height-700">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">报告评审</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">报告标题：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" readonly="true" id="reporttitle" /></td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">报告内容：</td>
								<td class="file-editor" id="downUrl">								
									<a  href="streamDownload.action?fileName=report_8000116071.xml">下载开题报告</a>
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">报告分数：</td>
								<td class="col_input_360"><input type='text'
									class="input_340"  id="score"/></td>
							</tr>								
								<tr class="row_space_editor">
								<td class="col_label">报告评语：</td>
								<td class="col_input_360"><textarea class="input_340" id="remark"></textarea></td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" id="buttonSave"
							onclick="saveData()">提交</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				</form>
			</div>
		</div>
	</div>

<div class="modal fade" id="showReview" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-500 height-500">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">查看评审</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">报告标题：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" readonly="true" id="reportTitle" /></td>
							</tr>	
							<tr class="row_space_editor">
								<td class="col_label">报告分数：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" readonly="true" id="rScore"/></td>
							</tr>						
								<tr class="row_space_editor">
								<td class="col_label">报告评语：</td>
								<td class="col_input_360"><textarea class="input_340" readonly="true" id="rRemark"></textarea></td>
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
	<input type="hidden" id="pk" value="">
	<input type="hidden" id="allrows" value="">

<script type="text/javascript">
		$(document).ready(function() {
			query_data();
			init_major();	
			$("input[name='Choose']").change(query_data);	
			$("#button_ok").click(query_data);		
			$("#button_first").click(gofirst);
			$("#button_pre").click(gopre);
			$("#button_next").click(gonext);
			$("#button_last").click(golast);
		});
	</script>

</body>
</html>
