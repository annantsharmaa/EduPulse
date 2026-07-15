import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.get('/profile', authenticate, authController.getProfile);

export default router;
