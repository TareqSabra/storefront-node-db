import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD || "defaultPepper";
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password + pepper, saltRounds);
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password + pepper, hash);
}