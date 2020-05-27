'use strict';

/**
 * Validate User Details
 */
function validation() {
    debugger;

    //get element
    var username = document.getElementById("txtUserName");
    var email = document.getElementById("txtEmailId");
    var password = document.getElementById("txtPassword");
    var confirmPassword = document.getElementById("txtRepeatPassword");

    //Regex Pattern
    const EMAIL_PATTERN = /^[0-9a-zA-Z]+([.+_-]?[0-9a-zA-Z]+)*([@][0-9a-zA-Z]+){1}([.][a-zA-Z]{2,3}){1,2}$/
    const USERNAME_PATTERN = /^[A-Za-z0-9_]{1,20}$/;
    const PASSWORD_PATTERN = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;

    //if element not match with pattern call myFunction 
    if (!USERNAME_PATTERN.test(username.value)) {
        myFunction("You must enter valid UserName, no special char.");
        return;
    }
    if (!EMAIL_PATTERN.test(email.value)) {
        myFunction("You must enter a valid email address.");
        return;
    }
    if (!PASSWORD_PATTERN.test(password.value)) {
        myFunction("You must enter a valid Password ");
        return;
    }
    if (password.value != confirmPassword.value) {
        myFunction("password do not match ");
        return;
    }

    //Save data to json file start
    let registrationData = { UserName: username.value, Email: email.value, Password: password.value };
    console.log(registrationData);

    $.ajax({
        url: "http://localhost:8082/saveregistration",
        success: function (result) {
            myFunction(result);
        },
        error: function (a, b, c) {
            debugger;
            myFunction('Error');
        },

        type: 'post',

        contentType: 'application/json',
        data: registrationData
    });
    //Save data to json file end

}
function myFunction(msg) {
    var x = document.getElementById("snackbar");
    x.className = "show";

    x.innerHTML = msg;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 6000);
}