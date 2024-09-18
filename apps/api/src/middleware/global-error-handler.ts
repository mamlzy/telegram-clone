import { Prisma } from '@repo/db';
import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { config } from '@/config/index.js';

export const globalErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction //! required even it's not used
) => {
  const stack = config.isProd ? '🥞' : error.stack;
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = error?.message || 'Something went wrong';

  //! prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P1008':
        message = 'Operations timed out!';
        break;
      case 'P2002':
        message = 'That data is already exist!';
        break;
      case 'P2003':
        message = `Foreign key constraint failed on the field : ${
          error.meta?.field_name
        }`;
        break;
      case 'P2025':
        message = 'Data not found, please check again!';
        break;
      default:
    }

    return res.status(statusCode).json({
      prismaStatusCode: error.code,
      message,
      stack,
    });
  }

  if (error instanceof z.ZodError) {
    const zodErrors = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));

    return res.status(400).json({
      zodErrors,
      message: 'Validation error.',
      stack,
    });
  }

  //! other errors
  return res.status(statusCode).json({
    message,
    stack,
  });
};
