'use Strict';
import {
  md5
} from "./hash.js"
// md5 function import used to hash password import prior to fetch
// eventually will be replaced by sha256
import {
  errorMessage
} from "./error.js"

//when login button pressed
// retrieves data from html and sends to server
// (if applicable - see l21-22)
async function login(event) {
  // this stops the form from automatically submitting
  // unless the login button itself is pressed
  event.preventDefault();

  // gather form elements into a js object
  const formEl = {
    username: document.getElementsByName("email")[0],
    password: document.getElementsByName("password")[0]
  }

  // only will send to server if both fields are filled in
  // this reduces load on server
  if (formEl.username.value !== "" &&
    formEl.password.value !== "") {
    // setup data to be sent over
    let data = {
      "username": formEl.username.value,
      "password": md5(formEl.password.value)
    };

    // sends get request to server
    // server checks whether email valid, & if passwords match
    let response = await fetch(`/auth?data=${JSON.stringify(data)}`);

    if (response.ok) {
      // gets value
      let value = await response.text();
      await verifyData(value);
    } else {
      // error
      errorMessage(response.status);
    }
  }
}

// checks server output to see if login successful
function verifyData(value) {
  // login successful
  if (value == "true") {
    console.log(value);
    localStorage.setItem("user_id", value);
    window.location.href = "../homepage.html";
    //opens the target page when email and password match
  } else {
    // login unsuccessful
    window.alert("Error Password or Username not correct");
  }
}

//onload function to add functions to buttons
window.addEventListener("load", function() {
  const loginButton = document.getElementsByTagName("button")[0];
  loginButton.addEventListener("click", login);
})