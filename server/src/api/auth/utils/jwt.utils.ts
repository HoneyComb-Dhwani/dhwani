import * as jwt from 'jsonwebtoken';
import { env } from 'src/config';

export const signJwt = (payload: any) => {
  return jwt.sign({ userId: payload }, env.jwtSecret, {
    expiresIn: 60 * 60 * 24,
  });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, env.jwtSecret);
};
