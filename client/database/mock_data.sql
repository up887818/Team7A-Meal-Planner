create extension if not exists pgcrypto;

--table recipe
insert into recipe (recipe_id, recipe_name, cooking_time, cuisine, calories, fat, protein, salt, sugar, fibre, carbonhydrates)
  values
  (1, 'Fish soup', '0:30', 'french', 973, 40, 47, 33, 72, 96, 49),
  (2, 'Teriyaki Salmon', '0:15', 'japanese', 316, 56, 43, 49, 63, 2, 31),
  (3, 'Lamb curry', '1:15', 'indian', 553, 85, 79, 97, 83, 34, 63),
  (4, 'Toad in a hole', '1:00', 'british', 425, 39, 84, 58, 68, 61, 38),
  (5, 'Chicken piri-piri', '0:40', 'portugese', 716, 58, 94, 58, 67, 9, 40),
  (6, 'Chickpeas and poached eggs', '0:15', 'indian', 665, 2, 75, 34, 24, 14, 99),
  (7, 'Ramen noodles', '0:30', 'japanese', 482, 73, 18, 79, 16, 81, 26),
  (8, 'Scotch eggs', '0:50', 'british', 225, 84, 75, 7, 25, 82, 92),
  (9, 'Bread fritters', '0:25', 'indian', 424, 78, 59, 30, 43, 79, 5),
  (10, 'Steak hache with pomme frites', '0:35', 'french', 255, 39, 18, 11, 94, 97, 4);

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
insert into app_user (user_id, first_name, last_name, calories)
  values
  (1, 'Hube', 'Grieve', 1975),
  (2, 'Herta', 'Tomaszynski', 1696),
  (3, 'Domenic', 'Yegoshin', 1438),
  (4, 'Marcy', 'Scopes', 1002),
  (5, 'Ansel', 'Dachs', 1870),
  (6, 'Gan', 'Rodell', 1884),
  (7, 'Sadie', 'Corran', 1473),
  (8, 'Mavis', 'Todman', 1197),
  (9, 'Aaron', 'Ovanesian', 1510),
  (10, 'Consuela', 'Mourant', 1330);

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



--table user_login

--sha256 function used for mock data only, passwords will be hashed using javascript

insert into user_login (email, password, user_id)
values
('afluger0@cornell.edu', md5('ultrices32'), 1),
('mkernley1@hud.gov', md5('atqerf4'), 2),
('koake2@purevolume.com', md5('felisef22'), 3),
('cfranken3@miitbeian.gov.cn', md5('aliquam54'), 4),
('mgallaccio4@i2i.jp', md5('ultrice45s'), 5),
('pwoodrow5@examiner.com', md5('nu8732nc'), 6),
('llayfield6@over-blog.com', md5('738aliquam'), 7),
('kiley7@virginia.edu', md5('sollicitudin190'), 8),
('gfaussett8@gravatar.com', md5('tellus1212'), 9),
('mlinebarger9@plala.or.jp', md5('ipsum021y43'), 10);
