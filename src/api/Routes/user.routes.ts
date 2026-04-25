import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
} from '../controllers/user.controller';

const userRouter = Router();

//show
userRouter.get('/', authMiddleware, getAllUsersController);

//index
userRouter.get('/:id', authMiddleware, getUserByIdController);

//create
userRouter.post('/', authMiddleware, createUserController);

export default userRouter;
