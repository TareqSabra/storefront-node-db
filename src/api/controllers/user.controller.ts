import { Request, Response, NextFunction } from 'express';
import { getAllUsers, getUserById, createUser } from '../../Repositories/user';

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Valid id is required' });
  }
  try {
    const result = await getUserById(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, password } = req?.body || {};
  if (!first_name || !last_name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await createUser(first_name, last_name, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
