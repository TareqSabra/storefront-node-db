INSERT INTO users (first_name, last_name, password) VALUES ('Tareq', 'Admin', 'test');
INSERT INTO users (first_name, last_name, password) VALUES ('John', 'Doe', 'test');

INSERT INTO products (name, price, category) VALUES ('Gaming Laptop', 1200.00, 'Electronics');
INSERT INTO products (name, price, category) VALUES ('Ergonomic Chair', 250.00, 'Furniture');
INSERT INTO products (name, price, category) VALUES ('Wireless Mouse', 50.00, 'Electronics');

INSERT INTO orders (user_id, status) VALUES (1, 'active');

INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 1, 1);
INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 3, 2);