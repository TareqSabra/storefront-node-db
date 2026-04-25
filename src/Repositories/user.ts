import client from '../db';
import { hashPassword } from '../util';
import { User } from '../models/types';

export const getAllUsers = async (): Promise<User[]> => {
  const connection = await client.connect();
  try {
    const sql = 'SELECT * FROM users';
    const result = await connection.query(sql);
    return result.rows;
  } finally {
    connection.release();
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const connection = await client.connect();
  try {
    const sql = 'SELECT * FROM users WHERE id = $1';
    const result = await connection.query(sql, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error('Could not fetch user');
  } finally {
    connection.release();
  }
};

export const getUserByName = async (
  first_name: string,
  last_name: string,
): Promise<User | null> => {
  const connection = await client.connect();
  try {
    const sql = 'SELECT * FROM users WHERE first_name = $1 AND last_name = $2';
    const result = await connection.query(sql, [first_name, last_name]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching user with name ${first_name} ${last_name}:`, error);
    throw new Error('Could not fetch user');
  } finally {
    connection.release();
  }
};

export const createUser = async (
  first_name: string,
  last_name: string,
  password: string,
): Promise<User> => {
  const connection = await client.connect();
  try {
    const sql =
      'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *';
    const hashedPassword = await hashPassword(password);
    const result = await connection.query(sql, [first_name, last_name, hashedPassword]);
    return result.rows[0];
  } finally {
    connection.release();
  }
};
