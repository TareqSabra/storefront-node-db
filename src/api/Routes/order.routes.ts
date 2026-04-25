import { Router } from 'express';
import {
  createOrderController,
  createOrderProductController,
  ordersByUserController,
  completedOrdersByUserController,
} from '../controllers/order.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const orderRouter = Router();

orderRouter.post('/order', authMiddleware, createOrderController);
orderRouter.post('/order-product', authMiddleware, createOrderProductController);
orderRouter.get('/orders/:user_id', authMiddleware, ordersByUserController);
orderRouter.get('/completed-orders/:user_id', authMiddleware, completedOrdersByUserController);

export default orderRouter;
