// Libraries
import { Router } from 'express';

// Services
import { ExpenseService } from '../../services/ExpenseService';

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

// userRouter.get('/list', async (req, res) => {
//   try {
//     const users = await UserService.searchUsers();
//     res.status(200).send(users);
//   }
//   catch (error) {
//     console.error(error);
//     res.status(500).send({
//       message: 'Error',
//     });
//   }
// });

export { expenseRouter };
