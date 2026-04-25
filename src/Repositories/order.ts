import client from "../db";
type order = {
  id: number;
  user_id: number;
  status: string;
};
type orderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export const createOrder = async (user_id: number, status: string): Promise<order> => {
  const connection = await client.connect();
  const sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
  const result = await connection.query(sql, [user_id, status]);
  connection.release();
  return result.rows[0];
};
export const createOrderProduct = async (order_id: number, product_id: number, quantity: number): Promise<orderProduct> => {
  const connection = await client.connect();
  const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
  const result = await connection.query(sql, [order_id, product_id, quantity]);
  connection.release();
  return result.rows[0];
};
export const ordersByUser = async (user_id: number): Promise<order[]> => {
  const connection = await client.connect();
  const sql = "SELECT * FROM orders WHERE user_id = $1";
  const result = await connection.query(sql, [user_id]);
  connection.release();
  return result.rows;
};

export const completedOrdersByUser = async (user_id: number): Promise<order[]> => {
  const connection = await client.connect();
  const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'";
  const result = await connection.query(sql, [user_id]);
  connection.release();
  return result.rows;
};