<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="pragram" content="no-cache">
<meta http-equiv="cache-control" content="no-cache,must-revalidate">
<meta http-equiv="expires" content="0">
<link rel="Stylesheet" type="text/css"
	href="bootstrap3.2.0/css/bootstrap.css" />
<link href="css/font-awesome.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/menu_left.css">
<link rel="Stylesheet" type="text/css" href="css/leftmenu.css" />
<link rel="Stylesheet" type="text/css" href="Font-face/meteocons.css" />

<script type="text/javascript" src="jQuery2.1.1/jquery-2.1.1.min.js"></script>
</head>
<body>
	<ul id="accordion" class="accordion">
		<li>
			<div class="link active-menu" id="menubar10" onclick="showMenu(this)">
				<i class="glyphicon glyphicon-user light-red"></i>&nbsp;系统管理 <i
					class="glyphicon glyphicon-chevron-down"> </i>
			</div>
			<div class="hidden" id="menulist10">
				<ul class="submenu">
					<li class="show" id="menu11"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu11','角色管理','verifyLoading.action?method=role_manage','a','y')">
							&nbsp;角色管理</a>
					</li>
					<li class="show" id="menu12"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu12','角色授权','verifyLoading.action?method=role_privs','a','y')">
							&nbsp;角色授权</a>
					</li>
					<li class="show" id="menu13"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu13','用户管理','verifyLoading.action?method=user_manage','a','y')">
							&nbsp;用户管理</a>
					</li>
					<li class="show" id="menu14"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu14','用户授权','verifyLoading.action?method=user_role','a','y')">
							&nbsp;用户授权</a>
					</li>
					<li class="show" id="menu15"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu15','任务设置','verifyLoading.action?method=user_role','a','y')">
							&nbsp;任务设置</a>
					</li>
				</ul>
			</div></li>
		<li>
			<div class="link active-menu" id="menubar20" onclick="showMenu(this)">
				<i class="glyphicon glyphicon-cog green"></i>&nbsp;选题申报<i
					class="glyphicon glyphicon-chevron-down"></i>
			</div>
			<div class="hidden" id="menulist20">
				<ul class="submenu">
					<li class="show" id="menu21"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu21','学生申报','verifyLoading.action?method=bas_sttype','a','y')">
							&nbsp;学生申报</a>
					</li>
					<li class="show" id="menu22"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu22','老师申报','verifyLoading.action?method=bas_protocol','a','y')">
							&nbsp;老师申报</a>
					</li>
					<li class="show" id="menu23"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu23','教师选题','verifyLoading.action?method=bas_managerunit','a','y')">
							&nbsp;教师选题</a>
					</li>
					<li class="show" id="menu27"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu27','学生选题','verifyLoading.action?method=bas_station','a','y')">
							&nbsp;学生选题</a>
					</li>
					<li class="show" id="menu28"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu28','师生互认','verifyLoading.action?method=query_station','a','y')">
							&nbsp;师生互认</a>
					</li>
				</ul>
			</div></li>
		<li>
			<div class="link active-menu" id="menubar30" onclick="showMenu(this)">
				<i class="glyphicon glyphicon-transfer light-red"></i>&nbsp;选题评审<i
					class="glyphicon glyphicon-chevron-down"></i>
			</div>
			<div class="hidden" id="menulist30">
				<ul class="submenu">
					<li class="show" id="menu31"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu31','评审分配','verifyLoading.action?method=rtu_message','a','y')">
							&nbsp;评审分配</a>
					</li>
					<li class="show" id="menu32"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu32','选题评审','verifyLoading.action?method=msg_rain_hour','a','y')">
							&nbsp;选题评审</a>
					</li>
					<li class="show" id="menu33"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu33','评审结果','verifyLoading.action?method=msg_water_hour','a','y')">
							&nbsp;评审结果</a>
					</li>
				</ul>
			</div></li>
		<li>
			<div class="link active-menu" id="menubar40" onclick="showMenu(this)">
				<i class="glyphicon glyphicon-tasks green"></i>&nbsp;设计开题<i
					class="glyphicon glyphicon-chevron-down"></i>
			</div>
			<div class="hidden" id="menulist40">
				<ul class="submenu">
					<li class="show" id="menu41"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu41','报告提交','verifyLoading.action?method=task_set','a','y')">
							&nbsp;报告提交</a>
					</li>
					<li class="show" id="menu42"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu42','报告分配','verifyLoading.action?method=task_query','a','y')">
							&nbsp;报告分配</a>
					</li>
					<li class="show" id="menu43"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu43','报告评审','verifyLoading.action?method=task_query','a','y')">
							&nbsp;报告评审</a>
					</li>
					<li class="show" id="menu44"><a
						class="glyphicon glyphicon-hand-right"
						onclick="addNav('menu44','报告结果','verifyLoading.action?method=task_query','a','y')">
							&nbsp;报告结果</a>
					</li>
				</ul>
			</div></li>
	</ul>
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							var even = "light-red";
							var odd = "green";
							//开始读取菜单项
							$
									.ajax({
										url : 'get_menusInitAction.action',
										type : 'post',
										datatype : 'json',
										success : function(data) {
											// 将所有返回数据存放在页面
											var json = $.parseJSON(data);
											var main = json.mainmenu;
											var sub;
											var mainmenu = "";
											var submenu = "";
											var line = "";
											for ( var i = 0; i < main.length; i++) {
												mainmenu = mainmenu
														+ "<li><div id='menubar"
														+ main[i].code
														+ "' onclick='showMenu(this)' class='link active-menu'>";
												if (i % 2 == 0) {
													mainmenu = mainmenu
															+ "<i class='glyphicon "+main[i].css+" "+even+"'></i>&nbsp;"
															+ main[i].title;
												} else {
													mainmenu = mainmenu
															+ "<i class='glyphicon "+main[i].css+" "+odd+"'></i>&nbsp;"
															+ main[i].title;
												}
												mainmenu = mainmenu
														+ "<i class='glyphicon glyphicon-chevron-down'></i></div>";
												mainmenu = mainmenu
														+ "<div id='menulist"+main[i].code+"' class='hidden'><ul class='submenu'>";
												sub = main[i].submenu;
												submenu = "";
												for ( var n = 0; n < sub.length; n++) {
													submenu = submenu
															+ "<li id='menu"+sub[n].code+"' class='show'><a onclick=\"addNav('menu"
															+ sub[n].code
															+ "','"
															+ sub[n].title
															+ "','"
															+ sub[n].url
															+ "','a','y')\"";
													submenu = submenu
															+ " class='glyphicon "+sub[n].css+"'> &nbsp;"
															+ sub[n].title
															+ "</a></li>";
												}
												mainmenu = mainmenu + submenu
														+ "</ul></div></li>";
											}
											mainmenu = mainmenu + "</ul>";
											$("#accordion").html(mainmenu);
										}
									});
						});
	</script>
</body>
</html>
