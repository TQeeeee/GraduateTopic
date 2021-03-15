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
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="css/public.css">

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="angular1.3.1/angular.min.js"></script>
<script type="text/javascript" src="js/init_data.js"></script>
<script type="text/javascript" src="js/role_privs.js"></script>
<script type="text/javascript" src="js/public.js"></script>
</head>
<body>
	<div ng-app="" class="">
		<div id="framerows" class="table-center-block-rows">
			<table class="table">
				<caption>
					<h3 id="trcaption">角色授权</h3>
				</caption>
				<tr>
					<td style="display:table-cell; vertical-align:middle"
						class="col_label">角色：</td>
					<td style="display:table-cell; vertical-align:middle"
						class="col_input"><select id="sysrole" class="input">
					</select>
					</td>
					<td class="align-left">
						<button type="button" id="button_ok"
							class="btn btn-primary btn-sm">
							<span class="glyphicon glyphicon-refresh"></span>确定
						</button></td>
					<td style="display:table-cell; vertical-align:middle"
						class="col_label">权限：</td>
					<td style="display:table-cell; vertical-align:middle"
						class="col_input"><select id="sysmenu" class="input">
					</select>
					</td>
					<td class="align-left">
						<button type="button" id="button_add"
							class="btn btn-success btn-sm">
							<span class="glyphicon glyphicon-plus"></span>新增
						</button></td>
				</tr>
			</table>
			<!--startlist-->
			<table id="listrows"
				class="table table-striped table-bordered table-hover">
				<thead>
					<tr id="trheader">
						<th>菜单</th>
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
	<input type="hidden" id="menu" value="">
	
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
							data-dismiss="modal" id="buttonDel" onclick="delData()">   <!-- /////////删除角色所拥有的权限 -->
							确定</button>
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
			init_roles();
			init_menus();
			$("#button_ok").click(query_data);  ///确定  即查询角色所含有的权限 （菜单）
			$("#button_add").click(saveData);		////或者说为角色新增加权限
													///新增加  菜单  code title parents URL method  sort_no  visible  css
			
		});
	</script>
</body>
</html>
