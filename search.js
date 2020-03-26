function search() {
  let input = document.getElementById('search').value;
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
document.getElementById("search").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      event.search();
  }
});
