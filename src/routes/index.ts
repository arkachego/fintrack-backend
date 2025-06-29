// Libraries
import { Router } from 'express';

// Routes
import { healthRouter } from './health/route';
import { teamRouter } from './team/route';
import { userRouter } from './user/route';
import { expenseRouter } from './expense/route';

const router = Router();

router.use('/health', healthRouter);
router.use('/team', teamRouter);
router.use('/user', userRouter);
router.use('/expense', expenseRouter);

export default router;
