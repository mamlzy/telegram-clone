'use client';

import { authRequest } from '@/requests/auth.request';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '@repo/shared/schemas';
import { useMutation } from '@tanstack/react-query';
import { SendIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { InputPassword } from '@/components/forms/rhf/input-password';
import { InputText } from '@/components/forms/rhf/input-text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export default function Page() {
  const methods = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { control, handleSubmit } = methods;

  const loginMutation = useMutation({ mutationFn: authRequest.login });

  const onSubmit = (values: LoginSchema) => {
    console.log('values =>', values);

    loginMutation.mutate(values, {
      onSuccess: () => {
        console.log('Login success');
      },
    });
  };

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

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
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

            <Button className='!mt-6 h-12 w-full text-lg'>Sign in</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
