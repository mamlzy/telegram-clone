import type { LoginSchema } from '@repo/shared/schemas';

import { api } from '@/lib/axios';

const login = async (payload: LoginSchema) => {
  const { data } = await api.post('/login', payload);

  return data;
};

export const authRequest = {
  login,
};
