import { db, type Prisma, type User } from '@repo/db';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@repo/shared/constants';
import {
  prismaCreatePagination,
  prismaWhereContains,
} from '@repo/shared/lib/prisma';
import { getAllUserQuerySchema } from '@repo/shared/schemas';
import type { Request, Response } from 'express';
import { z } from 'zod';

export const getAll = async (req: Request, res: Response) => {
  const { query } = z
    .object({
      query: getAllUserQuerySchema,
    })
    .parse(req);

  const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, name, email } = query;

  const offset = (page - 1) * limit;
  const where: Prisma.UserWhereInput = {
    ...prismaWhereContains<User>('name', name),
    ...prismaWhereContains<User>('email', email),
  };

  const users = await db.user.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  const totalCount = await db.user.count({
    where,
  });
  const pagination = prismaCreatePagination({
    page,
    limit,
    totalCount,
  });

  res.status(200).json({
    data: users,
    pagination,
  });
};
