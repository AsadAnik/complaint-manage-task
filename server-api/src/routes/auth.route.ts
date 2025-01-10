import express from 'express';
import { validationReq } from '../middlewares';
import { AuthValidation } from '../utils/validation';
import { AuthController } from '../controllers';

const router = express.Router();

// Object instance for AuthController Class..
const authController = new AuthController();

/**
 * ---- Login User ----
 */
router.post('/login', validationReq(AuthValidation.loginUser), authController.authLogin);

/**
 * ---- Register User ----
 */
router.post('/register', validationReq(AuthValidation.registerUser), authController.authRegister);

/**
 * ---- Forgot Password ----
 */
// router.get('/forgot_password', authController.forgotPassword);

export default router;