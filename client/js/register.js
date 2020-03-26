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
    firstname: document.querySelector('#Firstname'),
    lastname: document.querySelector('#Lastname'),
    email: document.querySelector('#email'),
    password: document.querySelector('#Password'),
    password2: document.querySelector('#Password2')
  };

  for (const el of formEl) {
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
      "firstname": el.firstname.value,
      "lastname": el.lastname.value,
      "email": el.email.value,
      "password": md5(el.password.value),
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