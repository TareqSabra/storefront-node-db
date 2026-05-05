import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../../Repositories/user';
import { verifyPassword, generateToken } from '../../util';

export const authController = async (req: Request, res: Response, next: NextFunction) => {
  const { id, password } = req?.body || {};
  if (!id || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const user = await getUserById(Number(id));
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id as number);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
