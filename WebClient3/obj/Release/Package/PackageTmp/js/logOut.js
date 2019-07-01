$(document).ready(function () {

    $("#logOut").click(function () {

        sessionStorage.clear();

        
        $(location).attr('href', 'login.html');

    });
});