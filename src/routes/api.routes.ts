import { Router } from 'express';
import authController from '../controllers/auth.controllers';
import userController from '../controllers/user.controllers';

const router = Router();

router.use('/auth', authController);
router.use('/user', userController);

export default router;
