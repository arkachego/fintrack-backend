// Libraries
import { Router } from 'express';

// Middlewares
import { validatorRouter } from '../middlewares/validate';

// Routes
import { healthRouter } from './health/route';
import { authRouter } from './auth/route';
import { userRouter } from './user/route';
import { fileRouter } from './file/route';
import { expenseRouter } from './expense/route';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use(validatorRouter);
router.use('/user', userRouter);
router.use('/file', fileRouter);
router.use('/expense', expenseRouter);

export default router;
