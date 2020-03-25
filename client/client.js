'use Strict';
import {
  Sha256
} from "../hash.js";

const formEl = {
  firstname: document.querySelector('#Firstname'),
  lastname: document.querySelector('#Lastname'),
  email: document.querySelector('#email'),
  password: document.querySelector('#Password'),
  password2: document.querySelector('#Password2')
};

async function register() {
  for (const el of formEl) {
    if (el.value == "") {
      window.alert(`Please enter your ${el.name}.`);
      el.focus();
      return;
    }
  }
  // this really needs to be put in a for loop at some point
  // if (firstname.value == "") {
  //   window.alert("Please enter your Firstname.");
  //   name.focus();
  //   return false;
  // }
  // if (lastname.value == "") {
  //   window.alert("Please enter your lastname.");
  //   name.focus();
  //   return false;
  // }
  // if (email.value == "") {
  //   window.alert("Please enter a valid email address.");
  //   email.focus();
  //   return false;
  // }
  // if (password.value == "") {
  //   window.alert("Please enter your password");
  //   password.focus();
  //   return false;
  // }
  if (formEl.password.value != formEl.password2.value) {
    window.alert("Passwords don't match");
    formEl.password2.focus();
    return;
  } else {
    let data = {
      "firstname": el.firstname.value,
      "lastname": el.lastname.value,
      "email": el.email.value,
      "password": Sha256.hash(el.password.value),
    };

    sessionStorage.setItem("register_details", JSON.stringify(data));

    let response = await fetch("/register");
    if (response.ok) {
      window.location.href = "homepage.html";
    } else {
      errorMessage(response.status;)
    }
  }
}

//checks if the entered email and password(login details) are correct
async function check(form) {
  let data = {
    "username": form.data.value,
    "password": Sha256.hash(form.password.value)
  };

  sessionStorage.setItem("login_details", JSON.stringify(data));

  let response = await fetch("/auth");
  if (response.ok) {
    verifyData(response.text());
  } else {
    errorMessage(response.status;)
  }
}

function verifyData(value) {
  if (value === "true") {
    window.location.href = "homepage.html";
    //opens the target page when email and password match
  } else {
    alert("Error Password or Username not correct"); //displays error message
  }
}

function search() {
  let input = document.getElementById('searchbar').value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName(recipes); //xxx to be replaced by list of meals... ps still working on this

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = recipes;
    }
  }
}
const recipes = database.ref('#recipes');

//displaying recipes needs work
function displayRecipes() {
  let rec = document.getElementsByClassName('recipes');
  recipe.appendChild(rec);
}

//add recipe to showCalendar
function addToCalender() {
  const buttonByRecipe = document.getElementById("addToCalender");

}
}

//display recent Recipes
//load all recipes
async function loadAllRecipes() {
  let url = "/showAll";

  let response = await fetch(url);

  if (response.ok) {
    console.log(response.json());
  } else {
    errorMessage(response.status);
  }
}


async function getRecipe(id) {
  let url = `/recipe?id=${id}`;

  let response = await fetch(url);

  if (response.ok) {
    console.log(response.json());
    // testing purposes only - when ready use return response.json();
  } else {
    errorMessage(response.status);
  }
}

async function filterRecipe(filterJson) {
  // not finished - send this json in the form of
  //{"filter" : value}
  // e.g.
  // {"calories", 600} for less than 600 calories
  return;
}

//add event to Calender

//load json info to server
async function sendData() {

  let response = await fetch('index.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(),
  });

  if (response.ok) {
    const output = response.json();
  } else {
    errorMessage(error);
  }

}

function errorMessage(error) {
  window.location.href = '../error.html';
  let errorBox = document.querySelector(".errorBox");
  errorBox.textContent = error;
}