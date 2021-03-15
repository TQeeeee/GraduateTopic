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
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/role_manage.js"></script>
<script type="text/javascript" src="js/public.js"></script>
</head>
<body>
	<div ng-app="" class="">
		<div class="tools-bar">
			<button type="button" id="button_add" class="btn btn-success btn-sm">
				<span class="glyphicon glyphicon-plus"></span>新增
			</button>
		</div>
		<div id="framerows" class="table-center-block-rows hidden">
			<!--startlist-->
			<table id="listrows"
				class="table table-striped table-bordered table-hover">
				<thead>
					<tr id="trheader">
						<th>角色</th>
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
	<div class="modal fade" id="showModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
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
							data-dismiss="modal" id="buttonDel" onclick="delData()">
							确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="modal fade" id="showEditor" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">角色操作</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">编号：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='code' autofocus required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">角色名：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='name' required />
								</td>
							</tr>
						</table>
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

	<script type="text/javascript">
		$(document).ready(function() {
			query_data();
			$("#button_add").click(showAddWin);
		});
	</script>
</body>
</html>
