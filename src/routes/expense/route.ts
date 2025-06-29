// Libraries
import { Router } from 'express';

// Services
import { ExpenseService } from '../../services/ExpenseService';

// Types
import { QueryType } from '../../types/QueryType';

const expenseRouter = Router();

expenseRouter.get('/types', async (req, res) => {
  try {
    const expenseTypes = await ExpenseService.fetchExpenseTypes();
    res.status(200).send(expenseTypes);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

expenseRouter.get('/statuses', async (req, res) => {
  try {
    const expenseStatuses = await ExpenseService.fetchExpenseStatuses();
    res.status(200).send(expenseStatuses);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

// in-progress
expenseRouter.post('/count', async (req, res) => {
  try {
    const expenses = await ExpenseService.countExpenses(
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

// in-progress
expenseRouter.post('/search', async (req, res) => {
  try {
    const expenses = await ExpenseService.searchExpenses(
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

export { expenseRouter };
