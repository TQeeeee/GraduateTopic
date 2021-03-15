<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'user_privs.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <div ng-app="" class="">
		<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<input type="text" id="word" class="input_linage width_100" value="">
						<button type="button" id="button_search"
							class="btn btn-primary btn-sm" onclick="search_role()">
							<span class="glyphicon glyphicon-repeat"></span>查询
						</button> &nbsp;&nbsp; 
						<button type="button" id="button_add"
							 class="btn btn-success btn-sm hidden">
							<span class="glyphicon glyphicon-plus"></span>新增
						</button> &nbsp;&nbsp; 
					</td>
				</tr>
			</table>
		</div>
		<div id="framerows" class="table-center-block-rows hidden">
			<!--startlist-->
			<table id="listrows"
				class="table table-striped table-bordered table-hover">
				<thead>
					<tr id="trheader">
						<th>用户编号</th>
						<th>用户名</th>
						<th>角色</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="tbodys">

				</tbody>
			</table>
			<!-- endlist -->
		</div>
	</div>
	<!--新增用户角色模态框 start  -->
	
	<!--新增用户角色模态框 end  -->
	<!--删除用户角色模态框 start -->
	
	<!--删除用户角色模态框end  -->
	
	<!-- 该用户所有的角色 -->
	<input type="hidden" id="user_allRole">
	
	
  </body>
  <script type="text/javascript">
  	$(document).ready(function(){
    	//let url="saveUserRoleSettingsAction.action";  //发送路径
    
    });
  </script>
</html>
