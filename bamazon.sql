DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "sports", 199, 35),("copy paper", "office", 24.99, 35),("laptop", "electronics", 1200, 35),
("garden hose", "gardening", 12.99, 35),("BB gun", "sports", 19.99, 35),("stapler", "office", 8, 35),("hummingbird feeder", "gardening", 8.99, 35),
("pizza", "frozen foods", 4.99, 35),("ice cream", "frozen foods", 6.99, 35),("big screen TV", "electronics", 1400, 35);

SELECT * FROM products;