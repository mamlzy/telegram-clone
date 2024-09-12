import { env } from '@/config/env.js';

export const config = {
  isProd: env.NODE_ENV === 'production',
  corsOrigins:
    env.NODE_ENV === 'production'
      ? ['https://wms.neelo.id']
      : ['http://localhost:3000', 'http://localhost:3001'],
};
