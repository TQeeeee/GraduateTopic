/**
 * 防止用户多次点击按钮造成重复提交
 * 节流函数，通过控制每次事件执行的时间间隔控制短时间多次执行方法
 * handler:要执行的方法
 * wait：每次点击事件执行的时间间隔(毫秒)
 */



function throttle(handler, wait) {
 
    var lastTime = 0;
 
    return function () {
    
        var nowTime = new Date().getTime();
 
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }
 
    }
}
 

