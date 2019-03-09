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
                
                var updateData = {
                    mesg: {
                        SENDTIME:lastMsgSendTime
                    },
                    fromUser:fromUserName,
                    toUser:toUserName
                };
                $.ajax({
                    type: 'PUT',
                    url: 'http://localhost:64002/api/MESSAGEMAST/updateMsg',
                    data:JSON.stringify(updateData),
                    contentType:'application/json',
                    crosDomain: true,
                    success: function (data) {

                    },
                    error: function (data) {

                    }
                });
            }
            else {

            }
        },
        error: function (data) {

        }
    });


    sortMessages = function (data) {
        firstMsgSendTime = data[0]["mesg"]["SENDTIME"];
        for (var i = 0; i < data.length; i++) {
            if (data[i].fromUser==fromUserName) {
                $('#messageList').append("<div class='col-12'><p class='leftMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");
                lastMsgSendTime = data[i]["mesg"]["SENDTIME"];
            }
            else {
                $('#messageList').append("<div class='col-12'><p class='rightMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");
            }
        }
    };


    $('#loadMoreBottom').click(function () {


        $.ajax({
            type: 'GET',
            url: 'http://localhost:64002/api/MESSAGEMAST/getMessages?fromUser=' + fromUserName + '&toUser=' + toUserName,
            contentType: 'application/json',

            //data: data,
            crossDomain: true,
            success: function (data) {
                if (data.length > 0) {
                    sortMessages(data);

                    var updateData = {
                        mesg: {
                            SENDTIME: lastMsgSendTime
                        },
                        fromUser: fromUserName,
                        toUser: toUserName
                    };
                    $.ajax({
                        type: 'PUT',
                        url: 'http://localhost:64002/api/MESSAGEMAST/updateMsg',
                        data: JSON.stringify(updateData),
                        contentType: 'application/json',
                        crosDomain: true,
                        success: function (data) {

                        },
                        error: function (data) {

                        }
                    });
                }
                else {

                }
            },
            error: function (data) {

            }
        });
        
    });

    $('.sendBtn').click(function () {
        var msg = $('#msgTextField').val();
        if (msg.trim().length > 0) {
            var data = {
                fromUser: fromUserName,
                toUser: toUserName,
                mesg: {
                    MSG: msg
                }
            };
            $.ajax({
                type: 'POST',
                url: 'http://localhost:64002/api/MESSAGEMAST/addNewMessage',
                contentType: 'application/json',

                data: JSON.stringify(data),
                crossDomain: true,
                success: function (data) {

                },
                error: function (data) {

                }
            });
        }
    });
});