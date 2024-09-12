import { Cookies, verifyAccessToken } from '@/modules/auth/auth.util.js';
import { NextFunction, Request, Response } from 'express';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = verifyAccessToken(req.cookies[Cookies.ACCESS]);

    if (!token)
      return res.status(401).json({
        message: 'Unauthorized!',
      });

    // @ts-expect-error
    req.user = token;
  } catch (err: any) {
    return res.status(401).json({
      message: 'Unauthorized!',
    });
  }

  return next();
};
