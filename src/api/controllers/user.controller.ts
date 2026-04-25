import { Request, Response } from "express";
import { getAllUsers, getUserById, createUser } from "../../Repositories/user";

export const getAllUsersController = async (req: Request, res: Response) => {
    const result = await getAllUsers();
    res.json(result);
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const result = await getUserById(parseInt(req.params.id));
    res.json(result);
}

export const createUserController = async (req: Request, res: Response) => {
    const { first_name, last_name, password } = req?.body || {};
    if (!first_name || !last_name || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await createUser(first_name, last_name, password);
    res.json(result);
}