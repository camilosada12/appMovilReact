--create table `user`
--(
--    id int primary key auto_increment,
--    username varchar(100) not null unique,
--    email varchar(100) not null unique,
--    password varchar(100) not null unique,
--    createdate timestamp default current_timestamp,
--    active boolean,
--    isdeleted boolean,
--    personid int
--);

--create table person
--(
--    id int primary key auto_increment,
--    firstname varchar(100) not null,
--    lastname varchar(100) not null,
--    phonenumber varchar(20) not null unique,
--    active boolean,
--    isdeleted boolean
--);

--create table rol
--(
--    id int primary key auto_increment,
--    name varchar(100) not null,
--    description text,
--    active boolean,
--    isdeleted boolean
--);

--create table roluser
--(
--    id int primary key auto_increment,
--    rolid int ,
--    userid int unique,
--    isdeleted boolean
--);

--create table permission
--(
--    id int primary key auto_increment,
--    name varchar(100) not null,
--    description text,
--    active boolean,
--    isdeleted boolean
--);

--create table form
--(
--    id int primary key auto_increment,
--    name varchar(100) not null,
--    description text,
--    createddate timestamp default current_timestamp,
--    active boolean,
--    isdeleted boolean
--);

--create table formmodule
--(
--    id int primary key auto_increment,
--    formid int,
--    moduleid int,
--    isdeleted boolean
--);

--create table rolformpermission
--(
--    id int primary key auto_increment,
--    rolid int,
--    formid int,
--    permissionid int,
--    isdeleted boolean
--);

--create table module
--(
--    id int primary key auto_increment,
--    name varchar(100) not null,
--    description text,
--    createddate timestamp default current_timestamp,
--    active boolean,
--    isdeleted boolean
--);

---- relaciones

---- user - person
--alter table `user`
--add constraint fk_user_person
--foreign key (personid) references person(id);

---- roluser - rol - user
--alter table roluser
--add constraint fk_roluser_rol
--foreign key (rolid) references rol(id);

--alter table roluser
--add constraint fk_roluser_user
--foreign key (userid) references `user`(id);

---- formmodule - form - module
--alter table formmodule
--add constraint fk_formmodule
--foreign key (formid) references form(id);

--alter table formmodule
--add constraint fk_formmodule_module
--foreign key (moduleid) references module(id);

---- rolformpermission - rol - form - permission
--alter table rolformpermission
--add constraint fk_rolformpermission_rol
--foreign key (rolid) references rol(id);

--alter table rolformpermission
--add constraint fk_rolformpermission_form
--foreign key (formid) references form(id);

--alter table rolformpermission
--add constraint fk_rolformpermission
--foreign key (permissionid) references permission(id);
