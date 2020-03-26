'use Strict';

//display Recipe steps


async function loadPage(){
  const response = await fetch('recipe_id.json');
  const data = await response.json();

  const quizContainer = document.querySelector("#recipe");
  for (const i of data.recipes) {
    const title = document.createElement("h1");
    title.textContent = 'recipe_name';
    const section = document.createElement("section");
    section.textContent= i.intro;
    title.textContent = "Ingredients";
    const ul=document.createElement('ul');
    for(var a=0;a<i.ingredients.lenth;a++)
    {
        var li=document.createElement('li');
        li.innerHTML=i.ingredients;
        ul.appendChild(li);
    }
    div.appendChild(ul);
    title.textContent = "Steps";
    for(var a=0;a<i.steps.lenth;a++)
    {
      li.innerHTML=i.steps;
        ul.appendChild(li);
    }
    div.appendChild(ul);
    section.textContent = i.outro;
}
}



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
