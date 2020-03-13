--get list of recipes for search page
select recipe_name, cooking_time, calories, cuisine_name
from recipe 
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;


--get recipe information for recipe page - CAN'T FIND A FIX FOR THIS ONE**
select recipe_name, cooking_time, calories, fat, protein, carbonhydrates, salt, sugar, fibre, cuisine
from recipe
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where recipe_id = 1;
--the id '1' should be an input

--filter by cooking time
select recipe_name, cooking_time, cuisine_name
from recipe
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id
where cooking_time ILIKE '%0:30%';

--filter by cuisine
select recipe_name, cooking_time, cuisine_name
from recipe
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id
where cuisine.cuisine_id = 1;
--the id 1 should be an input

--filter by allergen
select recipe_name, cooking_time
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2);
--ids 1 nd 2 should be inputs

--filter by calories
select recipe_name, cooking_time, calories
from recipe
where calories < '600';
--600 should be an input

--filter by protein
select recipe_name, cooking_time, protein
from recipe
where protein > '15';

--filter by sugar
select recipe_name, cooking_time, sugar
from recipe
where sugar < '25';

--filter by fat
select recipe_name, cooking_time, fat
from recipe
where fat < '30';

--filter by salt
select recipe_name, cooking_time, salt
from recipe
where salt < '15';

