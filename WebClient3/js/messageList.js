﻿$(document).ready(function () {

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
    

    //For new user Search for chat
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#searchNewUser").click(function () {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:64002/api/USERINFO/GetUSERINFOes',
            crossDomain: true,
            success: function (result) {
                //console.log(result);
                if (result.length > 1) {
                    result.splice(result.indexOf(userName), 1); // to remove current logged in user from searchlist
                    $("#test").find('li').remove();
                    for (var i = 0; i < result.length; i++) {
                        
                        //$('#myInput').after("<li onclick=selectedUser1('" + result[i] + "')>" + result[i] + "</li>");  // By passing value to function
                        $('#myInput').after("<li onclick=selectedUser(event)>" + result[i] + "</li>");  //By passing event as argument
                    }
                }
            },
            error: function (result) {
                alert(result);
            }
        });


    });

    
    
});

var getMessage = function (fromUserName) {

    sessionStorage.setItem('fromUserName', fromUserName);
    $(location).attr('href', 'ChatWindow.html');
};


function selectedUser(event) {
    //alert(event.target.innerText);
    //console.log(event.target.innerText);
    
    var user = event.target.innerText;
    
    getMessage(user);
};

//function selectedUser1(name) {
//    alert(name);
//    console.log(name);
//};


