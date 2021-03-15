<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/public.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/student_choice_list.js"></script>
<script type="text/javascript" src="js/public.js"></script>
<script type="text/javascript" src="js/init_data_ytq.js"></script>
</head>
  
  <body>
	<div ng-app="" class="">
		<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<input type="text" id="word" class="input_linage width_100" value="">
						<button type="button" id="button_ok"
							class="btn btn-primary btn-sm">
							<span class="glyphicon glyphicon-repeat"></span>刷新
						</button> &nbsp;&nbsp; 查看: <label><input name="Choose"
							type="radio" value="0" checked />已选选题 </label> &nbsp;&nbsp; <label><input
							name="Choose" type="radio" value="1" />可选选题 </label>&nbsp;&nbsp;
					        每页记录
					    <input type="text" id="linage" class="input_linage" value="<s:property value="linage"/>">&nbsp;条 
					</td>
					<td id="page_tools" class="border-none hidden">
					    <span>总记录：</span>
					    <span id="reccount">0</span><span>&nbsp;&nbsp;当前页:</span>
					    <span id="pagenum">1</span><span>&nbsp;&nbsp;共</span>
					    <span id="maxpages">16</span><span>页</span>&nbsp;&nbsp;
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
						<th>用户</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="tbodys">

				</tbody>
			</table>
			<!--endlist-->
		</div>
	</div>

	<div class="modal fade" id="showModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-600">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<input type="hidden" id="txtDel" value="" />
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="frameTitle">详细信息</h4>
					</div>
					<!--startdetail-->
					<div class="modal-body" id="frameInfor"></div>
					<!--enddetail-->
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info hidden"
							data-dismiss="modal" id="buttonCheck" onclick="CheckData() ">
							确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div class="modal fade" id="showEditor" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-600">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">查看详情</h4>
					</div>
					<div class="modal-body" id="formInfor">
							<div class="form-group">
		                        <label class="col-sm-2 control-label">选题题目</label>
		                        <div class="col-sm-10">
		                           
		                            <textarea class="form-control" rows="2" id="title" readonly></textarea>
		                        </div>
		                    </div>
		                     <div class="form-group">
		                        <label  class="col-sm-2 control-label">选题简介</label>
		                        <div class="col-sm-10">
		                            <textarea class="form-control" rows="3" id="summary" readonly></textarea>
		                        </div>
		                    </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info" id="buttonSave"
							onclick="saveData()">确定</button>
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

	<input type="hidden" id="tcode" value="">
	<input type="hidden" id="pk" value="">
	<input type="hidden" id="allrows" value="">
	

	<script type="text/javascript">
		$(document).ready(function() {
			
			query_data();
			
			$("#button_ok").click(query_data);
			$("input[name='Choose']").change(query_data);
			$("#button_first").click(gofirst);
			$("#button_pre").click(gopre);
			$("#button_next").click(gonext);
			$("#button_last").click(golast);
		});
	</script>
</body>
</html>
