'use Strict';
const el = {};

function handles() {
  el.firstname = document.querySelector('#Firstname');
  el.lastname = document.querySelector('#Lastname');
  el.email = document.querySelector('#email');
  el.password = document.querySelector('#Password');
  el.password2 = document.querySelector('#Password2');
}

function register() {
  // const firstname = document.forms["register"]["Firstame"];
  // const lastname = document.forms["register"]["Lastname"];
  // const email = document.forms["register"]["Email"];
  // const password = document.forms["register"]["Password"];
  // const password2 = document.forms["register"]["Password2"];

  if (firstname.value == "") {
    window.alert("Please enter your Firstname.");
    name.focus();
    return false;
  }
  if (lastname.value == "") {
    window.alert("Please enter your lastname.");
    name.focus();
    return false;
  }
  if (email.value == "") {
    window.alert("Please enter a valid email address.");
    email.focus();
    return false;
  }
  if (password.value == "") {
    window.alert("Please enter your password");
    password.focus();
    return false;

    if (password.value != password2.value) {
      window.alert("Passwords don't match");
      password2.focus();
      return false;
    } else {
      window.open('homepage.html');
    }
  }
}
document.getElementById("register").addEventListener("onclick",register);
