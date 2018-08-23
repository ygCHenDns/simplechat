$(document).ready(function(){
    baseUrl = 'http://localhost:8080/';
    authenticateUrl = 'authenticate'
    var submit = $('#submit');
    var idEditText = $('#username');
    var pwEditText = $('#password');

    sessionStorage.clear();

    $('#auth').on('click', function(e){
        sendAjax(baseUrl+authenticateUrl, 
            {
            id:idEditText.val(), 
            pw:window.btoa(pwEditText.val())
            },
            function(data){
                Cookies.set('jwt', data.jwt);
                // Cookies.set('id', data.id);
                sessionStorage.setItem('id', data.id);
                window.location.href='/chat';
            });
        return false;
    });
    var sendAjax = function(url, data, callback){
        $.ajax({
            url:url,
            dataType:'json',
            method:'POST',
            data:data,
            success:function(data){
                callback(data);
            }
        });
    };
}

)