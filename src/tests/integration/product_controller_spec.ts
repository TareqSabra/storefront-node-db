import request from 'supertest';
import app from '../../server';
import client from '../../db';
import { generateToken } from '../../util';
import { createUser } from '../../Repositories/user';

describe('Product Controller Integration Test', () => {
  let token: string;
  let productId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM users;');
    connection.release();

    const user = await createUser('Prod', 'Admin', 'password');
    token = generateToken(user.id as number);
  });

  it('POST /api/products/product should create a product (auth required)', async () => {
    const response = await request(app)
      .post('/api/products/product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Controller Product',
        price: 99.99,
        category: 'Electronics'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Controller Product');
    productId = response.body.id;
  });

  it('GET /api/products/products should return all products', async () => {
    const response = await request(app).get('/api/products/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /api/products/products/:id should return a product', async () => {
    const response = await request(app).get(`/api/products/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
  });

  it('GET /api/products/products-by-category/:category should return products', async () => {
    const response = await request(app).get('/api/products/products-by-category/Electronics');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /api/products/top-five-products/:category should return products', async () => {
    const response = await request(app).get('/api/products/top-five-products/Electronics');
    expect(response.status).toBe(200);
    // Might be empty if no orders, but should be 200
  });
});
