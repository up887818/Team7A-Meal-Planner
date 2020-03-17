'use Strict';
const el = {};

function handles(){
  el.firstname = document.querySelector('#Firstname');
  el.lastname = document.querySelector('#Lastname');
  el.email = document.querySelector('#email');
  el.password = document.querySelector('#Password');
  el.password2 = document.querySelector('#Password2');
}

function register(){
  // const firstname = document.forms["register"]["Firstame"];
  // const lastname = document.forms["register"]["Lastname"];
  // const email = document.forms["register"]["Email"];
  // const password = document.forms["register"]["Password"];
  // const password2 = document.forms["register"]["Password2"];

  if (firstname.value == "")
    {
        window.alert("Please enter your Firstname.");
        name.focus();
        return false;
    }
    if (lastname.value == "")
      {
          window.alert("Please enter your lastname.");
          name.focus();
          return false;
      }
    if (email.value == "")
    {
        window.alert("Please enter a valid email address.");
        email.focus();
        return false;
    }
    if (password.value == "")
    {
        window.alert("Please enter your password");
        password.focus();
        return false;

        if (password.value != password2.value)
        {
            window.alert("Passwords don't match");
            password2.focus();
            return false;
        }
        else {
          window.open('homepage.html');
        }
}

 //checks if the entered email and password(login details) are correct
 function check(form){
   if(form.email.value == "email" && form.password.value == "password"){
     window.open('homepage.html');//opens the target page when email and password match
   }
   else{
     alert("Error Password or Username not correct");//displays error message
   }
 }
 function search(){
   let input = document.getElementById('searchbar').value;
   input = input.toLowerCase();
   let x = document.getElementsByClassName(recipes);//xxx to be replaced by list of meals... ps still working on this

   for( i =0; i< x.length; i++){
     if(!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display=recipes;
        }
   }
 }
 const recipes = database.ref('#recipes');

 //displaying recipes needs work
 function displayRecipes(){
   let rec = document.getElementsByClassName('recipes');
   recipe.appendChild(rec);
 }

 //add recipe to showCalendar
 function addToCalender(){
   const buttonByRecipe =document.getElementById("addToCalender");

 }
}

//display recent Recipes

//add event to Calender

//load json info to server
async function sendData(){

  let response = await fetch('index.html' ,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(),
  });

  if (response.ok){
    const output = response.json();
}
else{
  localStorage.setItem("errrCode", response.status);
  window.location.href = '../error.html';
}

}
