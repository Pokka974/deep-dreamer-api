import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logError, logInfo } from '../services/logger.service';
import * as UserService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.findAllUsers();
        logInfo('Successfuly get all Users');
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        logError('Error while fetching users');
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error fetching users',
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserService.findUserById(Number(id));
        if (!user) {
            logError(`UserID: ${id} not found`);
            res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
        }

        logInfo(`Successfuly get user with ID: ${id}`);
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        logError('Error while fetching user');
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

        if (!updatedUser) {
            logError(`UserID: ${id} not found or couldn't be updated`);
            res.status(StatusCodes.NOT_FOUND).json({
                error: 'User not found or unable to be updated',
            });
        }

        logInfo(`Successfuly updated user ID: ${id}`);
        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        logError(error as string);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error updating user',
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await UserService.deleteUserById(Number(id));

        if (!deleted) {
            logError(`UserID: ${id} not found or couldn't be deleted`);
            res.status(StatusCodes.NOT_FOUND).json({
                error: 'User not found or unable to be deleted',
            });
        }
        res.status(StatusCodes.NO_CONTENT).send(
            `User with id: ${id} was deleted successfuly`,
        );
    } catch (error) {
        logError(error as string);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Error deleting user',
        });
    }
};
