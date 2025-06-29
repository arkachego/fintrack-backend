// Libraries
import { Router } from 'express';

// Services
import { UserService } from '../../services/UserService';

const userRouter = Router();

userRouter.get('/approvers', async (req, res) => {
  try {
    const users = await UserService.fetchApprovers();
    res.status(200).send(users);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

userRouter.get('/requestors', async (req, res) => {
  try {
    const users = await UserService.fetchRequestors(res.locals.user);
    res.status(200).send(users);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

userRouter.get('/teams', async (req, res) => {
  try {
    const teams = await UserService.fetchTeams(res.locals.user);
    res.status(200).send(teams);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { userRouter };
