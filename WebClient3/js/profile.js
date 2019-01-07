$(document).ready(function () {

    var userName = sessionStorage.getItem('userName');



    $('#userName').text(userName);


    $('#saveUserName').click(function () {
        var oldUserName = sessionStorage.getItem('userName');
        var userName = $('#newUserName').val();
        var param = {
            ID: 0,
            USER_NAME: userName,
            LOGIN: 0
        };
        $.ajax({
            url: 'http://localhost:64002/api/USERINFO/updateUserInfo?oldUserName=' + oldUserName,
                type: 'POST',
                data:JSON.stringify(param),
                crossDomain: true,
                dataType: 'json',
                contentType:'application/json',
            success: function (data) {
                if (data == '1') {
                    alert('Updated Successfully');
                    sessionStorage.setItem('userName', userName);
                }
                else {
                    alert('Error');
                }
                    $('#exampleModal').modal('toggle');
                    $(location).attr('href', 'profile.html');
                },
                error: function (result) {
                    alert(result);
                }
        })
    });

    $('#backBtn').click(function () {
        //window.history.back();
        $(location).attr('href', 'messageList.html');
    });
    
});