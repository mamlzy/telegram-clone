import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';

import { t } from './trpc.js';
import { Role } from './types.js';
import { authorizeUser } from './utils.js';

export const isAuthed = (...roles: Role[]) =>
  t.middleware(async (opts) => {
    const { token } = opts.ctx;

    console.log('RUNS', token);

    if (!token) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Token not found.',
      });
    }

    let id: string | null = null;

    try {
      const user = jwt.verify(token, process.env.NEXT_AUTH_SECRET!);
      id = (user as jwt.JwtPayload).id;
      console.log({ roles, user });
    } catch (error) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Invalid token.',
      });
    }

    if (roles.length > 0) {
      await authorizeUser(id!, roles);
    }

    return opts.next({ ...opts, ctx: { ...opts.ctx, id } });
  });
