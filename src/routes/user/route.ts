// Libraries
import { Router } from 'express';

// Services
import { UserService } from '../../services/UserService';

const userRouter = Router();

userRouter.get('/profile', async (req, res) => {
  try {
    const profile = await UserService.fetchProfile(
      res.locals.user,
    );
    res.status(200).send(profile);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { userRouter };
