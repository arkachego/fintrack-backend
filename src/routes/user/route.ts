// Libraries
import { Router } from 'express';

// Services
import { UserService } from '../../services/UserService';

const userRouter = Router();

userRouter.get('/types', async (req, res) => {
  try {
    const userTypes = await UserService.fetchUserTypes();
    res.status(200).send(userTypes);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

userRouter.get('/list/:type_id', async (req, res) => {
  try {
    const users = await UserService.fetchUsers(req.params.type_id);
    res.status(200).send(users);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

userRouter.get('/:id/teams', async (req, res) => {
  try {
    const users = await UserService.fetchUserTeams(req.params.id);
    res.status(200).send(users[0] || null);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { userRouter };
