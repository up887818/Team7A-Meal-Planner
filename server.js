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

async function sendQuery(query, output) {
  // parameter output = says what output to give output
  // all - all
  // one - one output ([0])
  // none - none
  const client = new Client({
    database: `mealprep`,
    user: `serverconnect`,
    password: `team7a`,
  });
  client.connect();
  try {
    let results = await client.query(query);
    await console.log(results);
    client.end();

    if (output === "all") {
      return results.rows;
    }
    if (output === "one") {
      return results.rows[0];
    } else {
      return;
    }
  } catch (e) {
    console.error(e.stack);
    client.end();
    return [];
  }
}

async function findAllergenID(name) {
  let query = `select allergen_id from allergen where allergen_name = ${name}`;

  return res.json(sendQuery(query)).rows[0];
}

// account functions
async function login(req, res) {
  const userDetails = JSON.parse(req.query.data);

  let query = `select user_id, password from user_login where "email" = '${userDetails.username}';`;
  // get username and password where username = userDetails.username

  let accDetails = await sendQuery(query, "one");

  res.send(accDetails.password === userDetails.password);
}

async function register(req, res) {
  const userDetails = JSON.parse(req.query.data);
  let userId = 0;

  try {
    let userIdQuery = `select user_id from app_user order by user_id desc limit 1;`;

    userId = (await sendQuery(userIdQuery, "one")).user_id + 1;

    let insertQueries = [`insert into app_user (user_id, first_name, last_name) values (${userId}, '${userDetails.firstname}', '${userDetails.lastname}') returning *;`,
      `insert into user_login (email, password, user_id) values ('${userDetails.email}', '${userDetails.password}', ${userId}) returning *;`
    ];

    await sendQuery(insertQueries[0]);
    await sendQuery(insertQueries[1]);

    res.send(true);
  } catch (e) {
    console.log(e);
    res.send(false);
  }
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