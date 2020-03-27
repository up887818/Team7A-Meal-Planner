'use strict';
import {
  errorMessage
} from "./error.js"

function redirectToSearch() {
  // checks if it is currently on the search page
  console.log((window.location.href).includes("search.html"));
  if (!(window.location.href).includes("search.html")) {
    window.location.href = "../search.html";
  } else {
    let searchResults = document.getElementById("results").childNodes.length - 1;
    if (searchResults != 0) {
      window.location.reload();
    }
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

function getAllergens(divEl) {
  let output = [];
  let options = divEl.getElementsByTagName("input");
  for (const option of options) {
    if (option.checked) {
      output.push(option.value);
    }
  }
  return output;
}

function getPreferences() {
  let prefEls = document.getElementById("filters").querySelectorAll("div");
  let preferences = {
    cuisine: prefEls[0].getElementsByTagName("select")[0].value,
    allergens: getAllergens(prefEls[1]),
    cooking_time: prefEls[2].getElementsByTagName("input")[0].value,
    calories: parseInt(prefEls[3].getElementsByTagName("input")[0].value),
    fat: parseInt(prefEls[4].getElementsByTagName("input")[0].value),
    protein: parseInt(prefEls[5].getElementsByTagName("input")[0].value),
    salt: parseInt(prefEls[6].getElementsByTagName("input")[0].value),
    sugar: parseInt(prefEls[7].getElementsByTagName("input")[0].value),
    fibre: parseInt(prefEls[8].getElementsByTagName("input")[0].value),
    carbonhydrates: parseInt(prefEls[9].getElementsByTagName("input")[0].value)
  };

  return preferences;
}

function getSearchBarValue() {
  let searchBar = document.getElementById("searchBar");
  return searchBar.value;
}

export async function showAllRecipes() {
  let response = await fetch("/showAll");

  if (response.ok) {
    let data = await response.json();
    setupHtml(data);
  } else {
    // error
    errorMessage(response.status);
  }
}

async function findMatchingRecipes() {
  return;
}

export async function search() {
  redirectToSearch();

  let preferences = getPreferences();
  let searchBarValue = getSearchBarValue();

  // default
  if (preferences == null || searchBarValue == "") {
    showAllRecipes();
  } else {
    findMatchingRecipes(preferences, searchBarValue);
  }
}

export async function searchBar(event) {
  localStorage.setItem("search_bar", event.target.value);
  search();
}

if ((window.location.href).includes("search.html")) {
  window.addEventListener("load", function() {
    let searchBar = document.getElementById("searchBar");
    searchBar.value = localStorage.getItem("search_bar");
    searchBar.addEventListener("change", searchBar);
    let prefButton = document.getElementsByName("submit")[0];
    prefButton.addEventListener("click", search);

    search();
  });
}