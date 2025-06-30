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

type ObjectType = {
  id: string;
  name: string;
};

type LoginResponse = {
  user: ObjectType;
  type: ObjectType;
  token: string;
};

const loginUser: (payload: LoginType) => Promise<LoginResponse> = async (payload) => {
  const [ profile ] = await User
    .query()
    .select('id', 'name', 'password')
    .where("email", payload.email)
    .withGraphFetched('[type]');
  if (!profile) {
    throw new Error("401");
  }
  bcrypt.compareSync(payload.password, profile.password);
  const token = jsonwebtoken.sign({ id: profile.id }, APP_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  const { type, password, ...user } = profile;
  return { user, type, token };
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
