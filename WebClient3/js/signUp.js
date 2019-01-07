$(document).ready(function () {

    $('#signUp').click(function () {
        event.preventDefault(); 

        var uid = $('#userName').val();
        var pwd = $('#password').val();

        var param = {
            ID: 0,
            UID: uid,
            UPWD: pwd
        };


        $.ajax({
            url: 'http://localhost:64002/api/LOGINs/AddNewUser',
            type: 'POST',
            async: true,
            processData: false,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(param),
            crossDomain: true,
            success: function (result) {
                if (result == 1) {

                    getUserName(uid);
                    $(location).attr('href', 'messageList.html');
                }
                else {
                    alert("Error Occured");
                }
            },
            error: function (result, textStatus, errorThrown) {
                alert(jQuery.parseJSON(result.responseText).ExceptionMessage);
            }

        });
    });

    var getUserName = function (uid) {
        $.ajax({
            url: 'http://localhost:64002/api/USERINFO/getUserInfo?uid=' + uid,
            type: 'GET',
            processData: false,
            contentType: 'application/json',
            dataType: 'Text',
            crossDomain: true,
            success: function (result, data) {
                if (result != '') {
                    sessionStorage.setItem('userName', result);
                }
                else {
                    alert("Error Occured");
                }
            },
            error: function (result) {
                alert(result);
            }

        });
    };
    
});