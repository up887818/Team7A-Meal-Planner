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
const client = new Client();




function getRecipe(req, res) {
  return;
  //use sql query to get recipe
}

app.get('/recipe', getRecipe);

app.listen(8080);