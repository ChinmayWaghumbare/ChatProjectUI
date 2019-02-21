$(document).ready(function () {

    $('#backBtn').click(function () {
        $(location).attr('href', 'messageList.html');
    });

    var fromUserName = sessionStorage.getItem('fromUserName');
    var toUserName = sessionStorage.getItem('userName');

    //var data = { fromUser: fromUserName, toUser: toUserName };
    //data = JSON.stringify(data);
    $.ajax({
        type:'GET',
        url: 'http://localhost:64002/api/MESSAGEMAST/getMessages?fromUser='+fromUserName+'&toUser='+toUserName,
        contentType: 'application/json',
        dataType:'text',
        //data: data,
        crossDomain:true,
        success: function (data) {

        },
        error: function (data) {

        }
    });


});