<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <link rel="stylesheet" type="text/css" href="css/public.css">
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/teacher_topic_list.js"></script>
<script type="text/javascript" src="js/public.js"></script>
<script type="text/javascript" src="js/init_teacher_major.js"></script>

  </head>
  
  <body>
   	<div ng-app="" class="">	
		<div class="tools-bar">
		<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<button type="button" id="button_add"
							class="btn btn-success btn-sm">
							<span class="glyphicon glyphicon-plus" ></span>单独新增
						</button>
						<button type="button" id="button_file" class="btn btn-success btn-sm">
							<span class="glyphicon glyphicon-plus" ></span>批量新增
						</button>
						<button type="button" id="button_import" class="btn btn-success btn-sm hidden">
							<span class="glyphicon glyphicon-plus" ></span>确认导入
						</button>
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
						<th>选题名称</th>
						<th>专业方向</th>
						<th>选题状态</th>
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
		<div class="modal-dialog width-600">
			<div class="modal-content">
			<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">选题操作</h4>
					</div>
					<div class="modal-body" id="formInfor">
		                    <div class="form-group">
		                        <label class="col-sm-3 control-label">选题名称：</label>
		                        <div class="col-sm-9">
		                            <textarea class="form-control" rows="2" id="title" autofocus required></textarea>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <label class="col-sm-3 control-label">专业方向：</label>
		                        <div class="col-sm-9">
		                            <input type="text" class="form-control" id="teacher_major" readonly>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <label  class="col-sm-3 control-label">选题简介：</label>
		                        <div class="col-sm-9">
		                            <textarea class="form-control" rows="3" id="summary"></textarea>
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
	
	<!--导入excel文件模态框  -->
	<div class="modal fade" id="showImport" tabindex="-1" role="dialog"
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
						  <div class="form-group">
		                        <label class="col-sm-2 control-label">选择文件</label>
		                        <div class="col-sm-10">
		                            <input type="file" name="file" id="uplfile">           
		                        </div>
		                   </div>
		                    <div class="form-group">
		                        <label class="col-sm-2 control-label"></label>
		                        <div class="col-sm-10">
		                             <input type="button" value="确认提交" onclick="topicDisplay()">
		                            
		                        </div>
		                   </div>
		                 </form> 
		                  
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">
							关闭</button>
					</div>
				
			</div>
		</div>
	</div>
	
	<!--导入excel文件模态框结束  -->
	
	<div class="modal fade" id="showEvalute" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog width-600">
			<div class="modal-content">
			<form action="" method="get" class="form-horizontal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="formTitle">评审详情</h4>
					</div>
					<div class="modal-body" id="formInfor">
		                    <div class="form-group">
		                        <label class="col-sm-3 control-label">选题名称：</label>
		                        <div class="col-sm-9">
		                            <textarea class="form-control" rows="2" id="evaluted_title" readonly></textarea>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <label class="col-sm-3 control-label">分数：</label>
		                        <div class="col-sm-9">
		                            <input type="text" class="form-control" id="score" readonly>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <label  class="col-sm-3 control-label">评语：</label>
		                        <div class="col-sm-9">
		                            <textarea class="form-control" rows="3" id="remark" readonly></textarea>
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
	
	<div class="progressbar">
		<img id="progressImgage" class="hidden" alt="loading"
			src="images/home/loader.gif" />
	</div>
	<div id="overlay"></div>
	
	 <input type="hidden" id="pk" value="">
     <input type="hidden" id="teacher_major" value="">
     <input type="hidden" id="teacher_majorcode" value="">
	
	<script type="text/javascript">
		$(document).ready(function() {
			
			init_teachermajor();
		
			$("#button_add").click(showAddWin);
			$("#button_file").click(showFileWin);
			query_data();	
		});
	</script>
	
  </body>
</html>
