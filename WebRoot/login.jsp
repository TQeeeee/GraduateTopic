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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>毕业设计选题系统</title>
<link rel="shortcut icon" type="image/x-icon"
	href="<%=request.getContextPath()%>/images/favicon.ico" />
<link rel="stylesheet" type="text/css" href="css/login.css">
<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
</head>
<body>
	<div class="outer">
		<div class="frame">
			<div class="win-top">毕业设计选题系统</div>
			<div class="win-title">用户登录</div>
			<div class="win-mid">
				<div id="frameform" class="frameform">
					<form id="userlogin" method="post" action="userloginLoading.action">
						<div id="frameform">
							<table class="login-container" align="center">
								<caption class="table-caption">请输入您的登录信息</caption>
								<tbody>
									<tr class="row_middle_editor">
										<td class="input_data"><input type="text"
											class="input_text" placeholder="用户名称" name="username"
											id="username" autofocus required /></td>
									</tr>
									<tr class="row_middle_editor">
										<td class="input_data"><input type="password"
											class="input_text" placeholder="用户密码" id="password"
											name="password" required /></td>
									</tr>
									<tr class="row_middle_editor">
										<td class="btn"><button type="submit"
												 id="button_ok">登 录</button>
											&nbsp;&nbsp;&nbsp;&nbsp;
											<button type="reset" id="button_reset">重 置</button></td>
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
	<script type="text/javascript">
		$(document).ready(
				function() {
					if (document.getElementById('error').value != null
							&& document.getElementById('error').value != "") {
						alert(document.getElementById('error').value);
					}
				});
	</script>
</body>
</html>