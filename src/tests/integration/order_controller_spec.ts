import request from 'supertest';
import app from '../../server';
import client from '../../db';
import { generateToken } from '../../util';
import { createUser } from '../../Repositories/user';
import { createProduct } from '../../Repositories/product';

describe('Order Controller Integration Test', () => {
  let token: string;
  let userId: number;
  let productId: number;
  let orderId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM users;');
    connection.release();

    const user = await createUser('Order', 'User', 'password');
    userId = user.id as number;
    token = generateToken(userId);

    const product = await createProduct('Order Product', 10, 'test');
    productId = product.id as number;
  });

  it('POST /api/orders/order should create an order (auth required)', async () => {
    const response = await request(app)
      .post('/api/orders/order')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: userId,
        status: 'active'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe(userId);
    orderId = response.body.id;
  });

  it('POST /api/orders/order-product should add product to order (auth required)', async () => {
    const response = await request(app)
      .post('/api/orders/order-product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        order_id: orderId,
        product_id: productId,
        quantity: 5
      });
    
    expect(response.status).toBe(200);
    expect(response.body.order_id).toBe(orderId);
  });

  it('GET /api/orders/orders/:user_id should return orders (auth required)', async () => {
    const response = await request(app)
      .get(`/api/orders/orders/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /api/orders/completed-orders/:user_id should return completed orders (auth required)', async () => {
    const response = await request(app)
      .get(`/api/orders/completed-orders/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });
});
