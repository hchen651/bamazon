SET SQL_SAFE_UPDATES = 0;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(25),
    price DECIMAL(9, 2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES 
		("Potion", "Medicine", 300, 999), 
		("Super Potion", "Medicine", 600, 999), 
		("Hyper Potion", "Medicine", 1200, 999), 
		("Max Potion", "Medicine", 2500, 999), 
		("Full Restore", "Medicine", 3000, 999),
		("Poké Ball", "Balls", 200, 999),
        ("Great Ball", "Balls", 600, 999),
        ("Ultra Ball", "Balls", 800, 999),
        ("Escape Rope", "Tools", 550, 999),
        ("Repel", "Tools", 350, 999),
        ("Max Repel", "Tools", 700, 999)
        ;

SELECT * FROM products;
