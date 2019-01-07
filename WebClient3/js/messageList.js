$(document).ready(function () {


    var userName = sessionStorage.getItem('userName');
    $.ajax({
        url: 'http://localhost:64002/api/MESSAGEMAST/getMessages?userName=' + userName,
        type: 'GET',
        dataType: 'json',
        contentType: 'text',
        crossDomain: true,
        success: function (data) {
            data = jQuery.parseJSON(data);
            for (var i = 0; i < data.Length; i++) {

            }
        },
        error: function (data) {

        }
    });
});