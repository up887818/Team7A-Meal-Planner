--get list of recipes for search page
select recipe_name, cooking_time, calories, cuisine_name
from recipe 
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;


--get recipe information for recipe page
select recipe_name, cooking_time, calories, fat, protein, carbonhydrates, salt, sugar, fibre, cuisine, allergen_name
from recipe
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where recipe_id = 1;
--the id '1' should be an input

--filter by cooking time
select recipe_name, cooking_time, cuisine_name
from recipe
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;
where cooking_time ILIKE '%30 mins to 1 hour%';

--filter by cuisine
select recipe_name, cooking_time, cuisine_name
from recipe
join recipe_cuisine on recipe.recipe_id = recipe_cuisine.recipe_id
join cuisine on recipe_cuisine.cuisine_id = cuisine.cuisine_id;
where cuisine_id = 1;
--the id 1 should be an input

--filter by allergen
select recipe_name, cooking_time
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id;
where allergen_id not in (1, 2);
--ids 1 nd 2 should be inputs

--filter by calories
select recipe_name, cooking_time, calories
from recipe
where calories < 600;
--600 should be an input
