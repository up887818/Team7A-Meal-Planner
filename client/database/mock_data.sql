--table cuisine
insert into cuisine (cuisine_id, cuisine_name) values (1, 'japanese');
insert into cuisine (cuisine_id, cuisine_name) values (2, 'indian');
insert into cuisine (cuisine_id, cuisine_name) values (3, 'mexican');
insert into cuisine (cuisine_id, cuisine_name) values (4, 'thai');
insert into cuisine (cuisine_id, cuisine_name) values (5, 'greek');
insert into cuisine (cuisine_id, cuisine_name) values (6, 'american');
insert into cuisine (cuisine_id, cuisine_name) values (7, 'british');
insert into cuisine (cuisine_id, cuisine_name) values (8, 'french');
insert into cuisine (cuisine_id, cuisine_name) values (9, 'portugese');

--table recipe
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (1, 'lobortis sapien', '0:30', 973, 40, 47, 33, 72, 96, 49);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (2, 'nec', '0:15', 316, 56, 43, 49, 63, 2, 31);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (3, 'quam sapien', '1:15', 553, 85, 79, 97, 83, 34, 63);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (4, 'libero', '1:00', 425, 39, 84, 58, 68, 61, 38);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (5, 'curae donec', '0:40', 716, 58, 94, 58, 67, 9, 40);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (6, 'amet', '0:15', 665, 2, 75, 34, 24, 14, 99);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (7, 'quam', '0:30', 482, 73, 18, 79, 16, 81, 26);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (8, 'leo rhoncus', '0:50', 225, 84, 75, 7, 25, 82, 92);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (9, 'ultrices enim', '0:25', 424, 78, 59, 30, 43, 79, 5);
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates) values (10, 'id', '0:35', 255, 39, 18, 11, 94, 97, 4);

--table allergen
insert into allergen (allergen_id, allergen_name) values (1, 'milk');
insert into allergen (allergen_id, allergen_name) values (2, 'eggs');
insert into allergen (allergen_id, allergen_name) values (3, 'fish');
insert into allergen (allergen_id, allergen_name) values (4, 'shellfish');
insert into allergen (allergen_id, allergen_name) values (5, 'nuts');
insert into allergen (allergen_id, allergen_name) values (6, 'peanuts');
insert into allergen (allergen_id, allergen_name) values (7, 'wheat');
insert into allergen (allergen_id, allergen_name) values (8, 'soya');
insert into allergen (allergen_id, allergen_name) values (9, 'mustard');
insert into allergen (allergen_id, allergen_name) values (10, 'molluscs');
insert into allergen (allergen_id, allergen_name) values (11, 'lupin');
insert into allergen (allergen_id, allergen_name) values (12, 'crustaceans');
insert into allergen (allergen_id, allergen_name) values (13, 'gluten');

--table recipe_cuisine
insert into recipe_cuisine (recipe_id, cuisine_id) values (4, 9);
insert into recipe_cuisine (recipe_id, cuisine_id) values (6, 3);
insert into recipe_cuisine (recipe_id, cuisine_id) values (3, 7);
insert into recipe_cuisine (recipe_id, cuisine_id) values (3, 4);
insert into recipe_cuisine (recipe_id, cuisine_id) values (3, 3);
insert into recipe_cuisine (recipe_id, cuisine_id) values (10, 6);
insert into recipe_cuisine (recipe_id, cuisine_id) values (7, 8);
insert into recipe_cuisine (recipe_id, cuisine_id) values (5, 5);
insert into recipe_cuisine (recipe_id, cuisine_id) values (8, 7);
insert into recipe_cuisine (recipe_id, cuisine_id) values (8, 1);

--table recipe_allergen
insert into recipe_allergen (recipe_id, allergen_id) values (4, 13);
insert into recipe_allergen (recipe_id, allergen_id) values (7, 8);
insert into recipe_allergen (recipe_id, allergen_id) values (6, 12);
insert into recipe_allergen (recipe_id, allergen_id) values (5, 3);
insert into recipe_allergen (recipe_id, allergen_id) values (2, 7);
insert into recipe_allergen (recipe_id, allergen_id) values (4, 4);
insert into recipe_allergen (recipe_id, allergen_id) values (4, 7);
insert into recipe_allergen (recipe_id, allergen_id) values (9, 4);
insert into recipe_allergen (recipe_id, allergen_id) values (7, 9);
insert into recipe_allergen (recipe_id, allergen_id) values (1, 4);

--table user
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (1, 'Hube', 'Grieve', 'hgrieve0@oracle.com', 1975, 8, 4);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (2, 'Herta', 'Tomaszynski', 'htomaszynski1@desdev.cn', 1696, 2, 8);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (3, 'Domenic', 'Yegoshin', 'dyegoshin2@google.cn', 1438, 13, 7);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (4, 'Marcy', 'Scopes', 'mscopes3@npr.org', 1002, 4, 2);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (5, 'Ansel', 'Dachs', 'adachs4@timesonline.co.uk', 1870, 10, 9);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (6, 'Gan', 'Rodell', 'grodell5@slashdot.org', 1884, 4, 9);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (7, 'Sadie', 'Corran', 'scorran6@baidu.com', 1473, 10, 9);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (8, 'Mavis', 'Todman', 'mtodman7@icq.com', 1197, 13, 4);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (9, 'Aaron', 'Ovanesian', 'aovanesian8@php.net', 1510, 8, 6);
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id) values (10, 'Consuela', 'Mourant', 'cmourant9@rambler.ru', 1330, 2, 6);

--table user_allergen
insert into user_allergen (user_id, allergen_id) values (6, 3);
insert into user_allergen (user_id, allergen_id) values (4, 3);
insert into user_allergen (user_id, allergen_id) values (7, 4);
insert into user_allergen (user_id, allergen_id) values (8, 6);
insert into user_allergen (user_id, allergen_id) values (9, 12);
insert into user_allergen (user_id, allergen_id) values (1, 12);
insert into user_allergen (user_id, allergen_id) values (1, 3);
insert into user_allergen (user_id, allergen_id) values (8, 5);
insert into user_allergen (user_id, allergen_id) values (10, 2);
insert into user_allergen (user_id, allergen_id) values (4, 9);

--table user_cuisine
insert into user_cuisine (user_id, cuisine_id) values (1, 1);
insert into user_cuisine (user_id, cuisine_id) values (7, 1);
insert into user_cuisine (user_id, cuisine_id) values (2, 6);
insert into user_cuisine (user_id, cuisine_id) values (7, 5);
insert into user_cuisine (user_id, cuisine_id) values (7, 2);
insert into user_cuisine (user_id, cuisine_id) values (6, 4);
insert into user_cuisine (user_id, cuisine_id) values (6, 9);
insert into user_cuisine (user_id, cuisine_id) values (2, 9);
insert into user_cuisine (user_id, cuisine_id) values (1, 7);
insert into user_cuisine (user_id, cuisine_id) values (9, 2);
