var fs = require('fs');

//用户和socket的对照表
var userdict = new Array();
//在线用户表
var onlinedict = new Set();

var bindUser = function(userName, socket){
    userdict[userName] = socket;
}

var findSocketByUser = function(userName){
    return userdict[userName].id;
}

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        //上线绑定socketid和用户,广播给其他用户
        socket.on('online', function(data){
            console.log(data.username+' online');
            bindUser(data.username, socket);
            onlinedict.add(data.username);
            // io.emit('online', {'username': data.username});
            //载入已经上线的列表
            socket.emit('onlineuser',{'userlist': Array.from(onlinedict)});
            //广播给自己之外的用户
            socket.broadcast.emit('online', {'username': data.username});
        });
        

        socket.on('disconnect', function () {
            //下线之后删除用户
            for(var user in userdict){
                if(socket.id === userdict[user].id){
                    socket.broadcast.emit('offline', {'username': user});
                    onlinedict.delete(user);
                    console.log(user+' offline');
                }
            }
            // socket.broadcast.emit('onlineuser',{'userlist': onlinedict});
            
        });

        //传送消息
        socket.on('send', function(data){
            socket.emit('sent', data);
            socket.to(findSocketByUser(data.touser)).emit('get', data);
            console.log(data.senduser+' send "'+data.message+'" to '+data.touser);
        });

        socket.on('test', function(data){
            console.log(data);
            // var buf = Buffer.from(data);
            // var picStream = fs.createWriteStream('pic.png');
            // picStream.write(data);
            // picStream.end();
            socket.emit('test', data);
        });
        
    });
};