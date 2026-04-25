import { Request, Response } from "express";
import { getUserById } from "../../Repositories/user";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../../util";

export const authController = async (req: Request, res: Response) => {
    const { id, password } = req?.body || {};
    if (!id || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await getUserById(id);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ 'token': token });
}