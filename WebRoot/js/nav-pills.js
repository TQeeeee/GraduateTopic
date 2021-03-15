//胶囊导航的类型，取值nav-pills、nav-tabs，默认值为nav-tabs
var navsClass = "nav-tabs";
function setNavsClass(title) {
    navsClass = title;
}
//栏目间距
var navSpace=0;
//导航条的像素宽度,取值为整数，默认值640
var navsWidth = 640;
function setNavsWidth(w) {
    navsWidth = w;
}
//当前显示栏目的宽度，默认为0
var currentWidth=0;
//左右滚动箭头宽度,默认值48
var scrollBarWidth = 48;
function setscrollBarWidth(w) {
    scrollBarWidth = w;
}
//左边界，默认为-1
var left = -1;
//右边界，默认为-1
var right = -1;
//当前激活的导航栏
var active = -1;
//左、右移按钮可视化状态
var prior_visible=false;
var next_visible=false;
/*定义1个数组，记录当前显示的菜单信息，每个菜单项包括代码code、编号key、
名称title、链接url、显示状态show:a-激活,s-显示,h-隐藏、是否需要关闭close
*/
var items = new Array();
//添加导航栏目,栏目编号序号取序列号值
function addItem(key, title, url, show,close) {
    var code = key;
    code=key;//不使用序列号，一个菜单只打开1次，code=key
    var item = {
        "code": code,
        "key": key,
        "title": title,
        "url": url,
        "show": show,
        "close":close
    };
    items.push(item);
    return code;
}
//通过代码获取栏目序号，序号从0开始，返回-1表示未查询到。
function indexOfItems(code){
    for(var i=0;i<items.length;i++){
        if(items[i].code==code){
            return i;
        }
    }
    return -1;
}
//添加导航栏
function addNav(key, title, url, show,close) {
    var code;
    //首先在数组中查询是否已经入数组，此时code=key
    var index=indexOfItems(key);
    if(index!=-1){
        //如果新菜单就是当前激活菜单，则直接退出
        if(index==active){
            return;
        }
        //当前active项目失去焦点
        code = items[active].code;
        $("#item-" + code).attr("class", "");
        $("#page-" + code).attr("class", "tab-pane");
        //如果index∈[left,right]则active=index，最后会激动新菜单栏目
        if(index>=left&&index<=right){
            active=index;
        }
        //如果index<left，则显示范围左移
        if(index<left){
            for(var i=index;i<left;i++){
                //左移左边界
                code="#item-"+items[i].key;
                $(code).attr("class","tab-pane");
                //增加显示长度
                currentWidth=currentWidth+$(code).width()+navSpace;
                code="#page-"+items[i].key;
                $(code).attr("class","tab-pane");
            }
            left=index;
            active=index;
            //如果left=0则隐藏左滚动按钮
            if((left==0)&&(prior_visible==true)){
            	prior_visible=false;
                $("#scroll-prior").attr("class", "hidden");
                currentWidth=currentWidth-scrollBarWidth-navSpace;
            }
            //左移右边界
            while(currentWidth>navsWidth){
                code="#item-"+items[right].key;
                //减少显示长度
                currentWidth=currentWidth-$(code).width()-navSpace;
                $(code).attr("class","tab-pane hidden");
                code="#page-"+items[right].key;
                $(code).attr("class","tab-pane hidden");
                right=right-1;
                //如果right不是最右边，则显示右滚动按钮
                if((right<(items.length-1))&&(next_visible==false)){
                    $("#scroll-next").attr("class", "scrollbar");
                	next_visible=true;
                    currentWidth=currentWidth+scrollBarWidth+navSpace;
                }
            }            
        }
        //如果index>right，则显示范围右移
        if(index>right){
            for(var i=index;i>right;i--){
                //右移右边界
                code="#item-"+items[i].key;
                $(code).attr("class","tab-pane");
                //增加显示长度
                currentWidth=currentWidth+$(code).width()+navSpace;
                code="#page-"+items[i].key;
                $(code).attr("class","tab-pane");
            }
            right=index;
            active=index;
            //如果right是最右边，则隐藏右滚动按钮
            if((right==(items.length-1))&&(next_visible==true)){
                $("#scroll-next").attr("class", "hidden");
            	next_visible=false;                
                //减少显示长度
                currentWidth=currentWidth-scrollBarWidth-navSpace;
            }
            //可能有bug
            while(currentWidth>navsWidth){
                //右移左边界
                code="#item-"+items[left].key;
                //减少显示长度
                currentWidth=currentWidth-$(code).width()-navSpace;
                $(code).attr("class","tab-pane hidden");
                code="#page-"+items[left].key;
                $(code).attr("class","tab-pane hidden");
                left=left+1;
                //如果left>0则显示左滚动按钮
                if((left>0)&&(prior_visible==false)){
                    $("#scroll-prior").attr("class", "scrollbar");
                	prior_visible=true;
                    //增加显示长度
                    currentWidth=currentWidth+scrollBarWidth+navSpace;
                }
            }
        }
        //最后激活active项目
        code = items[active].code;
        $("#item-" + code).attr("class", "item active");
        $("#page-" + code).attr("class", "tab-pane active");
        return;
    }   
    //首先添加栏目数据
    var code = addItem(key, title, url, show,close);
    //将菜单添加到导航栏中
    var html = "<li id='item-" + code + "' class='active' role='presentation'><a href='#page-" + code + "' role='tab' data-toggle='pill' id='link-"+code+"'>";
    html = html + title;
    if(close=="y"||close=="Y"){
        var btnClose= "<button class='btn-close light-red'"+"onclick=\"winClose('" + code + "')\"";
        btnClose=btnClose+"><i class='glyphicon glyphicon-remove'></i></button>";
        html=html+btnClose;
    }
    html=html+"</a></li>";
    $('#scroll-next').before(html);
    //增加显示长度
    var itemWidth=$("#item-" + code).width();
    currentWidth=currentWidth+itemWidth+navSpace;
    //设置1个事件
    $("#link-" + code).on('shown.bs.tab',function (e) {
        var activeInfo = $(e.target).text();
        activeInfo = e.target.id;
        activeInfo=activeInfo.substring(5);
        for(var i=0;i<items.length;i++){
            if(items[i].code== activeInfo){
                active=i;
                break;
            }
        }
    });
    //添加响应框架
    html = "<div class='tab-pane active' id='page-" + code + "'>";
    html = html + "<iframe id='frame-" + code + "' name='frame-" + code + "' class='framespace' src='" + url + "' scrolling='auto'>";
    html = html + "</iframe></div>";
    $('#pill-pages').append(html);
    //调整left、right、active的值
    if (items.length == 1) {
        left = 0;
        right = 0;
        active = 0;
    } else {
        //将原激活导航栏失去焦点
        code = items[active].code;
        //显示右边导航条及框架
        $("#item-" + code).attr("class", "");
        $("#page-" + code).attr("class", "tab-pane");
        active = items.length - 1;
        //隐藏右滑动按钮
        if((right<items.length-2)&&(next_visible==true)){
            $("#scroll-next").attr("class", "hidden");
        	next_visible=false;
            currentWidth=currentWidth-scrollBarWidth-navSpace;            
        }
        //right右移并显示
        for (var i = right + 1; i <= items.length - 2; i++) {
            code = items[i].code;
            //显示右边导航条及框架
            $("#item-" + code).attr("class", "");
            //增加显示长度
            currentWidth=currentWidth+$("#item-" + code).width()+navSpace;
            $("#page-" + code).attr("class", "tab-pane");
        }
        //right重置
        //如果显示的栏目项超限则隐藏左边栏目
        right = items.length - 1;
        while (currentWidth>navsWidth) {
            code = items[left].code;
            //减少显示长度
            currentWidth=currentWidth-$("#item-" + code).width()-navSpace;
            $("#item-" + code).attr("class", "hidden");
            $("#page-" + code).attr("class", "hidden");
            left = left + 1;
        }
        if ((left > 0)&&(prior_visible==false)) {
            //显示左滑动按钮，如果原来就显示的可能不显示
            $("#scroll-prior").attr("class", "scrollbar");
        	prior_visible=true;
            //增加显示长度
            currentWidth=currentWidth+scrollBarWidth+navSpace;
        }
    }
}

function switchTab(id) {
    var code;
    if (id == "prior") {
        //左移1项
        left = left - 1;
        code = items[left].code;
        //显示左边导航条及框架
        $("#item-" + code).attr("class", "");
        //增加显示长度
        currentWidth=currentWidth+$("#item-" + code).width()+navSpace;
        $("#page-" + code).attr("class", "tab-pane");
        if ((left == 0)&&(prior_visible==true)) {
            $("#scroll-prior").attr("class", "hidden");
            prior_visible=false;
            //减少显示长度
            currentWidth=currentWidth-scrollBarWidth-navSpace;
        }
        //按长度隐藏right位置的元素
        while(currentWidth>navsWidth){           
            code = items[right].code;
            //减少显示长度
            currentWidth=currentWidth-$("#item-" + code).width()-navSpace;
            $("#item-" + code).attr("class", "hidden");
            $("#page-" + code).attr("class", "tab-pane hidden");
            if((right==items.length-1)&&(next_visible==false)){
                //显示右滚动按钮
                $("#scroll-next").attr("class", "scrollbar");
                next_visible=true;
                //增加显示长度
                currentWidth=currentWidth+scrollBarWidth+navSpace;
            }
            right = right - 1;
        }
        if (active > right) {
            active = right;
            code = items[active].code;
            //显示右边导航条及框架
            $("#item-" + code).attr("class", "item active");
            $("#page-" + code).attr("class", "tab-pane active");
            $("#item-" + code).focus();
        }
    } else {
        right = right + 1;
        code = items[right].code;
        //显示右边导航条栏目及框架
        $("#item-" + code).attr("class", "");
        //增加显示长度
        currentWidth=currentWidth+$("#item-" + code).width()+navSpace;
        $("#page-" + code).attr("class", "tab-pane");
        if ((right == items.length - 1)&&next_visible==true) {
            $("#scroll-next").attr("class", "hidden");
            next_visible=false;
            //减少显示长度
            currentWidth=currentWidth-scrollBarWidth-navSpace;            
        }
        while(currentWidth>navsWidth){ 
            //隐藏left位置的元素
            code = items[left].code;
            currentWidth=currentWidth-$("#item-" + code).width()-navSpace;
            $("#item-" + code).attr("class", "hidden");
            $("#page-" + code).attr("class", "tab-pane hidden");
            if((left==0)&&(prior_visible==false)){
                //显示左滚动按钮
                $("#scroll-prior").attr("class", "scrollbar");
                prior_visible=true;
                currentWidth=currentWidth+scrollBarWidth+navSpace;            
            }
            left = left + 1;
        }
        if (active < left) {
            active = left;
            code = items[active].code;
            //显示右边导航条及框架
            $("#item-" + code).attr("class", "item active");
            $("#page-" + code).attr("class", "tab-pane active");
        }
    }
}

//功能：关闭栏目及框架
function winClose(key) {
    if(confirm("是否确定关闭？")==true){
        var code;
        var index=0;
        //定位index的值
        index=indexOfItems(key);
        //首先取消当前激活栏目
        if(active>=0){
            code = items[active].code;
            $("#item-" + code).attr("class", "");
            $("#page-" + code).attr("class", "tab-pane");
        }
        //首先删除选定TAB页面及框架
        code = "#item-" + key;
        currentWidth=currentWidth-$(code).width()-navSpace;        
        $(code).remove();
        code = "#page-" + key;
        $(code).remove();
        //删除数组中的元素
        items.splice(index,1);
        //调整left、right、active的值
        if(items.length==0){
            //栏目为空
            left=-1;
            right=-1;
            active=-1;
            currentWidth=0;
        }else{
            //如果右边没有栏目则右边界左移1位
            if(right>=items.length){
                right=right-1;
                //左边界酌情同步左移1位
                if(left>0){
                    left=left-1;
                    //如果左边有隐藏栏目，则显示左边栏目
                    code = items[left].code;
                    $("#item-" + code).attr("class", "");
                    currentWidth=currentWidth+$("#item-" + code).width()+navSpace;
                    $("#page-" + code).attr("class", "tab-pane");            
                    //如果左边没有隐藏栏目，则隐藏左滚动按钮
                    if((left==0)&&(prior_visible==true)){
                        $("#scroll-prior").attr("class", "hidden");
                        prior_visible=false;
                        currentWidth=currentWidth-scrollBarWidth-navSpace;            
                    }
                }
            }else{
                //如果右边有隐藏栏目，则显示最右边栏目项，左边不变
                if(right<=(items.length-1)){
                    code = items[right].code;
                    currentWidth=currentWidth+$(code).width()+navSpace;        
                    //显示右边导航条及框架
                    $("#item-" + code).attr("class", "");
                    $("#page-" + code).attr("class", "tab-pane");
                    //如果右边没有隐藏栏目，则隐藏右滚动按钮
                    if((right==(items.length-1))&&(next_visible==true)){
                        $("#scroll-next").attr("class", "hidden");
                        next_visible=false;
                        currentWidth=currentWidth-scrollBarWidth-navSpace;            
                    }                
                }
            }
            //重新激活栏目
            if(active>right){
                active=active-1;
            }
            if(active>=0){
                code = items[active].code;
                $("#item-" + code).attr("class", "item active");
                $("#page-" + code).attr("class", "tab-pane active");
            }
        }
    }
}
/*
* 显示下拉菜单
*/
function showMenu(button) {
    var buttonID = $(button).attr("id").substring(7);
    $(button).parent().toggleClass('open');
    var html = "";
    // 折叠已经打开的下拉菜单
    var menu;
    var id;
    if ($("#menulist" + buttonID).attr("class") == "hidden") {
        for (var i = 1; i <= 150; i++) {
            if (i < 100) {
                id = i;
            } else {
                id = 'a' + (i - 100);
            }
            menu = "#menulist" + id;
            $(menu).attr("class", "hidden");
            menu = "#menubar" + id;
            if (buttonID != id) {
                $(menu).parent().removeClass('open');
            }
        }
        $("#menulist" + buttonID).attr("class", "menu-main");
    } else {
        $("#menulist" + buttonID).attr("class", "hidden");
    }
}