import {
  createProduct,
  getAllProducts,
  getProductById,
  productsByCategory,
  topFiveProductsByCategory,
} from '../../Repositories/product';
import { createUser } from '../../Repositories/user';
import { createOrder, createOrderProduct } from '../../Repositories/order';
import client from '../../db';

describe('Product Repository Integration Test', () => {
  let testProductId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    // Order matters due to FKs
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM users;');
    connection.release();
  });

  it('should create a product', async () => {
    const product = await createProduct('Test Product', 100, 'test');
    testProductId = product.id as number; // Save for subsequent tests
    expect(product.name).toBe('Test Product');
    // Price comes back as a string from PG for numeric types
    expect(Number(product.price)).toBe(100);
  });

  it('should return a list of products', async () => {
    const products = await getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('should get product by id', async () => {
    const product = await getProductById(testProductId);
    expect(product?.name).toBe('Test Product');
  });

  it('should get products by category', async () => {
    const products = await productsByCategory('test');
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].category).toBe('test');
  });

  it('should get top five products by category', async () => {
    // Setup for popularity test
    const user = await createUser('Popular', 'User', 'password');
    const order = await createOrder(user.id as number, 'active');
    await createOrderProduct(order.id as number, testProductId, 10);

    const products = await topFiveProductsByCategory('test');
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].id).toBe(testProductId);
  });
});
