
function userLogin() {

    var username = document.getElementById("txtUserName");
    var password = document.getElementById("txtPassword");

    const USERNAME_PATTERN = /^[A-Za-z0-9_]{1,20}$/;
    const PASSWORD_PATTERN = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;

    //if element not match with pattern call invalidLoginData 
    if (!USERNAME_PATTERN.test(username.value)) {
        invalidLoginData("Invalid Username");
        return;
    }

    if (!PASSWORD_PATTERN.test(password.value)) {
        invalidLoginData("Invalid Password");
        return;
    }

    //Save data to json file start
    let loginData = { UserName: username.value, Password: password.value };
    console.log(loginData);

    $.ajax({
        url: "http://localhost:8082/checkForLogin",
        success: function (result) {
            invalidLoginData(result);
            if(result == "Valid User")
            {
                window.location.href = 'http://localhost:8082/chatpage.html';  
            }
        },
        error: function (a, b, c) {
            debugger;
            invalidLoginData('Error');
        },

        type: 'post',

        contentType: 'application/json',
        data: loginData
    });

    //displaying snackbar if invalid login
    function invalidLoginData(msg) {
        var x = document.getElementById("snackbar");
        x.className = "show";

        x.innerHTML = msg;
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 6000);
    }
}