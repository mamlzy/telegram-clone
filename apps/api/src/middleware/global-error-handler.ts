import { Prisma } from '@repo/db';
import { NextFunction, Request, Response } from 'express';

import { config } from '@/config/index.js';

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction //! required even it's not used
) => {
  const stack = config.isProd ? '🥞' : err.stack;
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err?.message || 'Something went wrong';

  //! prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P1008':
        message = 'Operations timed out!';
        break;
      case 'P2002':
        message = 'That data is already exist!';
        break;
      case 'P2003':
        message = `Foreign key constraint failed on the field : ${
          err.meta?.field_name
        }`;
        break;
      case 'P2025':
        message = 'Data not found, please check again!';
        break;
      default:
    }

    return res.status(statusCode).json({
      prismaStatusCode: err.code,
      message,
      stack,
    });
  }

  //! rest errors
  return res.status(statusCode).json({
    message,
    stack,
  });
};
