$(document).ready(function () {

    $('#logIn').click(function () {
        var uid = $('#userName').val();
        var pwd = $('#password').val();

        var param = {
              ID: 0,
            UID: uid,
            UPWD: pwd
        };
    

        $.ajax({
            url: 'http://localhost:64002/api/LOGINs/Login',
            type: 'POST',
            processData:false,
            contentType:'application/json',
            dataType: 'Text',
            data: JSON.stringify(param),
            crossDomain:true,
            success: function (result) {
                if (result == 1) {

                    getUserName(uid);
                    $(location).attr('href', 'messageList.html');
                }
                else {
                    alert("Error Occured");
                }
            },
            error: function (result) {
                alert(result);
            }

        });
    });

    var getUserName = function (uid) {
        $.ajax({
            url: 'http://localhost:64002/api/USERINFO/getUserInfo?uid=' + uid,
            type: 'GET',
            async: false,
            contentType: 'json',
            dataType: 'json',
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