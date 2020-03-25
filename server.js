'use strict';


// required
// node.js server
const express = require('express');
const app = express();
app.use(express.static('client'));

// postgres
const {
  Client
} = require('pg');
const client = new Client({
  database: `mealprep`,
  user: `serverconnect`,
  password: `team7a`,
});
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

  return res.json(sendQuery(query)).rows[0];
}

// account functions
async function login(req, res) {
  const userDetails = JSON.parse(req.query.data);

  let query = `select user_id, password from user_login where email = ${userDetails.email}`;
  // get username and password where username = userDetails.username
  const accDetails = await res.json(sendQuery(query)).rows[0];

  if (accDetails === null || accDetails.password !== userDetails.password) {
    return false;
  } else {
    localStorage.setItem("user_id", `${accDetails.userId}`);
    return true;
  }
}

async function register(req, res) {
  const userDetails = JSON.parse(req.query.data);

  let app_user_query = `insert into app_user (first_name, last_name)
              values (${userDetails.firstname}, ${userDetails.lastname})`;

  await sendQuery(app_user_query);

  let get_userId_query = `select user_id from app_user
              where first_name = ${userDetails.firstname} and last_name = ${userDetails.lastname}`;

  let userId = res.json(sendQuery(get_userId_query)).rows[0];

  let user_login_query = `insert into user_login (email, password, user_id)
               values (${userDetails.email}, ${userDetails.password}, ${userId})`;

  await sendQuery(user_login_query);

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
  return res.json(sendQuery(query));
}

function getRecipe(req, res) {
  let query = `select recipe_name, cooking_time, calories, fat, protein, carbonhydrates, salt, sugar, fibre, cuisine, allergen_name
  from recipe
  join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
  join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;
  join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
  join allergen on recipe_allergen.allergen_id = allergen.allergen_id
  where recipe_id = ${req.id};`
  return res.json(sendQuery(query));
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

  return res.json(sendQuery(query));
}

// account functions
app.get('/auth', login);

app.get('/register', register);

// recipe functions
app.get('/recipe', getRecipe);

app.get('/filter', filterRecipe);

app.get('/showAll', showRecipes);

let server = app.listen(8080);