'use strict';
import {
  errorMessage
} from "./error.js"


// function search() {
//   let input = document.getElementById('search').value;
//   input = input.toLowerCase();
//   let x = document.getElementsByClassName('recipes'); //xxx to be replaced by list of meals... ps still working on this
//
//   for (i = 0; i < x.length; i++) {
//     if (!x[i].innerHTML.toLowerCase().includes(input)) {
//       x[i].style.display = "none";
//     } else {
//       x[i].style.display = 'recipes';
//     }
//   }
// }
// document.getElementById("search").addEventListener("keyup", function(event) {
//   if (event.key === "Enter") {
//     event.search();
//   }
// });

async function showAllRecipes() {
  let response = await fetch("/showAll");

  if (response.ok) {
    let data = await response.json();
    setupHtml(data);
  } else {
    // error
    errorMessage(response.status);
  }
}

async function setupHtml(data) {
  let section = document.querySelector("#results");
  let template = document.querySelector(".recipe");
  for (const recipe of data) {
    // grab extra data
    let jsonDataLoc = `../recipes/${recipe.recipe_id}/${recipe.recipe_id}.json`;
    let jsonData = await fetch(jsonDataLoc)
      .then(res => res.json());
    let image = `../recipes/${recipe.recipe_id}/${recipe.recipe_id}.png`;

    //cloning template & adding data
    let clone = template.content.cloneNode(true);
    console.log(clone);
    let imageEl = clone.querySelector("img");
    imageEl.src = image;

    let nameEl = clone.querySelector("h2");
    nameEl.textContent = recipe.recipe_name;

    let introEl = clone.querySelector("p")
    introEl.textContent = jsonData.intro;

    let variableEls = clone.querySelectorAll("li");

    variableEls[0].textContent = recipe.cooking_time;
    variableEls[1].textContent = recipe.calories;
    variableEls[2].textContent = recipe.cuisine;

    section.appendChild(clone);
  }
}

window.addEventListener("load", showAllRecipes());