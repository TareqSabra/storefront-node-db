import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pepper = process.env.BCRYPT_PASSWORD || 'defaultPepper';
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
const tokenSecret = process.env.TOKEN_SECRET || 'defaultSecret';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password + pepper, saltRounds);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password + pepper, hash);
};

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, tokenSecret, { expiresIn: '1h' });
};
