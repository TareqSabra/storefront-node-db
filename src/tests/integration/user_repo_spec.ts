import { createUser, getAllUsers, getUserById, getUserByName } from '../../Repositories/user';
import client from '../../db';

describe('User Repository Integration Test', () => {
  let testUserId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    // Order matters due to FKs
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM users;');
    connection.release();
  });

  it('should create a user', async () => {
    const user = await createUser('Test', 'User', 'password123');
    testUserId = user.id as number;
    expect(user.first_name).toBe('Test');
    expect(user.last_name).toBe('User');
    expect(user.password).toBeDefined();
    expect(user.password).not.toBe('password123'); // Should be hashed
  });

  it('should return a list of users', async () => {
    const users = await getAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should get user by id', async () => {
    const user = await getUserById(testUserId);
    expect(user?.first_name).toBe('Test');
  });

  it('should get user by name', async () => {
    const user = await getUserByName('Test', 'User');
    expect(user?.id).toBe(testUserId);
  });
});
