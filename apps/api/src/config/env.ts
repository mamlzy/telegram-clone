import dotenv from 'dotenv';
import { parseEnv } from 'znv';
import { z } from 'zod';

dotenv.config();

export const env = parseEnv(process.env, {
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.number().default(8089),

  DATABASE_URL: z.string(),
  CLIENT_URL: z.string(),
  BASE_DOMAIN: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});
