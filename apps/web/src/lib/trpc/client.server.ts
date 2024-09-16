import { env } from '@/env';
import { appRouter } from '@/server';
import { httpBatchLink } from '@trpc/client';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_CLIENT_URL}/api/trpc`,
    }),
  ],
});
