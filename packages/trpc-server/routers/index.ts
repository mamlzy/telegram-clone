import { inferRouterOutputs } from '@trpc/server';

import { router } from '../trpc.js';
import { authRoutes } from './auth.js';

export const appRouter = router({
  auth: authRoutes,
});

export type AppRouter = typeof appRouter;
export type AppRouterType = inferRouterOutputs<AppRouter>;
