'use Strict';
import {
  searchBar
} from "./search.js"
import {
  errorMessage
} from "./error.js"

//display Recipe steps

function recipeSearchBar(event) {
  searchBar(event);
}

async function loadPage() {
  let searchBar = document.getElementById("searchBar");
  localStorage.removeItem("search_bar");
  searchBar.addEventListener("change", recipeSearchBar);
  const recipeId = sessionStorage.getItem("recipe_id");

  if (recipeId == undefined) {
    errorMessage(404);
  }

  // getting data accessible without database
  let jsonDataLoc = `../recipes/${recipeId}/${recipeId}.json`;
  let jsonData = await fetch(jsonDataLoc)
    .then(res => res.json());
  let image = `../recipes/${recipeId}/${recipeId}.png`;

  // generating html from currently accessed data...
  // setting source url of image
  let imageEl = document.querySelector("#recipeImage");
  imageEl.src = image;

  let introEl = document.querySelector("#intro");
  introEl.textContent = jsonData.intro;

  let ingEl = document.querySelector("#ingList")
  for (const ing of jsonData.ingredients) {
    let li = document.createElement("li");
    ingEl.appendChild(li);
    li.textContent = ing;
  }

  let stepsEl = document.querySelector("#stepList")
  for (const step of jsonData.steps) {
    let li = document.createElement("li");
    stepsEl.appendChild(li);
    li.textContent = step;
  }

  let outroEl = document.querySelector("#outro");
  outroEl.textContent = jsonData.outro;

  // getting remaining data from database
  const response = await fetch(`/recipe?id=${recipeId}`);
  const data = await response.json();

  // finishing generating html from data
  let titleEl = document.querySelector("h1");
  titleEl.textContent = data.recipe_name;
  delete data.recipe_name;

  let nutroTable = document.querySelectorAll(".editable");
  let i = 0;
  for (const item of Object.values(data)) {
    nutroTable[i].textContent = item;
    i++;
  }
}


window.addEventListener("load", loadPage());