# Storefront Backend API

This is the backend API for the Storefront application, built with Node.js, Express, and PostgreSQL. It provides endpoints for managing users, products, and orders.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Use the [Environment Variables](#environment-variables) section below as a guide.

### Database Setup

1. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```
2. Create the development and test databases:
   ```bash
   npm run db:create
   ```
3. Run migrations:
   ```bash
   npm run migrate:dev
   ```

### Running the App

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Testing**:
  ```bash
  npm run test
  ```

## Environment Variables

The following variables are required in your `.env` file:

| Variable | Description |
| :--- | :--- |
| `POSTGRES_HOST` | Database host (e.g., localhost) |
| `POSTGRES_DB` | Production database name |
| `POSTGRES_DEV_DB` | Development database name |
| `POSTGRES_TEST_DB` | Test database name |
| `POSTGRES_USER` | Database user |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_PORT` | Port for production database |
| `POSTGRES_PORT_DEV` | Port for development database |
| `POSTGRES_PORT_TEST` | Port for test database |
| `ENV` | Environment (dev, test, or prod) |
| `BCRYPT_PASSWORD` | Secret for password hashing |
| `SALT_ROUNDS` | Salt rounds for bcrypt |
| `TOKEN_SECRET` | Secret key for JWT signing |

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/auth/login` | Login user and return JWT token | No |

### Users

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/users` | Get all users | Yes |
| GET | `/users/:id` | Get a specific user by ID | Yes |
| POST | `/users` | Create a new user | Yes |

### Products

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/products/products` | Get all products | No |
| GET | `/products/products/:id` | Get a specific product by ID | No |
| POST | `/products/product` | Create a new product | Yes |
| GET | `/products/top-five-products/:category` | Get top 5 popular products by category | No |
| GET | `/products/products-by-category/:category` | Get products by category | No |

### Orders

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/orders/order` | Create a new order | Yes |
| POST | `/orders/order-product` | Add a product to an order | Yes |
| GET | `/orders/orders/:user_id` | Get active orders for a user | Yes |
| GET | `/orders/completed-orders/:user_id` | Get completed orders for a user | Yes |

## Data Models

### User
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "password": "hashed_password"
}
```

### Product
```json
{
  "id": 1,
  "name": "Widget",
  "price": 19.99,
  "category": "Gadgets"
}
```

### Order
```json
{
  "id": 1,
  "user_id": 1,
  "status": "active"
}
```

### OrderProduct
```json
{
  "id": 1,
  "order_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

## Scripts

- `npm run dev`: Start development server with nodemon.
- `npm run lint`: Run ESLint check.
- `npm run format`: Format code with Prettier.
- `npm run test`: Run Jasmine tests.
- `npm run migrate:dev`: Run migrations for development database.
