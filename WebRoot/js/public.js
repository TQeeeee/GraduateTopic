function set_in_date() {
	if ($("#time_in_s").val().length == 10) {
		$("#time_in_e").val($("#time_in_s").val());
		$("#time_in_e").focus();
	}
}

function trimOnlyOne(src) {
	var r = /\s+/g;
	src = src.replace(r, ' ');
	src = src.trim();
	return src;
}

function printarea(csspath) {
	// sprnstr: 设置打印开始区域
	// eprnstr: 设置打印结束区域
	var sprnstr = "<!--startlist-->";
	var eprnstr = "<!--endlist-->";
	if (confirm('确定打印吗？')) {
		bdhtml = window.document.body.innerHTML;// 获取当前页的html代码
		// alert(bdhtml);
		prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); // 从开始代码向后取html
		// alert(prnhtml);
		prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));// 从结束代码向前取html
		// alert(prnhtml);
		var win = window.open('', 'mywin', '');
		var css = '<link rel="stylesheet" type="text/css" href="' + csspath
				+ '">';
		$(win.document).find("head").append(css);
		$(win.document).find("body").append(prnhtml);
		win.print();
		win.close();
	}
}

function print_area(sprnstr, eprnstr, csspath) {
	// sprnstr: 设置打印开始区域
	// eprnstr: 设置打印结束区域
	// var sprnstr="<!--startlist-->";
	// var eprnstr="<!--endlist-->";
	if (confirm('确定打印吗？')) {
		bdhtml = window.document.body.innerHTML;// 获取当前页的html代码
		// alert(bdhtml);
		prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); // 从开始代码向后取html
		// alert(prnhtml);
		prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));// 从结束代码向前取html
		// alert(prnhtml);
		var win = window.open('', 'mywin', '');
		var css = '<link rel="stylesheet" type="text/css" href="' + csspath
				+ '">';
		$(win.document).find("head").append(css);
		$(win.document).find("body").append(prnhtml);
		win.print();
		win.close();
	}
}

/* 显示遮罩层 */
function showOverlay() {
	$("#overlay").height(pageHeight());
	$("#overlay").width(pageWidth());

	// fadeTo第一个参数为速度，第二个为透明度
	// 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
	$("#overlay").fadeTo(200, 0.5);
}

/* 隐藏覆盖层 */
function hideOverlay() {
	$("#overlay").fadeOut(200);
}

/* 当前页面高度 */
function pageHeight() {
	return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
	return document.body.scrollWidth;
}

/*
 * 遮罩的目的无非让人无法操作内容，突出提示框，而提示框可参考上面的制作， z-index比遮罩层更高便可。主要问题是，如何控制提示框在浏览器居中
 */

/* 定位到页面中心 */
function adjust(id) {
	var w = $(id).width();
	var h = $(id).height();

	var t = scrollY() + (windowHeight() / 2) - (h / 2);
	if (t < 0)
		t = 0;

	var l = scrollX() + (windowWidth() / 2) - (w / 2);
	if (l < 0)
		l = 0;

	$(id).css({
		left : l + 'px',
		top : t + 'px'
	});
}

// 浏览器视口的高度
function windowHeight() {
	var de = document.documentElement;

	return self.innerHeight || (de && de.clientHeight)
			|| document.body.clientHeight;
}

// 浏览器视口的宽度
function windowWidth() {
	var de = document.documentElement;

	return self.innerWidth || (de && de.clientWidth)
			|| document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
	var de = document.documentElement;

	return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

/* 浏览器水平滚动位置 */
function scrollX() {
	var de = document.documentElement;

	return self.pageXOffset || (de && de.scrollLeft)
			|| document.body.scrollLeft;
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

/**
 * 发送数据
 * @param url  路径
 * @param data 发送的数据
 * @return [description]
 */
/**
 * 同步发送数据
 * @param url 发送路径
 * @param data 发送的数据
 * return  成功  msg="ok"  失败  msg="fail"
 **/
function sendMessageSync(url,data){
    var msg="FAILED";
    if((url==null) || (url=="")) {
        console.log("发送路径url为空！位置-js-sendMessageSync()");
        return ;
    }
    $.ajax({
        url:url,
        type:"post",
        async:false, //等发送完并接受返回参数后再执行后面的,必须有
         //
        dataType:"json",
        data:{"keyword":JSON.stringify(data)},
        success:function (res) {
            //TODO:此处应该直接返回res,而不是res.msg,因为这样无法接受返回的其他附带信息
            //msg=res.msg;
        	var json = $.parseJSON(res);
			// 获取记录数量,reccount>0操作成功,reccount=-1操作失败
			var reccount = parseInt(json.reccount);
			if(reccount>0){
				 msg="成功"+reccount+"条";
			}else{
				msg="FAILED";
			}
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // /*弹出jqXHR对象的信息*/
            // alert(jqXHR.responseText);
            // alert(jqXHR.status);
            // alert(jqXHR.readyState);
            // alert(jqXHR.statusText);
            // /*弹出其他两个参数的信息*/
            // alert(textStatus);
            // alert(errorThrown);
            console.warn("发送错误：位置-js-sendMessageSync()");
            msg="FAILED";
            return false;
        }
    });
    return msg;
}
/**
 * 异步发送数据
 * 实际发送数据为异步发送,但是利用Deferred来模拟同步发送。
 * @param url 发送路径
 * @param data 发送的数据
 * return  成功 结果
 **/
function sendMessageSyncByDeferred(url,data){
    if((url==null) || (url=="")) {
        console.log("发送路径url为空！位置-js-sendMessageSync()");
        return ;
    }
    var deferred=$.Deferred();
    $.ajax({
        url:url,
        type:"post",
        async:true,
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        data:{"keyword":JSON.stringify(data)},
        success:function (res) {
            deferred.resolve(res);//这里的res数据会传
            // 到$.when(sendMessageSyncByDeferred()).done(function(res) res里面
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn("发送错误：位置-js-sendMessageSyncByDeferred()");
            let res={"msg":"fail"};
            deferred.resolve(res);
        }
    });
    return deferred.promise();
}

/**
 * 检测字符串是否为空
 */
var isEmpty=function(str){
	return (str == null || str==undefined || str==" " || str=="");
}
