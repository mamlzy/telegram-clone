import { Prisma } from '@repo/db';
import type { GetAllUserQuerySchema } from '@repo/shared/schemas';
import type { Res } from '@repo/shared/types';

import { api } from '@/lib/axios';

const prefix = 'users';

const getAll = async (queryParams: GetAllUserQuerySchema) => {
  const { data } = await api.get<
    Res<Prisma.UserGetPayload<{ omit: { password: true } }>[]>
  >(`/${prefix}`, { params: queryParams });

  return data.data;
};

export const userRequest = {
  getAll,
};
