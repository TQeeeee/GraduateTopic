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
	<script type="text/javascript" src="js/topic_allocating_list.js"></script>
	<script type="text/javascript" src="js/public.js"></script>

  </head>
  
  <body>
    <div ng-app="" class="">
		<div class="tools-bar">
			<table class="table left">
				<tr class="border-none">
					<td class="border-none">
						<button type="button" id="button_add"
								class="btn btn-success btn-sm">
								<span class="glyphicon glyphicon-plus" ></span>评审分配
						</button>
					</td>
				</tr>
			</table>
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
							data-dismiss="modal" id="buttonAllocate" onclick="allocate()">
							确定</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		$(document).ready(function() {
			$("#button_add").click(showAddWin);
			
		});
	</script>
  </body>
</html>
