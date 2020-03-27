'use strict';
import {
  search,
  searchBar
} from "./search.js"

async function showAllRecipes(event) {
  search();
}

async function showFavRecipes(event) {
  return "this function isn't ready yet";
}

async function showCalendar(event) {
  window.location.href = "calendar.html";
}

function homeSearchBar(event) {
  searchBar(event);
}

// button initialising
window.addEventListener("load", function() {
  const buttons = document.getElementsByTagName("button");

  buttons[0].addEventListener("click", showAllRecipes);
  buttons[1].addEventListener("click", showFavRecipes);
  buttons[2].addEventListener("click", showCalendar);

  let searchBar = document.getElementById("searchBar");
  searchBar.value = localStorage.getItem("search_bar");
  searchBar.addEventListener("change", homeSearchBar);
})