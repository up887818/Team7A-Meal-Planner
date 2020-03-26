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

  //checks if the entered email and password(login details) are correct
  

function check (form) {

const Entered-name = login.email;
const Entered-pwd = login.password;

login.reset();

if (form.email.value == "email" && form.password.value == "password") {
      window.open('homepage.html'); //opens the target page when email and password match 
      }

else { alert("Error Password or Username not correct"); //displays error message}


}

document.getElementById("login").addEventListener("onclick",check);

  


  function search() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName('recipes'); //xxx to be replaced by list of meals... ps still working on this

    for (i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      } else {
        x[i].style.display = 'recipes';
      }
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
    localStorage.setItem("errrCode", response.status);
    window.location.href = '../error.html';
  }
}


async function getRecipe(id) {
  let url = `/recipe?id=${id}`;

  let response = await fetch(url);

  if (response.ok) {
    console.log(response.json());
    // testing purposes only - when ready use return response.json();
  } else {
    localStorage.setItem("errrCode", response.status);
    window.location.href = '../error.html';
  }
}

async function filterRecipe(filterJson) {
  // not finished - send this json in the form of
  //{"filter" : value}
  // e.g.
  // {"calories", 600} for less than 600 calories
  let input = document.getElementById('filter').value;
  filterJson = input.toLowerCase();
  let ing = document.getElementsByClassName('ingredients'); //xxx to be replaced by list of meals... ps still working on this

  for (i = 0; i < ing.length; i++) {
    if (!ing[i].innerHTML.toLowerCase().includes(filterJson)) {
      ing[i].style.display = 'ingredients';
    } else {
      ing[i].style.display = 'none';
    }
  }

}

//add event to Calender
function addEventToCalender(){
  const addEvent = document.querySelector('#addToCalender');

}
//send login Data
async function sendLoginData(){
  let url = "/auth";
  let data = sessionStorage.setItem("login-details",'{"username":${email.value},"Password":${password.value}}');
  let response = await fetch(url, data);

  if (response.ok) {
    console.log(response.json());
    // testing purposes only - when ready use return response.json();
  } else {
    localStorage.setItem("errrCode", response.status);
    window.location.href = '../error.html';
  }
}
//send registration details to server
async function sendRegistDetails() {

    let url = "/register";
    let data = sessionStorage.setItem("login-details",'{"firstname":${firstname.value},"lastname":${lastname.value},"email":${email.value},"Password":${password.value}}');
    let response = await fetch(url, data);

    if (response.ok) {
      console.log(response.json());
      // testing purposes only - when ready use return response.json();
    } else {
      localStorage.setItem("errrCode", response.status);
      window.location.href = '../error.html';
    }

}


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
    localStorage.setItem("errrCode", response.status);
    window.location.href = '../error.html';
  }

}
