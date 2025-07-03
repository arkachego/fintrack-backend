// Libraries
import { Router } from 'express';

// Services
import { AuthService } from '../../services/AuthService';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  try {
    const token = await AuthService.loginUser(req.body);
    res.cookie("x-auth-token", token, {
      domain: process.env.AUTHORIZED_DOMAIN,
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.sendStatus(200);
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
      domain: process.env.AUTHORIZED_DOMAIN,
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
