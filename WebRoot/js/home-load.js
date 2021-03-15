$(document).ready(
function(){
//加载页眉页面
  $("#footer-page").load("html/footer.htm");
//加载页脚页面
  $("#header-page").load("html/header.html");
//获取浏览器宽度，计算右边工作区的宽度，修改css样式
  var right_width=window.screen.width-240;	
  $('#main-right').css("width",right_width);
  //设置右边工作区的总宽度
  setNavsWidth(right_width);	
//添加默认TAB页
  addNav('homepage','首页','homepage.htm','a','n');
});