import request from 'supertest';
import app from '../../server';
import client from '../../db';

describe('User Controller Integration Test', () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM users;');
    connection.release();
  });

  it('POST /api/users should create a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        first_name: 'Controller',
        last_name: 'User',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.first_name).toBe('Controller');
    token = response.body.token;
    userId = response.body.id;
  });

  it('GET /api/users should return a list of users (auth required)', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /api/users/:id should return a user (auth required)', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  it('GET /api/users should return 401 if no token provided', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(401);
  });
});
