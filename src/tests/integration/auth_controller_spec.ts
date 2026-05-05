import request from 'supertest';
import app from '../../server';
import client from '../../db';
import { createUser } from '../../Repositories/user';

describe('Auth Controller Integration Test', () => {
  let userId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM users;');
    connection.release();

    const user = await createUser('Auth', 'User', 'password123');
    userId = user.id as number;
  });

  it('POST /api/auth/login should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        id: userId,
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('POST /api/auth/login should return 401 for invalid password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        id: userId,
        password: 'wrongpassword'
      });
    
    expect(response.status).toBe(401);
  });

  it('POST /api/auth/login should return 401 for invalid user id', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        id: 9999,
        password: 'password123'
      });
    
    expect(response.status).toBe(401);
  });
});
