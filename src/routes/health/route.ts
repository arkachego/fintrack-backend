// Libraries
import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.sendStatus(200);
});

export { healthRouter };
