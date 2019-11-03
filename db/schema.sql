-- New Database and Table creation

DROP DATABASE IF EXISTS jda9x20ca52drx4z;

CREATE DATABASE jda9x20ca52drx4z;

USE jda9x20ca52drx4z;

CREATE TABLE burgers
(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255),
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);