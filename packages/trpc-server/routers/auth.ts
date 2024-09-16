import { createId } from '@paralleldrive/cuid2';
import { AuthProviderType, db } from '@repo/db';
import { registerSchema } from '@repo/shared/schemas';
import { TRPCError } from '@trpc/server';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';

import { privateProcedure, publicProcedure } from '../trpc.js';

export const authRoutes = {
  users: privateProcedure.query(() => {
    return db.user.findMany();
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input: { name, email, password } }) => {
      const existingUser = await db.credentials.findUnique({
        where: {
          email,
        },
      });
      if (existingUser)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User already exists',
        });

      const salt = genSaltSync(10);
      const passwordHash = hashSync(password, salt);

      const id = createId();

      const user = await db.user.create({
        data: {
          id,
          name,
          image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
          Credentials: { create: { email, passwordHash } },
          AuthProvider: { create: { type: AuthProviderType.CREDENTIALS } },
        },
      });

      const token = jwt.sign({ id }, process.env.NEXT_AUTH_SECRET!);

      return { user, token };
    }),
};
