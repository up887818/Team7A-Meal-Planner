'use Strict';
import {
  md5
} from "./hash.js"
import {
  errorMessage
} from "./error.js"

async function register(event) {
  event.preventDefault();
  //formEl[0] = firstname, formEl[1] = lastname... etc
  const formEl = document.getElementsByTagName("input");

  for (const el of formEl) {
    if (el.value == "") {
      window.alert(`Please enter your ${el.name}.`);
      el.focus();
      return;
    }
  }

  if (formEl[3].value != formEl[4].value) {
    window.alert("Passwords don't match");
    formEl.password2.focus();
    return;
  } else {
    let data = {
      "firstname": formEl[0].value,
      "lastname": formEl[1].value,
      "email": formEl[2].value,
      "password": md5(formEl[3].value),
    };

    let response = await fetch(`/register?data=${JSON.stringify(data)}`);
    if (response.ok) {
      let value = await response.text();
      if (value == "true") {
        window.location.href = "../index.html";
      } else {
        errorMessage(response.status);
      }
    } else {
      errorMessage(response.status);
    }
  }
}

window.addEventListener("load", function() {
  const registerButton = document.getElementsByTagName("button")[0];
  registerButton.addEventListener("click", register);
})