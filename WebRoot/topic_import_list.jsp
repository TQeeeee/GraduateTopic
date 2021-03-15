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
<script type="text/javascript" src="js/topic_import_list.js"></script>
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
							class="btn btn-primary btn-sm hidden" onclick="getCheckedValue('saveTopicTopicAction.action')">
							<span class="glyphicon glyphicon-plus" ></span>确认导入
						</button> &nbsp;&nbsp;
						<button type="button" id="button_refresh"
							class="btn btn-primary btn-sm hidden" onclick="displayTableRows()">
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
						</button></td>
				</tr>
			</table>
		</div>
		<div id="framerows" class="table-center-block-rows hidden">
			<!--startlist-->
			<table id="listrows"
				class="table table-bordered table-hover">
				<thead>
					<tr id="trheader">
						 	
                            <th><input type="checkbox" id="checkTopic" onclick="changeState()">全选本页</th>
                            <th>选题名称</th>
                            <th>专业方向</th>
   	                        <th>指导教师</th>
                            <th>操作</th>
                            
					</tr>
				</thead>
				<tbody id="tbodys">
					
				</tbody>
			</table>
			<!--endlist-->
		</div>
	</div>
    
    <!--导入文件模态框-->
    
    <div class="modal fade" id="showEditor" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-600">
			<div class="modal-content">
				
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">上传选题</h4>
					</div>
					<div class="modal-body" id="formInfor">
						<form>
						<table>
						<tr>
						<td><label>选择文件</label>&nbsp;&nbsp;</td>
						<td><input type="file" name="file" id="uplfile"></td>
						<td><input type="button" value="确认提交" onclick="topicDisplay()"> </td>
						</tr>
						<tr>
						<td><label>下载模板</label>&nbsp;&nbsp;</td>
						<td><a href="/topic/modal/topic_modal.xlsx" download="模板" taget="_blank">下载选题模板</a></td>
						<td></td>
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
    <!-- 导入文件模态框结束 -->
   
    <!--查看选题模态框-->
    
  
  	<div class="modal fade" id="showLook_topic" tabindex="-1" role="dialog"
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
		                           
		                            <textarea class="form-control" rows="2" id="title_look" readonly></textarea>
		                        </div>
		                    </div>
		                     <div class="form-group">
		                        <label  class="col-sm-2 control-label">选题简介</label>
		                        <div class="col-sm-10">
		                            <textarea class="form-control" rows="3" id="summary_look" readonly></textarea>
		                        </div>
		                    </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				</form>
			</div>
		</div>
	</div>
  
  
    
    
    
    
    <input type="hidden" id="allrows" value="">
    
    
    
    <script type="text/javascript">
    
    $(document).ready(function(){
    	let url="saveTopicTopicAction.action";  //发送路径
    
    });
    

    </script>
     
  </body>
</html>
