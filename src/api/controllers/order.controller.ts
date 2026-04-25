import { Request, Response, NextFunction } from "express";
import { createOrder, createOrderProduct, ordersByUser, completedOrdersByUser } from "../../Repositories/order";

export const createOrderController = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, status } = req.body;
    if (!user_id || !status) {
        return res.status(400).json({ error: "user_id and status are required" });
    }
    try {
        const order = await createOrder(user_id, status);
        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const createOrderProductController = async (req: Request, res: Response, next: NextFunction) => {
    const { order_id, product_id, quantity } = req.body;
    if (!order_id || !product_id || !quantity) {
        return res.status(400).json({ error: "order_id, product_id, and quantity are required" });
    }
    try {
        const orderProduct = await createOrderProduct(order_id, product_id, quantity);
        res.json(orderProduct);
    } catch (error) {
        next(error);
    }
};

export const ordersByUserController = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = Number(req.params.user_id);
    if (isNaN(user_id)) {
        return res.status(400).json({ error: "Valid user_id is required" });
    }
    try {
        const orders = await ordersByUser(user_id);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const completedOrdersByUserController = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = Number(req.params.user_id);
    if (isNaN(user_id)) {
        return res.status(400).json({ error: "Valid user_id is required" });
    }
    try {
        const orders = await completedOrdersByUser(user_id);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};