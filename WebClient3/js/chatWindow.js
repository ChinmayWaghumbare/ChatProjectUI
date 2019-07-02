$(document).ready(function () {

    

    //SignalR 

    $.connection.hub.url = 'http://localhost:64002/signalr';
    
    var chat = $.connection.hubClass;
    
    chat.client.postToClient = function (fromUser, toUser) {
        
        var toUserName1 = fromUser;
        var fromUserName1 = toUser;

        var fromUserName = sessionStorage.getItem('fromUserName');
        var toUserName = sessionStorage.getItem('userName');

        if (fromUserName == toUserName1 && toUserName== fromUserName1) {
            lastMesgTime = lastMsgSendTime;
            $.ajax({
                type: 'GET',
                url: 'http://localhost:64002/api/MESSAGEMAST/getNextMessages?fromUser=' + fromUserName + '&toUser=' + toUserName + '&lastMesgTime=' + lastMesgTime,
                contentType: 'application/json',

                //data: JSON.stringify(data),
                crossDomain: true,
                success: function (data) {
                    if (data.length > 0) {
                        sortMessages(data, "next");
                        lastMsgSendTime = data[data.length - 1]["mesg"]["SENDTIME"];
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
        }
    };


    $.connection.hub.logging = true;
    $.connection.hub.start().done(function () {
        console.log("start");
    })
        .fail(function () {
            console.log("fail");
        });

    //SignalR End


    $('#backBtn').click(function () {
        $.connection.hub.stop();
        $(location).attr('href', 'messageList.html');
    });

     fromUserName = sessionStorage.getItem('fromUserName');
     toUserName = sessionStorage.getItem('userName');

    //var data = { fromUser: fromUserName, toUser: toUserName };
    //data = JSON.stringify(data);
    $.ajax({
        type:'GET',
        url: 'http://localhost:64002/api/MESSAGEMAST/getMessages?fromUser='+fromUserName+'&toUser='+toUserName,
        contentType: 'application/json',
        
        //data: data,
        crossDomain:true,
        success: function (data) {
            //firstMsgSendTime = getDate();//new Date().toLocaleString();  // also set time in prev message
            if (data.length > 0) {
                firstMsgSendTime = data[0]["mesg"]["SENDTIME"];
                sortMessages(data,"next");
                lastMsgSendTime = data[data.length - 1]["mesg"]["SENDTIME"];
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
                firstMsgSendTime = getDate();  //set firstMsgSendTime = CurrentDate
                lastMsgSendTime = getDate(); //set lastMsgSendTime = CurrentDate
            }
        },
        error: function (data) {

        }
    });

    function getDate() {
        var date = new Date(),
          year = date.getFullYear(),
          month = (date.getMonth() + 1).toString(),
          formatedMonth = (month.length === 1) ? ("0" + month) : month,
          day = date.getDate().toString(),
          formatedDay = (day.length === 1) ? ("0" + day) : day,
          hour = date.getHours().toString(),
          formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
          minute = date.getMinutes().toString(),
          formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
          second = date.getSeconds().toString(),
          formatedSecond = (second.length === 1) ? ("0" + second) : second;
        //return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
        return year + "-" + formatedMonth + "-" + formatedDay  + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond+".0000000";
    };

    sortMessages = function (data,pos) {
        //firstMsgSendTime = data[0]["mesg"]["SENDTIME"];
        if (pos == "next") {
            for (var i = 0; i < data.length; i++) {
                if (data[i].fromUser == fromUserName) {
                    $('#messageList').append("<div class='col-12'><p class='leftMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");

                }
                else {
                    $('#messageList').append("<div class='col-12'><p class='rightMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");
                }
            }
        }
        else if (pos == "prev") {
            for (var i = 0; i < data.length; i++) {
                if (data[i].fromUser == fromUserName) {
                    $('#messageList').prepend("<div class='col-12'><p class='leftMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");
                }
                else {
                    $('#messageList').prepend("<div class='col-12'><p class='rightMsg'>" + data[i]["mesg"]["MSG"] + "</p></div>");
                }
            }
        }
    };


    $('#loadMoreBottom').click(getNextMessage);

    

    $('.sendBtn').click(function () {
        var msg = $('#msgTextField').val();
        var flag = 0;
        if (msg.trim().length > 0) {
            var data = {
                fromUser: toUserName,// as it stores logged userName
                toUser: fromUserName,// it store other userName
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
                success: function (result) {
                    lastMsgSendTime = result;
                    $('#msgTextField').val("");
                    var data1 = [data];
                    sortMessages(data1, "next");
                },
                error: function (result) {

                }
            });
            
        }
    });

    $('#loadPrev').click(getPreviousMessage);

    
    //$('.scrollable').scroll(function () {

    //    if ($(document).height() <= $(window).height() + $(window).scrollTop() ) {

    //        alert("alert");
    //    }

    //});

  


});

var getNextMessage = function () {

    //var data = {
    //    lastMesgTime: lastMsgSendTime
    //};
    lastMesgTime = lastMsgSendTime;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:64002/api/MESSAGEMAST/getNextMessages?fromUser=' + fromUserName + '&toUser=' + toUserName + '&lastMesgTime=' + lastMesgTime,
        contentType: 'application/json',

        //data: JSON.stringify(data),
        crossDomain: true,
        success: function (data) {
            if (data.length > 0) {
                sortMessages(data, "next");
                lastMsgSendTime = data[data.length - 1]["mesg"]["SENDTIME"];
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

}

var getPreviousMessage = function () {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:64002/api/MESSAGEMAST/getPrevMessages?fromUser=' + fromUserName + '&toUser=' + toUserName + '&firstMsgSendTime=' + firstMsgSendTime,
        contentType: 'application/json',

        //data: data,
        crossDomain: true,
        success: function (data) {
            //firstMsgSendTime = getDate();//new Date().toLocaleString();  // also set time in prev message
            if (data.length > 0) {
                firstMsgSendTime = data[0]["mesg"]["SENDTIME"];
                sortMessages(data, "prev");

            }
            else {
                //set firstMsgSendTime = CurrentDate
                //set lastMsgSendTime = CurrentDate
            }
        },
        error: function (data) {

        }
    });

};