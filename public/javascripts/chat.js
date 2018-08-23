$(document).ready(function () {

    var socket = io();
    // var username = Cookies.get('id');
    var username = sessionStorage.getItem('id');
    //聊天记录
    var chatHistory = new Array();
    //创建聊天气泡
    var createMessageBubble = function (isSend, message) {
        messageBubble = `
                        <div class="${isSend ? 'send' : 'response'}-message">
                            <img class="head">
                            <div class="message-bubble">
                                <div class="message wordwrap">${message}</div>
                            </div>
                        </div>
                        `
        $('.chat-history-container').append(messageBubble);
    }
    //通知系统上线
    var online = function () {
        socket.emit('online', { 'username': username });
    }

    //其他用户上线之后的提示
    var createUserSession = function (data) {
        var userElement = `<li class="list-group-item list-group-item-action" session="${data.username}" id="auser">
                            <img class="head"><a class="nickname">${data.username}</a>
                            <span class="badge badge-primary badge-pill"></span>
                            </li>`
        $('#userlist').append(userElement);
    }
    //下线提示
    var removeUserSession = function (data) {
        $(`[session=${data.username}]`).remove();
    }

    var setChatHistory = function (user, data) {
        var chatHistory = JSON.parse(sessionStorage.getItem(user)) || [];
        chatHistory.push(data);
        sessionStorage.setItem(user, JSON.stringify(chatHistory));
    }

    var getChatHistory = function (user) {
        return (JSON.parse(sessionStorage.getItem(user)) || []);
    }

    var fileToBase64 = function(file){
        console.log(file);

        var reader = new FileReader();

        reader.onload = function () {
            var dataURL = reader.result;
            console.log(dataURL);
            //return dataURL;
            createMessageBubble(true, `<img src=" ${dataURL}" style="max-width: 370px;"/>`);
        };

        reader.readAsDataURL(file);
    }

    if (socket)
        online();
    //上线用户提醒
    socket.on('online', function (data) {
        createUserSession(data);
    });
    //载入上线的用户
    socket.on('onlineuser', function (data) {
        $('#userlist').empty();
        let onlineUsers;
        if (data.userlist.length > 0)
            onlineUsers = data.userlist.filter(user => {
                return user != username;
            });
        else
            onlineUsers = [];
        for (var user in onlineUsers) {
            createUserSession({ 'username': data.userlist[user] });
        }
    });
    //下线提醒
    socket.on('offline', function (data) {
        removeUserSession(data);
    });
    //收到消息，保存消息
    socket.on('get', function (data) {
        //收到消息，如果当前在该会话中则直接添加消息气泡，否则添加未读气泡
        if ($('#auser.active').attr('session') == data.senduser)
            createMessageBubble(false, data.message);
        else {
            var countBubble = $(`#auser[session='${data.senduser}'] span`);
            var messageCount = countBubble.text();
            if (messageCount == '' || messageCount.length == 0)
                countBubble.text('1');
            else
                countBubble.text(++messageCount + '');
        }
        setChatHistory(data.senduser, { 'message': data.message, 'isSend': false });
        // chatHistory[data.senduser].push({'message':data.message, 'isSend': false});
    });

    //测试
    socket.on('test', function (data) {
        console.log(data);

        var reader = new FileReader();

        reader.onload = function () {
            var dataURL = reader.result;
            console.log(dataURL);
            createMessageBubble(true, `<img src="data:image/gif;base64, ${dataURL}" style="max-width: 200px;"/>`);
        };

        reader.readAsArrayBuffer();
        
    });



    //点击用户，切换聊天会话
    $('#userlist').delegate('li', 'click', function () {
        $('#userlist li').removeClass('active');
        $(this).addClass('active');
        // $(`#auser[session='${data.senduser}'] span`).text('');
        $(this).children('span').text('');
        var touser = $(this).attr('session');

        $('.chat-history-container').empty();
        var sessionHistory = getChatHistory(touser);
        for (var i in sessionHistory) {
            createMessageBubble(sessionHistory[i].isSend, sessionHistory[i].message);
        }
    });
    //发送消息
    $('#enter').on('click', function () {
        var message = $('#messagebox').val();
        var sessionuser = $('#auser.active').attr('session');
        //没选择用户，不发送
        if (!sessionuser || message == '' || message.length == 0) {
            //return false;
            //socket.emit('test', $('#file')[0].files[0]);
            fileToBase64($('#file')[0].files[0]);
        } else {
            createMessageBubble(true, message);
            var data = { 'senduser': username, 'touser': sessionuser, 'message': message };
            socket.emit('send', data);
            setChatHistory(sessionuser, { 'message': message, 'isSend': true });
            $('#messagebox').val('');
        }
    });





});