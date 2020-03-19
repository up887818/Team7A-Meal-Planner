create database mealprep;

\c mealprep;


create table recipe (
    recipe_id serial primary key,
    recipe_name varchar(25) not null,
    cooking_time varchar(10),
    cuisine varchar(20),
    calories int,
    fat int,
    protein int,
    salt int,
    sugar int,
    fibre int,
    carbonhydrates int
);

create table allergen (
    allergen_id serial primary key,
    allergen_name varchar(20) not null
);


/* link table between recipe table and allergen table to resolve many-to-many relationship */
create table recipe_allergen (
    recipe_id int not null,
    allergen_id int not null,
    foreign key (recipe_id) references recipe(recipe_id),
    foreign key (allergen_id) references allergen(allergen_id)
);


create table app_user (
    user_id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50),
    email varchar(50) not null,
    calories int,
    allergen_id int,
    cuisine_id int,
    foreign key (allergen_id) references allergen(allergen_id),
    foreign key (cuisine_id) references cuisine(cuisine_id)
);

/* link table between user table and allergen table to resolve many-to-many relationship */
create table user_allergen (
    user_id int not null,
    allergen_id int not null,
    foreign key (user_id) references app_user(user_id),
    foreign key (allergen_id) references allergen(allergen_id)
);

/* link table between user table and cuisine table to resolve many-to-many relationship */
create table user_cuisine (
    user_id int not null,
    cuisine_id int not null,
    foreign key (user_id) references app_user(user_id),
    foreign key (cuisine_id) references cuisine(cuisine_id)
);
