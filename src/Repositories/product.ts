import client from '../db';
import { Product } from '../models/types';

export const getAllProducts = async (): Promise<Product[]> => {
  const connection = await client.connect();
  try {
    const sql = 'SELECT * FROM products';
    const result = await connection.query(sql);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products');
  } finally {
    connection.release();
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const connection = await client.connect();
  try {
    const sql = 'SELECT * FROM products WHERE id = $1';
    const result = await connection.query(sql, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw new Error('Could not fetch product');
  } finally {
    connection.release();
  }
};

export const createProduct = async (
  name: string,
  price: number,
  category?: string,
): Promise<Product> => {
  const connection = await client.connect();
  try {
    const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
    const result = await connection.query(sql, [name, price, category]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Could not create product');
  } finally {
    connection.release();
  }
};

export const topFiveProductsByCategory = async (category: string): Promise<Product[]> => {
  const connection = await client.connect();
  try {
    const sql = `
      SELECT p.id, p.name, p.price, p.category
      FROM products p
      JOIN order_products op ON p.id = op.product_id
      JOIN orders o ON op.order_id = o.id
      WHERE p.category = $1
      GROUP BY p.id, p.name, p.price, p.category
      ORDER BY SUM(op.quantity) DESC
      LIMIT 5;
    `;
    const result = await connection.query(sql, [category]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching top five products in category ${category}:`, error);
    throw new Error('Could not fetch products');
  } finally {
    connection.release();
  }
};

export const productsByCategory = async (category: string): Promise<Product[]> => {
  const connection = await client.connect();
  try {
    const sql = 'SELECT * FROM products WHERE category = $1';
    const result = await connection.query(sql, [category]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw new Error('Could not fetch products');
  } finally {
    connection.release();
  }
};
