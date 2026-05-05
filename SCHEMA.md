# Database Schema Documentation

This document describes the database schema for the Storefront Backend API.

## Tables

### 1. `users`
Stores user account information.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Unique identifier for the user |
| `first_name` | VARCHAR(50) | NOT NULL | User's first name |
| `last_name` | VARCHAR(50) | NOT NULL | User's last name |
| `password` | VARCHAR(255) | NOT NULL | Hashed password |

### 2. `products`
Stores product information.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Unique identifier for the product |
| `name` | VARCHAR(100) | NOT NULL | Name of the product |
| `price` | DECIMAL(10, 2) | NOT NULL | Price of the product |
| `category` | VARCHAR(50) | | Category the product belongs to |

### 3. `orders`
Stores order headers.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Unique identifier for the order |
| `user_id` | INTEGER | NOT NULL, REFERENCES `users(id)` | ID of the user who placed the order |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'active' | Status of the order ('active' or 'complete') |

### 4. `order_products`
Stores items within an order (junction table between `orders` and `products`).

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Unique identifier for the line item |
| `order_id` | INTEGER | NOT NULL, REFERENCES `orders(id)` | ID of the associated order |
| `product_id` | INTEGER | NOT NULL, REFERENCES `products(id)` | ID of the associated product |
| `quantity` | INTEGER | NOT NULL | Quantity of the product in the order |

## Relationships

- **User to Orders**: One-to-Many. A user can have multiple orders.
- **Order to Products**: Many-to-Many (via `order_products`). An order can contain many products, and a product can be part of many orders.
