import { COOKIE_NAMES } from '@repo/shared/constants';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import type { UserSessionJWT } from '@/types/index.js';
import { env } from '@/config/env.js';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN];

    if (!token)
      return res.status(401).json({
        message: 'Unauthorized!',
      });

    const tokenPayload = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET
    ) as UserSessionJWT;

    req.user = tokenPayload;
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized!',
    });
  }

  return next();
};
