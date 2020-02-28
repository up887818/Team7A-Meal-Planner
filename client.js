'use Strict'
function register(){
  var name = document.forms["register"]["Name"];
  var email = document.forms["register"]["Email"];
  var password = document.forms["register"]["Password"];

  if (name.value == "")                                  
    {
        window.alert("Please enter your name.");
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
    }
}

 function check(form){
   //checks if the entered email and password(login details) are correct
   if(form.email.value == "email" && form.password.value == "myPassword"){
     window.open('target.html');//opens the target page when email and password match
   }
   else{
     alert("Error Password or Username");//displays error message
   }
 }
 function search(){
   let input = document.getElementById('searchbar').value;
   input = input.toLowerCase();
   let x = document.getElementsByClassName('xxxx');//xxx to be replaced by list of meals... ps still working on this

   for( i =0; i< x.length; i++){
     if(!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";
        }
   }
 }
