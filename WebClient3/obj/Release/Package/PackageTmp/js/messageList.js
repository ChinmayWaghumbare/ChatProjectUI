$(document).ready(function () {

    sessionStorage.removeItem("fromUserName");
    var userName = sessionStorage.getItem('userName');
    $.ajax({
        url: 'http://localhost:64002/api/MESSAGEMAST/getMessageList?userName=' + userName,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        success: function (data) {
            //length = data.Length;
            //data = jQuery.parseJSON(data);
            for (var i = 0; i < data.length; i++) {

                $('#messageList').append("<div id='rowMsg' data='"+data[i].name+"' class='shadow p-3 mb-2 bg-white rounded col-12'><div class='col-9'>" + data[i].name + "</div><div class='col-3'>" + data[i].count + "</div></div>");

            }
        },
        error: function (data) {

        }
    });


    $(document).on('click', '#rowMsg', function () {
        user = $(this);

        console.log(user[0].attributes.data.value);
        user=user[0].attributes.data.value;
        getMessage(user);
    });
    var getMessage = function (fromUserName) {

        sessionStorage.setItem('fromUserName', fromUserName);
        $(location).attr('href', 'ChatWindow.html');
    };

});

