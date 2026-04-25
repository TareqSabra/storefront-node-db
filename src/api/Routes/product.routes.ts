import { Router } from 'express';
import { getAllProductsController, getProductByIdController, createProductController, topFiveProductsByCategoryController, productsByCategoryController } from '../controllers/product.controller';
import { authMiddleware } from '../../middleware/auth,middlware';

const productRouter = Router();

productRouter.get('/products', getAllProductsController);
productRouter.get('/products/:id', getProductByIdController);
productRouter.post('/product', authMiddleware, createProductController);
productRouter.get('/top-five-products/:category', topFiveProductsByCategoryController);
productRouter.get('/products-by-category/:category', productsByCategoryController);

export default productRouter;
