import { Router } from 'express';
import userRouter from './api/Routes/user.routes';
import authRouter from './api/Routes/auth.router';
import productRouter from './api/Routes/product.routes';
import orderRouter from './api/Routes/order.routes';

const appRouter = Router();
appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/products', productRouter);
appRouter.use('/orders', orderRouter);

export default appRouter;