'use strict';


// required
//Testing
const puppeteer = require('puppeteer');
// this is basically like headless chrome??
const ip = require('ip');
// allows to get ip address
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

async function sendQuery(query) {
  client
    .query(query)
    .then(function(res) {
      console.log(res);
      JSON.parse(res);
    })
    .catch(e => console.error(e.stack))
}

async function findAllergenID(name) {
  let query = `select allergen_id from allergen where allergen_name = ${name}`;

  return await res.json(sendQuery(query)).rows[0];
}

// account functions
async function login(req, res) {
  const userDetails = JSON.parse(sessionStorage.getItem("login_details"));
  // we don't want the user's details to be stored anywhere longer than necessary
  sessionStorage.remove("login_details");

  let query = `select user_id, password from user_login where email = ${userDetails.email}`;
  // get username and password where username = userDetails.username
  const accDetails = await res.json(sendQuery(query)).rows[0];

  if (accDetails === null or accDetails.password !== userDetails.password) {
    return false;
  } else {
    localStorage.setItem("user_id", `${accDetails.userId}`);
    return true;
  }
}

async function register(req, res) {
  const userDetails = JSON.parse(sessionStorage.getItem("login_details"));
  sessionStorage.remove("login_details");

  let query = `insert into user_login (email, password)
               values (${userDetails.email}, ${userDetails.password})`;

  await sendQuery(query);

  // need to figure out how to get error message
}

async function addAllergen(req, res) {
  let userID = localStorage.getItem("user_id");

  let allergenID = findAllergenID(`${req.allergen}`);

  let query = `insert into user_allergen values (${userID}, ${allergenID.allergen_id})`;

  await sendQuery(query);
}


// recipe functions
async function showRecipes(req, res) {
  let query = `select recipe_name, cooking_time, calories, cuisine_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;`
  return await res.json(sendQuery(query));
}

function getRecipe(req, res) {
  let query = `select recipe_name, cooking_time, calories, fat, protein, carbonhydrates, salt, sugar, fibre, cuisine, allergen_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;
  join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
  join allergen on recipe_allergen.allergen_id = allergen.allergen_id
  where recipe_id = ${req.id};`
  return await res.json(sendQuery(query));
}

function addSelectorsToQuery(selectors) {
  return concat("where ", selectors.join(" and "), ";");
}

async function filterRecipe(req, res) {
  let query = `select recipe_name, cooking_time, cuisine_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;`

  selectors = [];

  if (`${req.cookingTime}` !== "") {
    selectors = selectors.push(`cooking_time ILIKE ${req.cookingTime}`);
  }
  if (`${req.cuisine}` !== "") {
    selectors = selectors.push(`cuisine_id =  ${req.cuisine}`);
  }
  if (`${req.calories}` !== "") {
    selectors = selectors.push(`calories < ${req.calories}`);
  }
  if (`${req.allergen !== ""}`) {
    let allergenID = await findAllergenID(`${req.allergen}`);
    selectors = selectors.push(`allergen_id not in ${allergenID.allergen_id}`);
  }

  query.concat(addSelectorsToQuery(selectors));

  return await res.json(sendQuery(query));
}

// async function runTests() {
//   const browser = await puppeteer.launch();
//
//   const ipAdd = ip.address();
//   console.log(ipAdd);
//
//   try {
//     const page = await browser.newPage();
//     await page.waitFor(1000);
//
//     await page.goto(`${ipAdd}:8080/`);
//     await page.waitFor(1000);
//     //homepage, waits 1000ms to make sure its loaded
//
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     await browser.close();
//   }
//   //close browser
// }

// account functions
app.get('/auth', login);

app.get('/register', register);

// recipe functions
app.get('/recipe', getRecipe);

app.get('/filter', filterRecipe);

app.get('/showAll', showRecipes);

let server = app.listen(8080);
//open server to run tests

//runTests();

//server.close();
//turns off server after tests run