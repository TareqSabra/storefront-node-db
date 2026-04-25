import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        (req as any).user = decoded;
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    next();
};