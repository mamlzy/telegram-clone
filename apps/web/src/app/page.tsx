// import { trpc } from '@repo/trpc-client/index';

// export default async function Page() {
//   const data = await trpc.auth.users.query();

//   return <div className='font-medium'>{JSON.stringify(data)}</div>;
// }

'use client';

import { trpcClient } from '@repo/trpc-client/client';

export default function Page() {
  const { data, isLoading } = trpcClient.auth.users.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return <div className='font-medium'>{JSON.stringify(data)}</div>;
}
