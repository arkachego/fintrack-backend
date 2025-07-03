// Libraries
import { Router } from 'express';
import HttpError from "http-errors";

// Services
import { AuthService } from "../services/AuthService";

const validatorRouter = Router();

validatorRouter.use(async (req, res, next) => {
  try {
    let token = req.cookies?.['x-auth-token'] || null;
    console.log(req.headers);
    if (!token && req.headers?.['authorization']) {
      const authHeader = req.headers?.['authorization'] as string;
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw HttpError(403);
    }
    res.locals.user = await AuthService.validateUser(token);
    next();
  }
  catch (error: any) {
    const status = error.name === 'ForbiddenError' ? 403 : 500;
    if (status === 500) {
      console.error(error);
    }
    res.sendStatus(status);
  }

});

export { validatorRouter };
