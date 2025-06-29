// Libraries
import { Router } from 'express';

// Routes
import { healthRouter } from './health/route';
import { teamRouter } from './team/route';

const router = Router();

router.use('/health', healthRouter);
router.use('/team', teamRouter);

export default router;
