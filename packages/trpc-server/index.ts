import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { createTRPCContext } from './context.js';
import { appRouter } from './routers/index.js';

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
  createContext: createTRPCContext,
});
