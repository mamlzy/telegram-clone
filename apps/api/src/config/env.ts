import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(8000),

  DATABASE_URL: z.string().nonempty(),
  CLIENT_URL: z.string().nonempty(),
  BASE_DOMAIN: z.string().nonempty(),

  ACCESS_TOKEN_SECRET: z.string().nonempty(),
  REFRESH_TOKEN_SECRET: z.string().nonempty(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  console.log(`🚀🚀🚀NODE_ENV => ${process.env.NODE_ENV}`);
  process.exit(1);
}

export const env = parsedEnv.data;
