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
<script type="text/javascript" src="angular1.3.1/angular.min.js"></script>
<script type="text/javascript" src="js/init_data.js"></script>
<script type="text/javascript" src="js/user_privs.js"></script>
<script type="text/javascript" src="js/public.js"></script>
</head>
<body>
	<div ng-app="" class="">
		<div id="framerows" class="table-center-block-rows">
			<table class="table">
				<caption>
					<h3 id="trcaption">用户授权</h3>
				</caption>
				<tr>
					<td style="display:table-cell; vertical-align:middle"
						class="col_label">用户：</td>
						
					<%-- <td style="display:table-cell; vertical-align:middle"
						class="col_input"><select id="sysuser" class="input">
					</select>
					</td> --%>					
					<td style="display:table-cell; vertical-align:middle"
						class="col_input"><input id="sysuser" class="input">
					</select>
					</td>
					<td class="align-left">
						<button type="button" id="button_ok"
							class="btn btn-primary btn-sm">
							<span class="glyphicon glyphicon-refresh"></span>确定
						</button></td>
					<%-- <td style="display:table-cell; vertical-align:middle"
						class="col_label">角色：</td>
					<td style="display:table-cell; vertical-align:middle"
						class="col_input"><select id="sysrole" class="input">
					</select>
					</td>
					<td class="align-left">
						<button type="button" id="button_add"
							class="btn btn-success btn-sm">
							<span class="glyphicon glyphicon-plus"></span>新增
						</button></td> --%>
				</tr>
			</table>
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
	<input type="hidden" id="pk" value="">
	<input type="hidden" id="a1" value="">
	<input type="hidden" id="a2" value="">
	<input type="hidden" id="fk" value="">
	
	<!-- //////////////////////////////删除用户角色 -->
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
							data-dismiss="modal" id="button_delete" onclick="delData()">
							确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- //////////////////////////////新增加用户角色   老老老-->
	<div class="modal fade" id="user_privs_add" tabindex="-1" role="dialog"
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
						<h4 class="modal-title" id="frameTitle1">新增加用户角色</h4>
					</div>
					<!--startdetail-->
					<div class="modal-body" id="frameInfor1"></div>
					<!--enddetail-->
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info hidden"
							data-dismiss="modal" id="button_add1" onclick="saveData1()">
							确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<!-- //////////////////////////////修改用户角色 -->
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
						<h4 class="modal-title" id="formTitle">用户角色操作</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">用户编号：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='code' readonly="readonly" />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">角色名：</td>
								<td style="display:table-cell; vertical-align:middle"
								class="col_input"><select id="sysrole1" class="input">
								</select>
								</td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info" id="buttonSave"
							onclick="saveData2()">确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
		
	<!-- //////////////////////////////新增用户角色 -->
		<div class="modal fade" id="jaiyi" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">用户角色操作</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">用户编号：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='code1' readonly="readonly" />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">角色名：</td>
								<td style="display:table-cell; vertical-align:middle"
								class="col_input"><select id="sysrole" class="input">
								</select>
								</td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info" id="buttonSave"
							onclick="saveData_new()">确定</button>
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
	<!-- <input type="hidden" id="pk" value=""> -->
	
	<script type="text/javascript">
		$(document).ready(function() {
			init_roles();
			
			init_users();
			$("#button_ok").click(query_data);
			$("#code1").attr("disabled","disabled");
			$("#code").attr("disabled","disabled");
		//	$("#button_add").click(saveData);
		});
	</script>
</body>
</html>
