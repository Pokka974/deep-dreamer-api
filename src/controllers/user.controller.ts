import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as UserService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error fetching users',
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserService.findUserById(Number(id));
        if (user) {
            res.json(user);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error fetching user',
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, provider, providerId } = req.body;
    try {
        const updatedUser = await UserService.updateUserById(
            Number(id),
            email,
            provider,
            providerId,
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error updating user',
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await UserService.deleteUserById(Number(id));
        res.status(StatusCodes.NO_CONTENT).send(
            `User with id: ${id} was deleted successfuly`,
        );
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error deleting user',
        });
    }
};
