<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/public.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="angular1.3.1/angular.min.js"></script>
<script type="text/javascript" src="js/init_data_ytq.js"></script>
<script type="text/javascript" src="js/user_import.js"></script>
<script type="text/javascript" src="js/public.js"></script>

</head>

<body>

					
	<div ng-app="" class="">
		<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<button type="button" id="button_add"
							class="btn btn-success btn-sm" onclick="showfileUpload()">
							<span class="glyphicon glyphicon-plus" ></span>选择文件
						</button>
						<button type="button" id="button_import"
							class="btn btn-primary btn-sm" onclick="importUser()">
							<span class="glyphicon glyphicon-plus"></span>确认导入
						</button> &nbsp;&nbsp;
						<button type="button" id="button_refresh"
							class="btn btn-primary btn-sm" onclick="displayTable()">
							<span class="glyphicon glyphicon-repeat"></span>刷新
						</button> &nbsp;&nbsp;
					        每页记录
					    <input type="text" id="linage" class="input_linage" value="<s:property value="linage"/>">&nbsp;条 
					</td>
					<td id="page_tools" class="border-none hidden">
					    <span>总记录：</span>
					    <span id="reccount">0</span><span>&nbsp;&nbsp;当前页:</span>
					    <span id="pagenum">1</span><span>&nbsp;&nbsp;共</span>
					    <span id="maxpages">16</span><span>页</span>&nbsp;&nbsp;
						<button id="button_first" type="button"
							class="btn btn-default btn-sm" onclick="gofirst()">
							<span class="glyphicon glyphicon-step-backward"></span> 首页
						</button>
						<button id="button_pre" type="button"
							class="btn btn-default btn-sm" onclick="gopre()">
							<span class="glyphicon glyphicon-hand-left"></span> 上页
						</button>
						<button id="button_next" type="button"
							class="btn btn-default btn-sm" onclick="gonext()">
							<span class="glyphicon glyphicon-hand-right"></span> 下页
						</button>
						<button id="button_last" type="button"
							class="btn btn-default btn-sm" onclick="golast()">
							<span class="glyphicon glyphicon-step-forward"></span> 尾页
						</button>
					</td>
				</tr>
			</table>
		</div>
		<div id="framerows" class="table-center-block-rows hidden">
			<!--startlist-->
			<table id="listrows"
				class="table table-bordered table-hover">
				<thead>
					<tr id="trheader">
					
					</tr>
				</thead>
				<tbody id="tbodys">
					
				</tbody>
			</table>
			<!--endlist-->
		</div>
	</div>

	<!--选择文件模态框  start -->
	<div class="modal fade" id="showFileUpload" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-600">
			<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">上传文件</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<form>
							<table>
							<tr>
							<td><label>用户类型</label></td>
							<td><input type="radio" name="usertype" value="0" checked>教师</td>
							<td><input type="radio" name="usertype" value="1">学生</td>
							</tr>
							<tr>
							<td><label>选择文件</label>&nbsp;&nbsp;</td>
							<td><input type="file" name="file" id="uplfile"></td>
							<td><input type="button" value="确认提交" onclick="submitExcel()"> </td>
							</tr>
							<tr>
							<td><label>下载模板</label>&nbsp;&nbsp;</td>
							<td><a href="/topic/modal/teacher_modal.xlsx" download="模板" taget="_blank">教师模板</a></td>
							<td><a href="/topic/modal/student_modal.xlsx" download="模板" taget="_blank">学生模板</a></td>
							</tr>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				
			</div>
		</div>
	</div>
		
		<!--选择文件模态框 end  -->
		
		
		<!--如果没有value="",赋值的时候是不是就不必须赋字符串了？？？  -->
		<input type="hidden" id="allrows" value="">
   		
  </body>
</html>
