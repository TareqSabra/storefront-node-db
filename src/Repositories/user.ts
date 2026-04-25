import client from "../db";
import dotenv from "dotenv";
import { hashPassword } from "../util";

dotenv.config();
type user = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
};

export const getAllUsers = async (): Promise<user[]> => {
  const connection = await client.connect();
  const sql = "SELECT * FROM users";
  const result = await connection.query(sql);
  connection.release();
  return result.rows;
};

export const getUserById = async (id: number): Promise<user | null> => {
  const connection = await client.connect();
  const sql = "SELECT * FROM users WHERE id = $1";
  const result = await connection.query(sql, [id]);
  connection.release();
  return result.rows[0] || null;
};

export const getUserByName = async (first_name: string, last_name: string): Promise<user | null> => {
  const connection = await client.connect();
  const sql = "SELECT * FROM users WHERE first_name = $1 AND last_name = $2";
  const result = await connection.query(sql, [first_name, last_name]);
  connection.release();
  return result.rows[0] || null;
};

export const createUser = async (
  first_name: string,
  last_name: string,
  password: string,
): Promise<user> => {
  const connection = await client.connect();
  const sql =
    "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *";
  const hashedPassword = await hashPassword(password);
  const result = await connection.query(sql, [first_name, last_name, hashedPassword]);
  connection.release();
  return result.rows[0];
};
