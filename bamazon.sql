DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30),
department_name VARCHAR(30),
price INTEGER,
stock_quanity INTEGER,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Water", "Food and Beverage", 5, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Pepsi", "Food and Beverage", 6, 4);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("TV", "Electronics", 55, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Iphone X", "Electronics", 105, 3);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Fishing Pole", "Sporting Goods", 35, 2);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Football", "Sporting Goods", 7, 6);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Electric Guitar", "Music and Art", 95, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Guitar Strings", "Music and Art", 15, 3);

SELECT * FROM products