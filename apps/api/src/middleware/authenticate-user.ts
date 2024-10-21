import { auth } from '@repo/shared/lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { NextFunction, Request, Response } from 'express';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authContext = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!authContext)
      return res.status(401).json({
        message: 'Unauthorized!',
      });

    req.user = authContext.user;
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized!',
    });
  }

  return next();
};
