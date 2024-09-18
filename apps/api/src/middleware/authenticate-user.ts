import type { NextFunction, Request, Response } from 'express';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = null;

    if (!token)
      return res.status(401).json({
        message: 'Unauthorized!',
      });

    req.user = token;
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized!',
    });
  }

  return next();
};
