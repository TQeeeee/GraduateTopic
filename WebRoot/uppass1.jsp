<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
	<link rel="stylesheet" type="text/css" href="css/public.css">
	<link rel="stylesheet" type="text/css"
		href="bootstrap-3.2.0/css/bootstrap.css">
	<link rel="stylesheet" href="bootstrap-3.2.0/css/font-awesome.min.css" />
	
	<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/button_control.js"></script>
	<script type="text/javascript" src="js/uppass.js"></script>
	<script type="text/javascript" src="js/public.js"></script>

  </head>
  
  <body>
   <div class="container">
	<div class="row clearfix">
		<div class="col-md-12 column">
			<form class="form-horizontal" role="form">
				<div class="form-group">
					 <label for="inputPassword3" class="col-sm-2 control-label">请输入原密码：</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" id="oldPassword" />
					</div>
				</div>
				<div class="form-group">
					 <label for="inputPassword3" class="col-sm-2 control-label">请输入新密码：</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" id="newPassword" />
					</div>
				</div>
				<div class="form-group">
					 <label for="inputPassword3" class="col-sm-2 control-label">请确认新密码：</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" id="newPasswordCheck" />
					</div>
				</div>
				
				
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						 <button type="submit" class="btn btn-default">确认更改</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
  </body>
</html>
