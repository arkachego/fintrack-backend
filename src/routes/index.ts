// Libraries
import { Router } from 'express';

// Middlewares
import { validatorRouter } from '../middlewares/validate';

// Routes
import { healthRouter } from './health/route';
import { authRouter } from './auth/route';
import { userRouter } from './user/route';
import { expenseRouter } from './expense/route';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use(validatorRouter);
router.use('/user', userRouter);
router.use('/expense', expenseRouter);

export default router;
