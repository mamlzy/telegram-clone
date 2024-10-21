import type { GetAllUserQuerySchema } from '@repo/shared/schemas';
import type { Res, UserWithoutPassword } from '@repo/shared/types';

import { api } from '@/lib/axios';

const prefix = 'users';

const getAll = async (queryParams: GetAllUserQuerySchema) => {
  const { data } = await api.get<Res<UserWithoutPassword[]>>(`/${prefix}`, {
    params: queryParams,
  });

  return data.data;
};

export const userRequest = {
  getAll,
};
