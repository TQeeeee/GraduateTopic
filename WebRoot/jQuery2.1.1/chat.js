var ws;//Web socket对象
var SocketCreated = false;//Web socket对象是否创建标志
var isUserloggedout = false;//是否注销标志

function lockOn(str) {
    var lock = document.getElementById('skm_LockPane');
    if (lock)
        lock.className = 'LockOn';
    lock.innerHTML = str;
}

function lockOff() {
    var lock = document.getElementById('skm_LockPane');
    lock.className = 'LockOff';
}

function ToggleConnectionClicked() {
    //Web socket连接/断开
    if (SocketCreated && (ws.readyState == 0 || ws.readyState == 1)) {
        //如果已经连接，则断开连接
        SocketCreated = false;
        isUserloggedout = true;
        ws.close();
    } else {
        var Sperker = document.getElementById("UserID");
        if (Sperker == null || Sperker.value == "none") {
            Log("请登录 ...<a href=\"login.html\">重新登录</a>");
        } else {
            //如果未建立连接则创建
            Log("准备连接到聊天服务器 ...");
            try {
                if ("WebSocket" in window) {
                    ws = new WebSocket("ws://" + document.getElementById("Connection").value);
                }
                else if ("MozWebSocket" in window) {
                    ws = new MozWebSocket("ws://" + document.getElementById("Connection").value);
                }

                SocketCreated = true;
                isUserloggedout = false;
            } catch (ex) {
                Log(ex, "ERROR");
                return;
            }
            document.getElementById("ToggleConnection").innerHTML = "断开";
            ws.onopen = WSonOpen;
            ws.onmessage = WSonMessage;
            ws.onclose = WSonClose;
            ws.onerror = WSonError;
        }
    }
};


function WSonOpen() {
    Log("连接已经建立。", "OK");
    $("#SendDataContainer").show();
    ws.send("login:" + document.getElementById("UserID").value);
};

function WSonMessage(event) {
    Log(event.data);
};

function WSonClose() {
    if (isUserloggedout)
        Log("【" + document.getElementById("UserID").value + "】离开了聊天室！");
    document.getElementById("ToggleConnection").innerHTML = "连接";
    $("#SendDataContainer").hide();
};

function WSonError() {
    Log("远程连接中断。", "ERROR");
};


function SendDataClicked() {
    if (document.getElementById("DataToSend").value.trim() != "") {
        ws.send("%$" + document.getElementById("UserID").value + "%$" + document.getElementById("DataToSend").value);
        document.getElementById("DataToSend").value = "";
    }
};


function Log(Text, MessageType, Id) {
    var lstMsg = Text.split("%$");
    var speaker = "系统消息";
    var sText = Text;
    if (lstMsg.length > 1) {
        speaker = lstMsg[1];
        sText = lstMsg[2];
    }

    var sMsg = "<div class=\"row\"><div class=\"col-md-3 col-lg-3 text-right\"></div>";
    if (speaker == "系统消息") {
        sMsg += "<div class=\"col-xs-12 col-md-6 col-lg-6  col-sm-12 text-right\">";
        sMsg = sMsg + "<table  style=\"width:100%;\"><tr>"
        sMsg = sMsg + "<td style=\"padding: 16px 24px 16px 16px; background-image: url('images/popover_right.png');";
        sMsg = sMsg + " background-repeat: no-repeat; background-size: 100% 100%; text-align: center;vertical-align: middle; width: 75%;\">";
        if (MessageType == "OK") {
            sMsg = sMsg + "<span style='color: green;'>" + sText + "</span>";
        } else {
            if (MessageType == "ERROR") {
                sMsg = sMsg + "<span style='color: red;'>" + sText + "</span>";
            } else {
                sMsg = sMsg + sText;
            }
        }
        sMsg = sMsg + "</td><td class=\"text-left\" style=\"padding: 8px; margin: 0; vertical-align: middle; width: 25%;\"><span class=\" label-warning\">" + speaker + "</span>";
    }
    else {
        sMsg += "<div class=\"col-xs-12 col-md-6 col-lg-6  col-sm-12 text-center\">";
        sMsg += "<table  style=\"width:100%;\"><tr>";
        sMsg = sMsg + "<td class=\"text-right\" style=\"padding: 8px; margin: 0; vertical-align: middle; width: 25%;text-align:right;\"><span class=\" label-primary\" >" + speaker + "</span></td>";
        sMsg += "<td style=\"padding: 16px 24px 16px 16px; background-image: url('images/popover_left.png');";
        sMsg = sMsg + " background-repeat: no-repeat; background-size: 100% 100%; text-align: center;vertical-align: middle; width: 75%;\">";
        sMsg = sMsg + sText;
    }

    sMsg = sMsg + "</td></tr></table></div>";
    sMsg += "<div class=\"col-md-3 col-lg-3 text-right\"></div></div>";
    ShowLog(sMsg, "LogContainer");
};

function ShowLog(Text, Id) {
    document.getElementById(Id).innerHTML = document.getElementById(Id).innerHTML + Text + "<br />";
    var LogContainer = document.getElementById(Id);
    LogContainer.scrollTop = LogContainer.scrollHeight;
    var e_top = LogContainer.scrollHeight;
    var pos = document.body.scrollHeight;
    window.scrollTo(0, 10240);    
}

$(document).ready(function() {
    $("#SendDataContainer").hide();
    var WebSocketsExist = true;
    try {
        var dummy = new WebSocket("ws://localhost:8989/test");
    } catch (ex) {
        try {
            webSocket = new MozWebSocket("ws://localhost:8989/test");
        }
        catch (ex) {
            WebSocketsExist = false;
        }
    }

    if (WebSocketsExist) {
        Log("您的浏览器支持WebSocket. 您可以尝试连接到聊天服务器!", "OK");
        //document.getElementById("Connection").value = "219.220.30.104:4141/chat";
    } else {
        Log("您的浏览器不支持WebSocket。请选择其他的浏览器再尝试连接服务器。", "ERROR");
        //document.getElementById("ToggleConnection").disabled = true;
    }

    $("#DataToSend").keypress(function(evt) {
        if (evt.keyCode == 13) {
            $("#SendData").click();
            evt.preventDefault();
        }
    })

    ToggleConnectionClicked();
});

function clearmsg() {
    var LogContainer = document.getElementById("LogContainer");
    var sMsg = "<br />";
    document.getElementById("LogContainer").innerHTML = sMsg; ;
}

function send_msg() {
    var LogContainer = document.getElementById("LogContainer");
    var b_top = LogContainer.scrollHeight;
    var txtMsg = document.getElementById("DataToSend");
    var sMsg = "<div class=\"row\"><div class=\"col-md-3 col-lg-3 text-right\"></div>";
    sMsg += "<div class=\"col-xs-12 col-md-6 col-lg-6  col-sm-12 text-right\"><table  style=\"width:100%;\"><tr><td style=\"padding: 16px 24px 16px 16px; background-image: url('images/popover_right.png');";
    sMsg = sMsg + " background-repeat: no-repeat; background-size: 100% 100%; text-align: left;vertical-align: middle; width: 70%;\">";
    sMsg = sMsg + txtMsg.value;
    sMsg = sMsg + "</td><td class=\"text-left\" style=\"padding: 8px; margin: 0; vertical-align: middle; width: 30%;\"><span class=\" label-primary\">：邹玲助理</span>";
    sMsg = sMsg + "</td></tr></table></div>";
    sMsg += "<div class=\"col-md-3 col-lg-3 text-right\"></div></div>"
    //alert(sMsg);
    document.getElementById("LogContainer").innerHTML = document.getElementById("LogContainer").innerHTML + sMsg;
    var e_top = LogContainer.scrollHeight;
    var pos = document.body.scrollHeight;
    window.scrollTo(0, 10240);

}
