import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getHello: publicProcedure.query(async () => 'Hello World'),
});

export type AppRouter = typeof appRouter;
