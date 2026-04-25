import { Request, Response } from "express";
import { topFiveProductsByCategory, productsByCategory, createProduct, getProductById, getAllProducts } from "../../Repositories/product";

export const topFiveProductsByCategoryController = async (req: Request, res: Response) => {
    const category = req.params.category;
    try {
        const products = await topFiveProductsByCategory(category);
        res.json(products);
    } catch (error) {
        console.error(`Error fetching top five products in category ${category}:`, error);
        res.status(500).json({ error: "Could not fetch products" });
    }
};

export const productsByCategoryController = async (req: Request, res: Response) => {
    const category = req.params.category;
    try {
        const products = await productsByCategory(category);
        res.json(products);
    } catch (error) {
        console.error(`Error fetching products in category ${category}:`, error);
        res.status(500).json({ error: "Could not fetch products" });
    }
};

export const createProductController = async (req: Request, res: Response) => {
    const { name, price, category } = req.body;
    try {
        const product = await createProduct(name, price, category);
        res.json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Could not create product" });
    }
};
export const getProductByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id) || 0;
    try {
        const product = await getProductById(id);
        res.json(product);
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        res.status(500).json({ error: "Could not fetch product" });
    }
};
export const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Could not fetch products" });
    }
};