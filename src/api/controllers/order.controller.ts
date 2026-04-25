import { Request, Response } from "express";
import { createOrder, createOrderProduct, ordersByUser, completedOrdersByUser } from "../../Repositories/order";

export const createOrderController = async (req: Request, res: Response) => {
    const { user_id, status } = req.body;
    try {
        const order = await createOrder(user_id, status);
        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Could not create order" });
    }
};
export const createOrderProductController = async (req: Request, res: Response) => {
    const { order_id, product_id, quantity } = req.body;
    try {
        const orderProduct = await createOrderProduct(order_id, product_id, quantity);
        res.json(orderProduct);
    } catch (error) {
        console.error("Error creating order product:", error);
        res.status(500).json({ error: "Could not create order product" });
    }
};
export const ordersByUserController = async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id) || 0;
    try {
        const orders = await ordersByUser(user_id);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders by user:", error);
        res.status(500).json({ error: "Could not fetch orders" });
    }
};
export const completedOrdersByUserController = async (req: Request, res: Response) => {
    const user_id = Number(req.params.user_id) || 0;
    try {
        const orders = await completedOrdersByUser(user_id);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching completed orders by user:", error);
        res.status(500).json({ error: "Could not fetch completed orders" });
    }
};