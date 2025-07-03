// Libraries
import { Router } from 'express';

// Services
import { ExpenseService } from '../../services/ExpenseService';

// Types
import { QueryType } from '../../types/QueryType';
import { StatusType } from '../../types/StatusType';
import { ExpensePayloadType } from '../../types/ExpensePayloadType';

const expenseRouter = Router();

expenseRouter.post('/count', async (req, res) => {
  try {
    const expenses = await ExpenseService.countExpenses(
      res.locals.user,
      req.body as QueryType,
    );
    res.status(200).send(expenses[0]);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

expenseRouter.post('/search', async (req, res) => {
  try {
    const expenses = await ExpenseService.searchExpenses(
      res.locals.user,
      req.body as QueryType,
    );
    res.status(200).send(expenses);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

expenseRouter.post('/', async (req, res) => {
  try {
    const expense = await ExpenseService.createExpense(
      res.locals.user,
      req.body as ExpensePayloadType,
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

expenseRouter.patch('/status', async (req, res) => {
  try {
    const expense = await ExpenseService.changeStatus(
      res.locals.user,
      req.body as StatusType,
    );
    res.sendStatus(200);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

expenseRouter.post('/analytics', async (req, res) => {
  try {
    const analytics = await ExpenseService.getAnalyticsData(
      res.locals.user,
      req.body as QueryType,
    );
    res.status(200).send(analytics);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { expenseRouter };
