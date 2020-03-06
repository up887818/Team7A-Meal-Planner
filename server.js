'use strict';

const express = require('express');

const app = express();

app.use(express.static('client'));

function getRecipe(req, res) {
  return;
  //use sql query to get recipe
}

app.get('/recipe', getRecipe);

app.listen(8080);