'use strict';
import {
  errorMessage
} from "./error.js"

function redirectToSearch() {
  // checks if it is currently on the search page
  if (!(window.location.href).includes("search.html")) {
    window.location.href = "../search.html";
  } else {
    let resultsSection = document.getElementById("results");
    let searchResults = resultsSection.childNodes.length - 1;
    if (searchResults != 0) {
      // essentially this removes the previous results
      resultsSection.innerHTML = "";
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

    let recipeEl = clone.querySelector("hide");
    recipeEl.textContent = recipe.recipe_id;

    let nameEl = clone.querySelector("a");
    nameEl.textContent = recipe.recipe_name;
    nameEl.addEventListener("click", function() {
      let section = nameEl.parentElement.parentElement;
      let recipeEl = section.querySelector("hide");
      sessionStorage.setItem("recipe_id", recipeEl.textContent);
      window.location.href = "../recipepage.html";
    });

    let introEl = clone.querySelector("p");
    introEl.textContent = jsonData.intro;

    let variableEls = clone.querySelectorAll("li");

    variableEls[0].textContent = `Cooking time: ${recipe.cooking_time}`;
    variableEls[1].textContent = `Calories: ${recipe.calories}`;
    variableEls[2].textContent = `Cuisine: ${recipe.cuisine}`;

    section.appendChild(clone);
  }
}

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
    calories: parseInt(prefEls[3].getElementsByTagName("input")[0].value) || 0,
    fat: parseInt(prefEls[4].getElementsByTagName("input")[0].value) || 0,
    protein: parseInt(prefEls[5].getElementsByTagName("input")[0].value) || 0,
    salt: parseInt(prefEls[6].getElementsByTagName("input")[0].value) || 0,
    sugar: parseInt(prefEls[7].getElementsByTagName("input")[0].value) || 0,
    fibre: parseInt(prefEls[8].getElementsByTagName("input")[0].value) || 0,
    carbonhydrates: parseInt(prefEls[9].getElementsByTagName("input")[0].value) || 0
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

async function findMatchingRecipes(prefs, searchBar) {
  let url = `/filter?searchBar=${searchBar}&pref=${JSON.stringify(prefs)}`;

  let response = await fetch(url);

  if (response.ok) {
    let data = await response.json();
    setupHtml(data);
  } else {
    errorMessage(response.status);
  }

  return;
}

function checkifPrefsFilled(prefs) {
  let defPrefs = {
    cuisine: "",
    allergens: [],
    cooking_time: "",
    calories: 0,
    fat: 0,
    protein: 0,
    salt: 0,
    sugar: 0,
    fibre: 0,
    carbonhydrates: 0
  };

  //no way of comparing 2 objects, they always return false unless they are
  // in the same memory address
  if (JSON.stringify(defPrefs) === JSON.stringify(prefs)) {
    return false;
  } else {
    return true;
  }
}

export async function search() {
  let preferences = {
    cuisine: "",
    allergens: [],
    cooking_time: "",
    calories: 0,
    fat: 0,
    protein: 0,
    salt: 0,
    sugar: 0,
    fibre: 0,
    carbonhydrates: 0
  };
  let searchBarValue = "";
  if ((window.location.href).includes("search.html")) {
    preferences = getPreferences();
    searchBarValue = getSearchBarValue();
  } else {
    searchBarValue = localStorage.getItem("search_bar");
  }

  redirectToSearch();

  // default
  console.log(checkifPrefsFilled(preferences));
  if (checkifPrefsFilled(preferences) || searchBarValue != "") {
    findMatchingRecipes(preferences, searchBarValue);
  } else {
    showAllRecipes();
  }
}

export async function searchBar(event) {
  localStorage.setItem("search_bar", event.target.value);
  search();
}

function localSearchBar(event) {
  searchBar(event);
}

if ((window.location.href).includes("search.html")) {
  window.addEventListener("load", function() {
    let searchBar = document.getElementById("searchBar");
    searchBar.value = localStorage.getItem("search_bar");
    searchBar.addEventListener("change", localSearchBar);
    let prefButton = document.getElementsByName("submit")[0];
    prefButton.addEventListener("click", search);

    search();
  });
}