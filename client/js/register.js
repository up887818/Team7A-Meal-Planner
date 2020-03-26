'use Strict';
import {
  md5
} from "./hash.js"
import {
  errorMessage
} from "./error.js"

async function register(event) {
  event.preventDefault();
  const formEl = {
    firstname: document.getElementsByName("firstname")[0],
    lastname: document.getElementsByName("lastname")[0],
    email: document.getElementsByName("email")[0],
    password: document.getElementsByName("password")[0],
    password2: document.getElementsByName("password2")[0]
  };

  for (const el in formEl.values) {
    console.log(el);
    if (el.value == "") {
      window.alert(`Please enter your ${el.name}.`);
      el.focus();
      return;
    }
  }

  if (formEl.password.value != formEl.password2.value) {
    window.alert("Passwords don't match");
    formEl.password2.focus();
    return;
  } else {
    let data = {
      "firstname": formEl.firstname.value,
      "lastname": formEl.lastname.value,
      "email": formEl.email.value,
      "password": md5(formEl.password.value),
    };

    let response = await fetch(`/register?data=${JSON.stringify(data)}`);
    if (response.ok) {
      window.location.href = "../index.html";
    } else {
      errorMessage(response.status);
    }
  }
}

window.addEventListener("load", function() {
  const registerButton = document.getElementsByTagName("button")[0];
  registerButton.addEventListener("click", register);
})