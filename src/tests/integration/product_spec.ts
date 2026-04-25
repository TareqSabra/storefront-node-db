import { createProduct, getAllProducts, getProductById } from '../../Repositories/product';
import client from '../../db';

describe('Product Repository Integration Test', () => {
  let testProductId: number;

  beforeAll(async () => {
    const connection = await client.connect();
    // Order matters due to FKs
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM products;');
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
});
