INSERT INTO users (first_name, last_name, password) VALUES ('Tareq', 'Admin', '$2b$10$gluRdhQ45aIucisxX3hhyeEIvUti1HW.oPXj7ZNEWL6mMopFoQuZu');
INSERT INTO users (first_name, last_name, password) VALUES ('John', 'Doe', '$2b$10$gluRdhQ45aIucisxX3hhyeEIvUti1HW.oPXj7ZNEWL6mMopFoQuZu');

INSERT INTO products (name, price, category) VALUES ('Gaming Laptop', 1200.00, 'Electronics');
INSERT INTO products (name, price, category) VALUES ('Ergonomic Chair', 250.00, 'Furniture');
INSERT INTO products (name, price, category) VALUES ('Wireless Mouse', 50.00, 'Electronics');

INSERT INTO orders (user_id, status) VALUES (1, 'active');

INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 1, 1);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 3, 2);