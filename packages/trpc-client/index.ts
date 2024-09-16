import { type AppRouter } from '@repo/trpc-server/routers';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8089/trpc',
      async headers() {
        return {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzZCJ9.JlEKxknIanSYbKk9dVcVF3irMexVNpB3uJ2BcSAeiv0`,
        };
      },
    }),
  ],
});
