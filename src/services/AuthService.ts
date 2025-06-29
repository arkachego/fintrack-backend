// Libraries
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import HttpError from "http-errors";

// Models
import { User } from "../models/User";
import { UserType } from "../models/UserType";

// Types
import { LoginType } from "../types/LoginType";
import { SessionType } from "../types/SessionType";

const APP_TOKEN_SECRET = 'app-token-secret';

const loginUser: (payload: LoginType) => Promise<string> = async (payload) => {
  const user = await User
    .query()
    .select('id', 'password')
    .where("email", payload.email)
    .withGraphFetched('[type]');
  if (!user.length) {
    throw new Error("401");
  }
  bcrypt.compareSync(payload.password, user[0].password);
  return jsonwebtoken.sign({ id: user[0].id }, APP_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const validateUser: (token: string) => Promise<SessionType> = async (token) => {
  const payload: any = jsonwebtoken.verify(token, APP_TOKEN_SECRET);
  const user = await User
    .query()
    .select('id', 'name')
    .where("id", payload.id)
    .withGraphFetched('[type]')
    .modifyGraph('type', (builder) => {
      builder
        .select('id', 'name');
    });
  if (!user.length) {
    throw HttpError(403);
  }
  return {
    id: user[0].id,
    type: user[0].type.name,
  };
};

export const AuthService = {
  loginUser,
  validateUser,
};
