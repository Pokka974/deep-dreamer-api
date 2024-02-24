import express from 'express';
import {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from '../controllers/user.controller';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user's ID.
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *                   provider:
 *                     type: string
 *                     description: The user's provider (e.g., 'local', 'google', 'apple').
 *                   providerId:
 *                     type: string
 *                     nullable: true
 *                     description: The user's provider ID.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       500:
 *         description: Internal server error. Failed to retrieve users.
 */
router.get('/', protect, getUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                 provider:
 *                   type: string
 *                   description: The user's provider (e.g., 'local', 'google', 'apple').
 *                 providerId:
 *                   type: string
 *                   nullable: true
 *                   description: The user's provider ID.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       404:
 *         description: User not found. The specified user ID does not exist.
 *       500:
 *         description: Internal server error. Failed to retrieve the user.
 */
router.get('/:id', protect, getUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The updated email address of the user.
 *               password:
 *                 type: string
 *                 description: The updated password of the user.
 *               provider:
 *                 type: string
 *                 description: The updated provider of the user (e.g., 'local', 'google', 'apple').
 *               providerId:
 *                 type: string
 *                 description: The updated provider ID of the user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The updated user's ID.
 *                 email:
 *                   type: string
 *                   description: The updated user's email address.
 *                 provider:
 *                   type: string
 *                   description: The updated user's provider.
 *                 providerId:
 *                   type: string
 *                   description: The updated user's provider ID.
 *       400:
 *         description: Bad request. The request body is missing or invalid.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       404:
 *         description: User not found. The specified user ID does not exist.
 *       500:
 *         description: Internal server error. Failed to update the user.
 */
router.put('/:id', protect, updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       404:
 *         description: User not found. The specified user ID does not exist.
 *       500:
 *         description: Internal server error. Failed to delete the user.
 */
router.delete('/:id', protect, deleteUser);

export default router;
