--get list of recipes for search page
--1
select recipe_name, cooking_time, calories, cuisine
from recipe;


--get recipe information for recipe page 
--get recipe name, cooking time and cuisine
--2
select recipe_name, cooking_time, cuisine
from recipe
where recipe.recipe_id = 1;

--get nutritional info
--3
select calories, fat, protein, salt, sugar, fibre, carbonhydrates
from recipe
where recipe_id = 1;

--get list of allergens for recipe
--4
select allergen_name 
from allergen
left join recipe_allergen on allergen.allergen_id = recipe_allergen.allergen_id
join recipe on recipe_allergen.recipe_id = recipe.recipe_id
where recipe.recipe_id = 1;



--filters
--filter by cooking time
--5
select recipe_name, cooking_time, cuisine
from recipe
where cooking_time LIKE '%0:30%';

--filter by cuisine
--6
select recipe_name, cooking_time, cuisine
from recipe
where cuisine = 'french'; 

--filter by allergens
--7
select recipe_name, cooking_time
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2);
--ids 1 nd 2 should be inputs

--filter by calories
--8
select recipe_name, cooking_time, calories
from recipe
where calories < '600';
--600 should be an input


--combinations of basic filters
--filter by cooking time and cuisine
--9
select recipe_name, cooking_time, cuisine, calories
from recipe
where cooking_time LIKE '%0:30%' and cuisine = 'french';

--filter by cooking time, cuisine and calories
--10
select recipe_name, cooking_time, cuisine, calories
from recipe
where cooking_time LIKE '%0:30%' and cuisine = 'french' and calories <= 600;

--filter by cuisine and calories
--11
select recipe_name, cooking_time, cuisine, calories
from recipe
where cuisine = 'french' and calories <= 600;

--filter by cooking time and calories
--12
select recipe_name, cooking_time, cuisine, calories
from recipe
where cooking_time LIKE '%0:30%' and calories <= 600;

--filter by cooking time, allergens, calories and cuisine
--13
select recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and cooking_time LIKE '%0:30%' and 
cuisine = 'french' and calories <= 600;

--filter by allergen, cooking time and cuisine
--14
select recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and cooking_time LIKE '%0:30%' and 
cuisine = 'french';

--filter by allergens, cooking time and calories
--15
select distinct recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and cooking_time LIKE '%0:30%' and 
calories <= 600;

--filter by allergens, calories and cuisine
--16
select recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and 
calories <= 600 and cuisine = 'french';

--filter by cuisine and allergens
--17
select recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and cuisine = 'french';

--filter by cooking time and allergens
--18
select distinct recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and cooking_time LIKE '%0:30%';

--filter by allergens and calories
--19
select distinct recipe_name, cooking_time, cuisine, calories
from recipe
join recipe_allergen on recipe.recipe_id = recipe_allergen.recipe_id
join allergen on recipe_allergen.allergen_id = allergen.allergen_id
where allergen.allergen_id not in (1, 2) and calories <= 600;

-------------------------------------------------------------------------------------



--other filetrs
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
