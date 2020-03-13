s--table cuisine
insert into cuisine (cuisine_id, cuisine_name)
  values
  (1, 'japanese'),
  (2, 'indian'),
  (3, 'mexican'),
  (4, 'thai'),
  (5, 'greek'),
  (6, 'american'),
  (7, 'british'),
  (8, 'french'),
  (9, 'portugese');

--table recipe
insert into recipe (recipe_id, recipe_name, cooking_time, calories, fat, protein, salt, sugar, fibre, carbonhydrates)
  values
  (1, 'lobortis sapien', '0:30', 973, 40, 47, 33, 72, 96, 49),
  (2, 'nec', '0:15', 316, 56, 43, 49, 63, 2, 31),
  (3, 'quam sapien', '1:15', 553, 85, 79, 97, 83, 34, 63),
  (4, 'libero', '1:00', 425, 39, 84, 58, 68, 61, 38),
  (5, 'curae donec', '0:40', 716, 58, 94, 58, 67, 9, 40),
  (6, 'amet', '0:15', 665, 2, 75, 34, 24, 14, 99),
  (7, 'quam', '0:30', 482, 73, 18, 79, 16, 81, 26),
  (8, 'leo rhoncus', '0:50', 225, 84, 75, 7, 25, 82, 92),
  (9, 'ultrices enim', '0:25', 424, 78, 59, 30, 43, 79, 5),
  (10, 'id', '0:35', 255, 39, 18, 11, 94, 97, 4);

--table allergen
insert into allergen (allergen_id, allergen_name)
  values
  (1, 'milk'),
  (2, 'eggs'),
  (3, 'fish'),
  (4, 'shellfish'),
  (5, 'nuts'),
  (6, 'peanuts'),
  (7, 'wheat'),
  (8, 'soya'),
  (9, 'mustard'),
  (10, 'molluscs'),
  (11, 'lupin'),
  (12, 'crustaceans'),
  (13, 'gluten');

--table recipe_cuisine
insert into recipe_cuisine (recipe_id, cuisine_id)
  values
  (4, 9),
  (6, 3),
  (3, 7),
  (3, 4),
  (3, 3),
  (10, 6),
  (7, 8),
  (5, 5),
  (8, 7),
  (8, 1);

--table recipe_allergen
insert into recipe_allergen (recipe_id, allergen_id)
  values
  (4, 13),
  (7, 8),
  (6, 12),
  (5, 3),
  (2, 7),
  (4, 4),
  (4, 7),
  (9, 4),
  (7, 9),
  (1, 4);

--table user
insert into app_user (user_id, first_name, last_name, email, calories, allergen_id, cuisine_id)
  values
  (1, 'Hube', 'Grieve', 'hgrieve0@oracle.com', 1975, 8, 4),
  (2, 'Herta', 'Tomaszynski', 'htomaszynski1@desdev.cn', 1696, 2, 8),
  (3, 'Domenic', 'Yegoshin', 'dyegoshin2@google.cn', 1438, 13, 7),
  (4, 'Marcy', 'Scopes', 'mscopes3@npr.org', 1002, 4, 2),
  (5, 'Ansel', 'Dachs', 'adachs4@timesonline.co.uk', 1870, 10, 9),
  (6, 'Gan', 'Rodell', 'grodell5@slashdot.org', 1884, 4, 9),
  (7, 'Sadie', 'Corran', 'scorran6@baidu.com', 1473, 10, 9),
  (8, 'Mavis', 'Todman', 'mtodman7@icq.com', 1197, 13, 4),
  (9, 'Aaron', 'Ovanesian', 'aovanesian8@php.net', 1510, 8, 6),
  (10, 'Consuela', 'Mourant', 'cmourant9@rambler.ru', 1330, 2, 6);

--table user_allergen
insert into user_allergen (user_id, allergen_id)
  values
  (6, 3),
  (4, 3),
  (7, 4),
  (8, 6),
  (9, 12),
  (1, 12),
  (1, 3),
  (8, 5),
  (10, 2),
  (4, 9);

--table user_cuisine
insert into user_cuisine (user_id, cuisine_id)
  values
  (1, 1),
  (7, 1),
  (2, 6),
  (7, 5),
  (7, 2),
  (6, 4),
  (6, 9),
  (2, 9),
  (1, 7),
  (9, 2);
