'use strict';


// required
//Testing
const puppeteer = require('puppeteer');
// this is basically like headless chrome??
// node.js server
const express = require('express');
const app = express();
app.use(express.static('client'));

// postgres
const {
  Client
} = require('pg');
const client = new Client();
client.connect();

function sendQuery(query) {
  client
    .query(query)
    .then(function(res) {
      console.log(res);
      JSON.parse(res);
    })
    .catch(e => console.error(e.stack))
}

function showRecipes(req, res) {
  let query = `select recipe_name, cooking_time, calories, cuisine_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;`
  res.json(sendQuery(query));
}

function getRecipe(req, res) {
  let query = `select recipe_name, cooking_time, calories, fat, protein, carbonhydrates, salt, sugar, fibre, cuisine, allergen_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;
  join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
  join allergen on recipe_allergen.allergen_id = allergen.allergen_id
  where recipe_id = ${req.id};`
  res.json(sendQuery(query));
}

function filterRecipe(req, res) {
  let query = `select recipe_name, cooking_time, cuisine_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;`

  if (`${req.cookingTime}` !== "") {
    query.concat(query, `where cooking_time ILIKE ${req.cookingTime};`);
  }
  if (`${req.cuisine}` !== "") {
    query.concat(query, `where cuisine_id = ${req.cuisine};`);
  }
  if (`${req.calories}` !== "") {
    query.concat(query, `where calories < ${req.calories};`);
  }
  if (`${req.allergen !== ""}`) {
    query.concat(query, `where allergen_id not in ${req.allergen};`);
  }

  res.json(sendQuery(query));
}

async function runTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //error catching
  page.on('requestfailed', request => {
    console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
  });
  // Catch console log errors
  page.on("pageerror", err => {
    console.log(`Page error: ${err.toString()}`);
  });
  // Catch all console messages
  page.on('console', msg => {
    console.log('Logger:', msg.type());
    console.log('Logger:', msg.text());
    console.log('Logger:', msg.location());

  });

  await page.goto('localhost:8080/');
  await page.waitFor(1000);
  //homepage, waits 1000ms to make sure its loaded

  await page.goto('localhost:8080/showAll');
  await page.waitFor(1000);
  //show all recipes

  await browser.close();
  //close browser
}

app.get('/recipe', getRecipe);

app.get('/filter', filterRecipe);

app.get('/showAll', showRecipes);

let server = app.listen(8080);
//open server to run tests

runTests();

server.close();
//turns off server after tests run