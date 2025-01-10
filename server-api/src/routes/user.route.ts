import express from 'express';
import { AuthMiddleware } from '../middlewares';
import { UserController } from '../controllers';

const router = express.Router();

// Object instance for AuthController Class..
const userController = new UserController();

/**
 * ---- Make Renew Access & Refresh Token ----
 */
//router.post('/renew-token', AuthMiddleware.verifyUser, userController.renewToken);
router.post('/renew-token', userController.renewToken);

/**
 * ---- Make Logout to the User ----
 */
router.get('/logout', userController.logoutUser);

/**
 * ---- Get User Profile ----
 */
router.get('/me', AuthMiddleware.verifyUser, userController.getMyProfile);

export default router;