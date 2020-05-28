
function userLogin() {

    //elements
    var username = document.getElementById("txtUserName");
    var password = document.getElementById("txtPassword");

    //Regex Patterns
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

        //url:Specifies the URL to send the request to.
        url: "http://localhost:8082/checkForLogin",

        //A function to be run when the request succeeds
        success: function (result) {
            invalidLoginData(result);

            //If valid user goto chatApp page
            if(result == "Valid User")
            {
                window.location.href = 'http://localhost:8082/chatpage.html';  
            }
        },

        //error: A function to run if the request fails.
        error: function (a, b, c) {
            debugger;
            invalidLoginData('Error');
        },

        //type: Specifies the type of request. (GET or POST)
        type: 'post',

        //contentType: used when sending data to the server. 
        contentType: 'application/json',

        //data:Specifies data to be sent to the server
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