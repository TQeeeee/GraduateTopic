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
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


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
<script type="text/javascript" src="js/user_manage.js"></script>
<script type="text/javascript" src="js/public.js"></script>
</head>
<body>	
		
		
	<div ng-app="" class="">
		<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
					<button type="button" id="button_add1"
							class="btn btn-success btn-sm" data-dismiss="modal"  onclick="showAddWin()">
							<span class="glyphicon glyphicon-plus" ></span>单独新增
						</button>&nbsp;&nbsp;
						<button type="button" id="button_add"
							class="btn btn-success btn-sm "  data-dismiss="modal" onclick="file_import()">
							<span class="glyphicon glyphicon-plus" ></span>批量新增
						</button>&nbsp;<button  id="xianshi_info"  class="btn btn-success btn-sm "
							>显示/预览</button>
						
						
						<input type="text" id="word"
						class="input_linage width_100" value="">
						<button type="button" id="button_ok"
							class="btn btn-primary btn-sm">
							<span class="glyphicon glyphicon-repeat"></span>刷新
						</button> &nbsp;&nbsp; 用户类别: <label><input name="UserType"
							type="radio" value="0" checked />教师 </label> &nbsp;&nbsp; <label><input
							name="UserType" type="radio" value="1" />学生 </label>&nbsp;&nbsp;每页记录<input
						type="text" id="linage" class="input_linage"
						value="<s:property value="linage"/>">&nbsp;条 
						<%-- <select
						id="major" class="input">
						</select> --%>
					</td>
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
						<h4 class="modal-title" id="formTitle">用户操作</h4>
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
								<td class="col_label">用户名：</td>
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
	
	<div class="modal fade" id="file_import1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content" id="nanshou">   <!--  action="fileupload" -->
				<s:form action="file_analysis0" method="post" class="form-horizontal" enctype="multipart/form-data">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">教师信息录入</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
						<tr class="row_space_editor">
								<td class="col_label">下载模板：</td>
								<td class="col_input_360"><a href="xiazaiwenjian.action?fileName=wenjian.zip">下载教师信息模板</a></td>
							</tr>
						<tr class="row_space_editor">
								<td class="col_label">文件名：</td>
								<td class="col_input_360"><s:file name="file" lable="选择要上传的文件" /></td>
							</tr>
							<tr class="row_space_editor" style="height:40px"></tr>													
						</table>
						<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
							<%-- <span class="btn btn-info" id="xianshi_info1" >显示</span> --%>
						<button class="btn btn-info"  type="submit" id="xianshi_info1"
							>确定上传</button>
					</div>
					</div>
					</s:form>			
			</div>
		
	
		</div>
	</div>
	<div class="modal fade" id="file_import2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content" id="nanshou">   <!--  action="fileupload" -->
				<s:form action="file_analysis1" method="post" class="form-horizontal" enctype="multipart/form-data">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">学生信息录入</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
						<tr class="row_space_editor">
								<td class="col_label">下载模板：</td>
								<td class="col_input_360"><a href="xiazaiwenjian.action?fileName=wenjian.zip">下载学生信息模板</a></td>
							</tr>
						
						<tr class="row_space_editor">
								<td class="col_label">文件名：</td>
								<td class="col_input_360"><s:file name="file" lable="选择要上传的文件" /></td>
							</tr>
							<tr class="row_space_editor" style="height:40px"></tr>													
						</table>
						<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
							<%-- <span class="btn btn-info" id="xianshi_info1" >显示</span> --%>
						<button class="btn btn-info"  type="submit" id="xianshi_info1"
							>确定上传</button>
					</div>
					</div>
					</s:form>			
			</div>
		
	
		</div>
	</div>
	
	<!-- 单个插入教师数据模态框 -->
		<div class="modal fade" id="single_insert1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">教师数据插入操作</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">编号：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='usercode' autofocus required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">姓名：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='name9' required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">密码：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='pwd' required />
								</td>
							</tr>
								<tr class="row_space_editor">
								<td class="col_label">可指导学生数目：</td>
								<td class="col_input_330"><input type='text'
									class="input_340" id='maximun' required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">专业：</td>
								<td class="col_input_360"><select id="major" class="input">
								</select>
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">职称：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='t_level' required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">类型：</td>
								<td class="col_input_360"><select id="t_type" class="input">
									<option value="院内">院内</option>
  									<option value="外聘">院外</option>
								</select>
								</td>
							</tr>							
							<tr class="row_space_editor">
								<td class="col_label">是否合法：</td>
								<td class="col_input_360">
								<select id="isvalid" class="input">
								 	<option value="1">是</option>
  									<option value="0">否</option>
								</select>
								</td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info" id="buttonSave"
							onclick="single_insert1()">确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- 单个插入学生数据模态框 -->
			<div class="modal fade" id="single_insert2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">学生数据插入操作</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<table>
							<tr class="row_space_editor">
								<td class="col_label">学号：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='usercode1' autofocus required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">姓名：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='name1' required />
								</td>
							</tr>
							<tr class="row_space_editor">
								<td class="col_label">专业：</td>
								<td class="col_input_360"><select id="major1" class="input">
								 	<option value="软件工程">软件工程</option>
  									<option value="信息安全">信息安全</option>
								</select>
								</td>
							</tr>	
							<tr class="row_space_editor">
								<td class="col_label">密码：</td>
								<td class="col_input_360"><input type='text'
									class="input_340" id='pwd1' required />
								</td>
							</tr>																										
							<tr class="row_space_editor">
								<td class="col_label">是否合法：</td>
								<td class="col_input_360">
								<select id="isvalid1" class="input">
								 	<option value="1">是</option>
  									<option value="0">否</option>
								</select>
								</td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info" id="buttonSave"
							onclick="single_insert2()">确定</button>
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
	<input type="hidden" id="a1" value="">
	<input type="hidden" id="allrows" value="">
	<div class="hidden" id="xx">
	<% String aa=(String)request.getAttribute("result");
	
		out.println(aa);
		%>
		<%-- <input type="hidden" name="xl" id="xl" value="${result}"> --%>
	</div> 
	
	<script type="text/javascript">
		$(document).ready(function() {
			query_data();
			init_major();
			//init_roles();
			//var test;
			/* $('#bunanshou1').hide(); */
			//$('#button_add1').click(showAddWin);
			
			$("#button_ok").click(query_data);
			$("input[name='UserType']").change(query_data);
			$("#button_first").click(gofirst);
			$("#button_pre").click(gopre);
			$("#button_next").click(gonext);
			$("#button_last").click(golast);
			$('#xianshi_info').click(data_analysis2);
	
			
			});
	</script>
</body>
</html>
