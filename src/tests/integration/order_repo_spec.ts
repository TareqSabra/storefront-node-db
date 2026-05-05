import { createOrder, createOrderProduct, ordersByUser, completedOrdersByUser } from '../../Repositories/order';
import { createUser } from '../../Repositories/user';
import { createProduct } from '../../Repositories/product';
import client from '../../db';

describe('Order Repository Integration Test', () => {
  let testUserId: number;
  let testProductId: number;
  let testOrderId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM orders;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM users;');
    connection.release();

    const user = await createUser('Order', 'Tester', 'password');
    testUserId = user.id as number;

    const product = await createProduct('Order Product', 50, 'test');
    testProductId = product.id as number;
  });

  it('should create an order', async () => {
    const order = await createOrder(testUserId, 'active');
    testOrderId = order.id as number;
    expect(order.user_id).toBe(testUserId);
    expect(order.status).toBe('active');
  });

  it('should add a product to an order', async () => {
    const orderProduct = await createOrderProduct(testOrderId, testProductId, 2);
    expect(orderProduct.order_id).toBe(testOrderId);
    expect(orderProduct.product_id).toBe(testProductId);
    expect(orderProduct.quantity).toBe(2);
  });

  it('should return orders by user', async () => {
    const orders = await ordersByUser(testUserId);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0].user_id).toBe(testUserId);
  });

  it('should return completed orders by user', async () => {
    await createOrder(testUserId, 'complete');
    const orders = await completedOrdersByUser(testUserId);
    expect(orders.length).toBe(1);
    expect(orders[0].status).toBe('complete');
  });
});
