$(document).ready(function () {

    $('#logIn').click(function () {
        var uid = $('#userName').val();
        var pwd = $('#password').val();

        var param = {
                ID: 0,
                UID: "Chinmay",
                UPWD: "1234"
        };
    

        $.ajax({
            url: 'http://localhost:64002/api/LOGINs/Login',
            type: 'POST',
            processData:false,
            contentType:'application/json',
            dataType: 'plain/text',
            data: JSON.stringify(param),
            crossDomain:true,
            success: function (result) {
                alert(result);
            },
            error: function (result) {
                alert(result);
            }

        });
    });


    

});