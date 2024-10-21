'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from '@repo/shared/schemas';
import { SendIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import { InputPassword } from '@/components/forms/rhf/input-password';
import { InputText } from '@/components/forms/rhf/input-text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export default function Page() {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(registerSchema),
  });
  const { control, handleSubmit } = form;

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async ({ name, email, password }: RegisterSchema) => {
    console.log('values =>', { name, email, password });
    await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: '/',
      },
      {
        onRequest: () => {},
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: () => {},
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <main className='size-full bg-[#212121] text-white'>
      <div className='container flex size-full flex-col items-center justify-center sm:mx-auto sm:max-w-[420px]'>
        <div className='mb-10 flex size-40 items-center justify-center rounded-full bg-primary'>
          <SendIcon className='-mb-2 -ml-2 size-24' />
        </div>
        <h1 className='mb-2 text-center text-3xl font-medium'>
          Register to Telegram
        </h1>
        <p className='mb-10 text-pretty text-center text-sm text-white/60'>
          Please enter your username and password below.
        </p>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
            <InputText
              control={control}
              name='name'
              className='h-12 w-full border-neutral-600 text-base placeholder:text-neutral-500'
              placeholder='Name'
            />

            <InputText
              control={control}
              name='email'
              className='h-12 w-full border-neutral-600 text-base placeholder:text-neutral-500'
              placeholder='Username'
            />

            <InputPassword
              control={control}
              name='password'
              className='h-12 w-full border-neutral-600 text-base placeholder:text-neutral-500'
              placeholder='Password'
            />

            <InputPassword
              control={control}
              name='passwordConfirmation'
              className='h-12 w-full border-neutral-600 text-base placeholder:text-neutral-500'
              placeholder='Password Confirmation'
            />

            <Button disabled={isPending} className='!mt-6 h-12 w-full text-lg'>
              {isPending ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
