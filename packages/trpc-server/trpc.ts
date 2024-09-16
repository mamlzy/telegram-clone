import { initTRPC } from '@trpc/server';

import { TRPCContext } from './context.js';
import { isAuthed } from './middleware.js';

export const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(
  isAuthed('admin', 'manager')
);
