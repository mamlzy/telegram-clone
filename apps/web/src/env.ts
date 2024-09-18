import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']),
    //! Database
    DATABASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLIENT_URL: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    //* server
    //! Database
    DATABASE_URL: process.env.DATABASE_URL,

    //* client
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

export const config = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  locales: ['en', 'id'],
};
