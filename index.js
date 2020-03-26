'use strict';

//checks if the entered email and password(login details) are correct
function check() {
  const login = document.getElementById("login");
  const enterName = login.el.email.value;
  const enteredPsw = login.el.password.value;


  if (enterName == "email" && enteredPsw == "password") {

    window.open('homepage.html'); //opens the target page when email and password match
  }
  else {
    window.alert("Error Password or Username not correct"); //displays error message
  }
  login.reset();
}

document.getElementById("login").addEventListener("onclick", check);
