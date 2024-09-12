'use client';

import { useState } from 'react';
import { IS_DEV } from '@/constants';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            meta: {
              withDefaultErrorToast: true,
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (IS_DEV) console.log('err =>', error);

            let withDefaultErrorToast = true;

            if (typeof query.meta?.withDefaultErrorToast === 'boolean') {
              withDefaultErrorToast = query.meta.withDefaultErrorToast;
            }

            if (withDefaultErrorToast) {
              toast.error(`Error, ${error.message}`);
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={qc}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
