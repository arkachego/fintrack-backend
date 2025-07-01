// Libraries
import { Router } from 'express';

// Services
import { AnalyticsService } from '../../services/AnalyticsService';

// Types
import { QueryType } from '../../types/QueryType';

const analyticsRouter = Router();

analyticsRouter.post('/', async (req, res) => {
  try {
    const expense = await AnalyticsService.getAnalyticsByKey(
      res.locals.user,
      req.body as QueryType,
    );
    res.status(200).send(expense);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { analyticsRouter };
