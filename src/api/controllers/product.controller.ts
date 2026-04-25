import { Request, Response, NextFunction } from "express";
import { topFiveProductsByCategory, productsByCategory, createProduct, getProductById, getAllProducts } from "../../Repositories/product";

export const topFiveProductsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    const category = req.params.category;
    if (!category) {
        return res.status(400).json({ error: "category is required" });
    }
    try {
        const products = await topFiveProductsByCategory(category);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const productsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    const category = req.params.category;
    if (!category) {
        return res.status(400).json({ error: "category is required" });
    }
    try {
        const products = await productsByCategory(category);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, category } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: "name and price are required" });
    }
    try {
        const product = await createProduct(name, Number(price), category);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Valid id is required" });
    }
    try {
        const product = await getProductById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const getAllProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};