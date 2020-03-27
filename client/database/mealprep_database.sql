create extension if not exists pgcrypto;

create database mealprep;

\c mealprep;


create table recipe (
    recipe_id serial primary key,
    recipe_name varchar(50) not null,
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
    calories int
);

/* link table between user table and allergen table to resolve many-to-many relationship */
create table user_allergen (
    user_id int not null,
    allergen_id int not null,
    foreign key (user_id) references app_user(user_id),
    foreign key (allergen_id) references allergen(allergen_id)
);


create table user_login (
    email varchar(50) primary key,
    password text not null,
    user_id int not null,
    foreign key (user_id) references app_user(user_id)
);

/*setting up user for server to use*/
create user serverconnect password 'team7a' superuser;
