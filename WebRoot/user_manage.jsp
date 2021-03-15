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
	<script type="text/javascript" src="js/user_manage.js"></script>
	<script type="text/javascript" src="js/public.js"></script>
	<script type="text/javascript" src="js/init_data_ytq.js"></script>
  </head>
  
  <body>
  <div ng-app="" class="">
		<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<button type="button" id="button_add"
							class="btn btn-success btn-sm" onclick="addUser()">
							<span class="glyphicon glyphicon-plus" ></span>新增
						</button>
						<input type="text" id="word" class="input_linage width_100" value="">
						<button type="button" id="button_refresh"
							class="btn btn-primary btn-sm" onclick="displayTableRows()">
							<span class="glyphicon glyphicon-repeat"></span>刷新
						</button> &nbsp;&nbsp;查看: <label><input name="Choose"
							type="radio" value="0" checked />教师 </label> &nbsp;&nbsp; <label><input
							name="Choose" type="radio" value="1" />学生 </label>&nbsp;&nbsp;
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
                            
					</tr>
				</thead>
				<tbody id="tbodys">
					
				</tbody>
			</table>
			<!--endlist-->
		</div>
	</div>
    
   
    <!--编辑教师信息模态框-->
  	<div class="modal fade" id="showTeacher_edit" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-600">
			<div class="modal-content">
				<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">教师信息</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<div class="form-group">
	                        <label class="col-sm-4 control-label">教师编号</label>
	                        <div class="col-sm-8">
	                            <input type="text" class="form-control" id="teacher_code">
	                        </div>
	                    </div>
	                     <div class="form-group">
	                        <label class="col-sm-4 control-label">教师姓名</label>
	                        <div class="col-sm-8">
	                            <input type="text" class="form-control" id="teacher_name">
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-sm-4 control-label">专业方向</label>
	                        <div class="col-sm-8">
	                            <select id="major" class="form-control">
	                            </select>
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-sm-4 control-label">最大可带学生数</label>
	                        <div class="col-sm-8">
	                            <input type="text" class="form-control" id="teacher_maxnum">
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-sm-4 control-label">教师职称</label>
	                        <div class="col-sm-8">
	                           	<input type="text" class="form-control" id="teacher_level">
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-sm-4 control-label">教师类别</label>
	                        <div class="col-sm-8">
	                            <input type="text" class="form-control" id="teacher_type">
	                        </div>
	                    </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal" onclick="saveTeacher()">
							保存</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				</form>
			</div>
		</div>
	</div>
  <!-- 编辑教师信息模态框 end -->
  <!-- 编辑学生信息模态框 -->
  
  
  <!-- 编辑学生信息模态框end -->
  <!-- 删除用户和重置密码模态框 --> 
  <div class="modal fade" id="showModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-480">
			<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="frameTitle">操作</h4>
					</div>
					<!--startdetail-->
					<div class="modal-body" id="frameInfor"></div>
					<!-- 这个隐藏域是为了说明点击确定按钮时，是执行删除用户还是重置密码   -->
					<input type = "hidden" id ="command" value="">
					<!--enddetail-->
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
						<button type="button" class="btn btn-info hidden"
							data-dismiss="modal" id="buttonDel" onclick="operateData()">
							确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
  <!-- 删除用户和重置密码模态框end -->
  
  <!--  -->
  
  
    
    
    <input type="hidden" id="allrows" value="">
    
  	<script type="text/javascript">
		$(document).ready(function() {
			
			init_major();
			query_data();
			
			/* $("#button_ok").click(query_data);
			$("input[name='Choose']").change(query_data);
			$("#button_first").click(gofirst);
			$("#button_pre").click(gopre);
			$("#button_next").click(gonext);
			$("#button_last").click(golast); */
		});
	</script>
    
  	</body>
  	
</html>
