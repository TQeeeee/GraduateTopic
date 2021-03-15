<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <link rel="shortcut icon" type="image/x-icon"
	href="<%=request.getContextPath()%>/images/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="css/login.css">
    
    <script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/button_control.js"></script>
	<script type="text/javascript" src="js/public.js"></script>

  </head>
  
  <body>
   	<div class="outer">
		<div class="frame">
			<div class="win-top">毕业设计选题系统</div>
			<div class="win-title">用户登录</div>
			<div class="win-mid">
				<div id="frameform" class="frameform">
					<form id="userlogin">
						<div id="frameform">
							<table class="login-container" align="center">
								<caption class="table-caption">请输入您的登录信息</caption>
								<tbody>
									<tr class="row_middle_editor">
										<td class="input_data"><input type="Password"
											class="input_text" placeholder="旧密码" 
											id="oldPassword"  name="password" autofocus required /></td>
									</tr>
									<tr class="row_middle_editor">
										<td class="input_data"><input type="password"
											class="input_text" placeholder="新密码" id="newPassword"
											name="password" required /></td>
									</tr>
									<tr class="row_middle_editor">
										<td class="input_data"><input type="password"
											class="input_text" placeholder="确认新密码" id="newPasswordCheck"
											name="password" required /></td>
									</tr>
									<tr class="row_middle_editor">
										<td class="btn"><a class="btn btn-default" href="javascript:void(0);" onclick="isPwdRep('updatePasswordSettingsAction.action')">确认更改</a></td>
									</tr>
								</tbody>
							</table>

						</div>
						<input type="hidden" name="error" id="error"
							value="<s:property value="error"/>">
					</form>
				</div>
			</div>
			<div class="win-footer">
				南昌大学软件学院<br /> <span>TEL&nbsp;:&nbsp;0791-88305113</span>
			</div>
		</div>
	</div>
  </body>
</html>
