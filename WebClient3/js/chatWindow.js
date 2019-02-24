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
        
        //data: data,
        crossDomain:true,
        success: function (data) {
            if (data.length > 0) {
                sortMessages(data);
            }
            else {

            }
        },
        error: function (data) {

        }
    });


    sortMessages = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fromUser==fromUserName) {
                $('#messageList').append("<div class='col-12'><p class='leftMsg'>"+data[i]["mesg"]["MSG"]+"</p></div>");
            }
            else {
                $('#messageList').append("<div class='col-12'><p class='rightMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");
            }
        }
    };

});