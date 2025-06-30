// Libraries
import { Router } from 'express';

// Services
import { AuthService } from '../../services/AuthService';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  try {
    const { user, type, token } = await AuthService.loginUser(req.body);
    res.cookie("x-auth-token", token, {
      domain: "localhost",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send({ user, type });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

authRouter.head('/logout', async (req, res) => {
  try {
    res.clearCookie("x-auth-token", {
      domain: "localhost",
      httpOnly: true,
      path: '/',
    });
    res.sendStatus(204);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { authRouter };
