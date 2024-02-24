import express from 'express';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               provider:
 *                 type: string
 *                 enum: [local, google, apple]
 *                 default: local
 *                 description: The authentication provider.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 5
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: user@example.com
 *                     provider:
 *                       type: string
 *                       description: The authentication provider.
 *                       example: local
 *                     providerId:
 *                       type: string
 *                       description: The unique ID from the provider, null if not applicable.
 *                       nullable: true
 *                       example: null
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInByb3ZpZGVyIjoibG9jYWwiLCJpYXQiOjE2MTgzNzQzOTUsImV4cCI6MTYxODM3Nzk5NX0.KuTi3EGtiur5Y4voy0BBV1D0G6rgzbqp1H4X45Kxc5E"
 *       400:
 *         description: Bad request. Missing required fields, or email already taken.
 */

router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user and return a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentication successful. Returns user info and a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 5
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: user@example.com
 *                     provider:
 *                       type: string
 *                       description: The authentication provider.
 *                       example: local
 *                     providerId:
 *                       type: string
 *                       description: The unique ID from the provider, null if not applicable.
 *                       nullable: true
 *                       example: null
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInByb3ZpZGVyIjoibG9jYWwiLCJpYXQiOjE2MTgzNzQzOTUsImV4cCI6MTYxODM3Nzk5NX0.KuTi3EGtiur5Y4voy0BBV1D0G6rgzbqp1H4X45Kxc5E"
 *       400:
 *         description: Bad request. Possible reasons include invalid input format, missing email or password.
 *       401:
 *         description: Unauthorized. Email or password is incorrect.
 */
router.post('/login', authController.login);

export default router;
