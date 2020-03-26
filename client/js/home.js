'use strict';

async function showAllRecipes(event) {
  window.location.href = "search.html";
}

async function showFavRecipes(event) {
  return "this function isn't ready yet";
}

async function showCalendar(event) {
  window.location.href = "calendar.html";
}


// button initialising
window.addEventListener("load", function() {
  const buttons = document.getElementsByTagName("button");

  buttons[0].addEventListener("click", showAllRecipes);
  buttons[1].addEventListener("click", showFavRecipes);
  buttons[2].addEventListener("click", showCalendar);
})