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
<!-- <link rel="stylesheet" type="text/css" href="css/public.css"> -->
<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
 <script type="text/javascript" src="js/public.js"></script>
</head>

<style>
	.frame-inbox{
		margin:0 auto;
		margin-top:20px;
		margin-left:56px;
	}
	
/******
*工具类css start
*******/
.mg-t-10{
	margin-top:10px;
}
.mg-t-20{
	margin-top:20px;
}
.mg-b-10{
	margin-bottom:10px;
}
.mg-b-20{
	margin-bottom:20px;
}
.mg-l-10{
	margin-left:10px;
}
.mg-l-20{
	margin-left:20px;
}
.mg-l-30{
	margin-left:30px;
}
.mg-l-40{
	margin-left:40px;
}
.mg-r-10{
	margin-right:10px;
}
.mg-r-20{
	margin-right:20px;
}
.bg-white{
	background:white;
}
/******
*工具类css end
*******/
</style>
<body>
	<div class="outer">
		<div class="frame">
			<div class="win-top">毕业设计选题系统</div>
			<div class="win-title">修改密码</div>
			<div class="win-mid">
				<div id="frameform" class="frameform col-sm-12">
					<form class="form-inline" role="form">
						<div class="frame-inbox">
							<div class="form-group">
							<label for="oldPassword" class="col-sm-2 control-label form-inline mg-l-30">原密码：</label>
							<input type="password" class="form-control" id="oldPassword" />
							</div>
							<div class="form-group mg-t-10">
								 <label for="newPassword" class="col-sm-2 control-label form-inline mg-l-30">新密码：</label>
								 <input type="password" class="form-control" id="newPassword" />
							</div>
							<div class="form-group mg-t-10">
								<label for="newPasswordCheck" class="col-sm-2 control-label form-inline">确认新密码：</label>
								<input type="password" class="form-control" id="newPasswordCheck" />
							</div>
							<button class="btn btn-info" type="button" onclick="isPwdRep('updatePasswordSettingsAction.action')">更改</button>
						</div>
						
				
						 
					</form>
				</div>
			</div>
			<div class="win-footer">
				南昌大学软件学院<br /> <span>TEL&nbsp;:&nbsp;0791-88305113</span>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		 var isPwdRep=function(url){
    
    	let oldPassword=$("#oldPassword").val();
    	let newPassword=$("#newPassword").val();
    	let newPasswordCheck=$("#newPasswordCheck").val();
    	
    	if(isEmpty(oldPassword) || isEmpty(newPassword) || isEmpty(newPasswordCheck)){
    		alert("部分输入不能为空!!!");
    		return false; 
    	}
    	
    	if(newPassword===newPasswordCheck){
    		let jsondata={
    			"oldPassword":oldPassword,
    			"newPassword":newPassword,
    			"newPasswordCheck":newPasswordCheck
    			
    		}
    		let msg=sendMessageSync(url,jsondata);
    		if(msg=="FAILED"){
    			alert("修改失败!服务器返回FAILED!!");
    			return ;
    		}else if(msg=="成功1条"){
    			alert("修改成功!即将跳转至登录页面....");
    			//需要增加一个延时函数
    			setInterval(document.location.href='login.jsp',500);
    			//document.location.href='login.jsp';
    			return ;
    		
    		}else{
    			alert("修改失败!因为"+msg);
    			return ;
    		}
    	
    	}else{
    		alert("两次密码不一致!请重新输入!!");
    	}
    }
	</script>
</body>
</html>
