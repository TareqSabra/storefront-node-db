import { createProduct, getAllProducts, getProductById } from '../../Repositories/product';
import client from '../../db';

describe('Product Repository Integration Test', () => {
  beforeAll(async () => {
    const connection = await client.connect();
    // Clean up tables before tests. Note: order of deletion matters due to FKs
    await connection.query('DELETE FROM order_products;');
    await connection.query('DELETE FROM products;');
    // Resetting sequences if they exist
    try {
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
    } catch (e) {
        // sequence might not exist or have different name
    }
    connection.release();
  });

  it('should create a product', async () => {
    const product = await createProduct('Test Product', 100, 'test');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(100);
  });

  it('should return a list of products', async () => {
    const products = await getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('should get product by id', async () => {
    const products = await getAllProducts();
    const productId = products[0].id;
    const product = await getProductById(productId);
    expect(product?.name).toBe('Test Product');
  });
});
