'use client';

import { SendIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <main className='size-full bg-[#212121] text-white'>
      <div className='container flex size-full flex-col items-center justify-center sm:mx-auto sm:max-w-[420px]'>
        <div className='mb-10 flex size-40 items-center justify-center rounded-full bg-primary'>
          <SendIcon className='-mb-2 -ml-2 size-24' />
        </div>
        <h1 className='mb-2 text-center text-3xl font-medium'>
          Sign in to Telegram
        </h1>
        <p className='mb-10 text-pretty text-center text-sm text-white/60'>
          Please enter your username and password below.
        </p>

        <form className='w-full space-y-4'>
          <Input
            className='h-12 w-full border-neutral-600 text-base placeholder:text-neutral-500'
            placeholder='Username'
          />

          <Input
            className='h-12 w-full border-neutral-600 text-base placeholder:text-neutral-500'
            placeholder='Password'
          />

          <Button className='!mt-6 h-12 w-full text-lg'>Sign in</Button>
        </form>
      </div>
    </main>
  );
}
