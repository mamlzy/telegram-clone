import { type AppRouter } from '@repo/trpc-server/routers';
import { createTRPCReact } from '@trpc/react-query';

export const trpcClient = createTRPCReact<AppRouter>();
