import client from "../db";
import { Order, OrderProduct } from "../models/types";

export const createOrder = async (user_id: number, status: string): Promise<Order> => {
  const connection = await client.connect();
  try {
    const sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
    const result = await connection.query(sql, [user_id, status]);
    return result.rows[0];
  } finally {
    connection.release();
  }
};

export const createOrderProduct = async (order_id: number, product_id: number, quantity: number): Promise<OrderProduct> => {
  const connection = await client.connect();
  try {
    const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
    const result = await connection.query(sql, [order_id, product_id, quantity]);
    return result.rows[0];
  } finally {
    connection.release();
  }
};

export const ordersByUser = async (user_id: number): Promise<Order[]> => {
  const connection = await client.connect();
  try {
    const sql = "SELECT * FROM orders WHERE user_id = $1";
    const result = await connection.query(sql, [user_id]);
    return result.rows;
  } finally {
    connection.release();
  }
};

export const completedOrdersByUser = async (user_id: number): Promise<Order[]> => {
  const connection = await client.connect();
  try {
    const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'";
    const result = await connection.query(sql, [user_id]);
    return result.rows;
  } finally {
    connection.release();
  }
};