create database mealprep;

\c mealprep;

create table cuisine (
    cuisine_id serial primary key,
    cuisine_name varchar(20) not null
);

create table recipe (
    recipe_id serial primary key,
    recipe_name varchar(25) not null,
    cooking_time varchar(10),
    calories int,
    fat varchar (20),
    protein varchar (20),
    salt varchar (20),
    sugar varchar (20),
    fibre varchar (20), 
    carbonhydrates varchar(20)
);

create table allergen (
    allergen_id serial primary key,
    allergen_name varchar(20) not null
);

/* link table between recipe table and cuisine table to resolve many-to-many relationship */
create table recipe_cuisine (
    recipe_id int not null,
    cuisine_id int not null,
    foreign key (recipe_id) references recipe(recipe_id),
    foreign key (cuisine_id) references cuisine(cuisine_id)
);

/* link table between recipe table and allergen table to resolve many-to-many relationship */
create table recipe_allergen (
    recipe_id int not null,
    allergen_id int not null,
    foreign key (recipe_id) references recipe(recipe_id),
    foreign key (allergen_id) references allergen(allergen_id)
);


create table user (
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
    foreign key (user_id) references user(user_id),
    foreign key (allergen_id) references allergen(allergen_id)
);

/* link table between user table and cuisine table to resolve many-to-many relationship */
create table user_cuisine (
    user_id int not null,
    cuisine_id int not null,
    foreign key (user_id) references user(user_id),
    foreign key (cuisine_id) references cuisine(cuisine_id)
);
