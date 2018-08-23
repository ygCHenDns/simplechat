$(document).ready(function(){

    var socket = io();
    var username = Cookies.get('id');

    $('#logout').on('click',function(e){
        Cookies.remove('jwt');
        Cookies.remove('id');
        window.location.href='/';
    });

    $('#socketform').on('submit',function(){
        socket.emit('get', '{'+username+'}:'+$('#edittext').val());
        $('#edittext').val('');
        return false;
    });

    socket.on('get', function(msg){
        $('#msgbox').append($('<li>').text(msg));
    });
});