<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>毕业设计选题系统</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="shortcut icon" type="image/x-icon"
	href="<%=request.getContextPath()%>/images/favicon.ico" />
<link rel="stylesheet" type="text/css"
	href="bootstrap-3.2.0/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="css/public.css" />
<link href="css/homepage.css" type="text/css" rel="stylesheet" />
<link href="css/nav-pills.css" type="text/css" rel="stylesheet" />
</head>
<body>
	<header class="container-fluid" id="header-page"> </header>
	<div class="hidden" id="slider"></div>
	<div id="content" class="container-fluid">
		<div id="main-left">
			<div id="left-menu" class="panel panel-primary">
				<%@include file="menu_left.jsp"%>
			</div>
		</div>
		<div id="main-right">
			<ul id="pill-tabs" class="nav nav-tabs">
				<li id="scroll-prior" class="scrollbar hidden"><a
					onclick="switchTab('prior')" class="scrollbar"> <i
						class="glyphicon glyphicon-backward green"></i> </a></li>
				<li id="scroll-next" class="scrollbar hidden"><a
					onclick="switchTab('next')"> <i
						class="glyphicon glyphicon-forward green"></i> </a></li>
			</ul>
			<div id="pill-pages" class="tab-content"></div>
		</div>
	</div>
	<footer id="footer-page"> </footer>
	<input type="hidden" id="username" value="<s:property value="username"/>">
	<input type="hidden" id="userpower" value="<s:property value="userpower"/>">
	<script type="text/javascript">	
		$(document).ready(function() {
			var username = $("#username").val().trim();
			if (username == null || username.length == 0) {
				alert("你没有正常登录，请先登录！");
				location.href = "login.jsp";
			}
		});
	</script>
	<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.js"></script>
	<script type="text/javascript"
		src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/nav-pills.js"></script>
	<script type="text/javascript" src="js/home-load.js"></script>
</body>
</html>
