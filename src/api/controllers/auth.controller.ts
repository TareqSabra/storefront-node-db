import { Request, Response, NextFunction } from "express";
import { getUserById } from "../../Repositories/user";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../../util";

export const authController = async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req?.body || {};
    if (!id || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const user = await getUserById(Number(id));
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        next(error);
    }
}