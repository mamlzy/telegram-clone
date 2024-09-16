'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@repo/shared/schemas';
import { trpcClient } from '@repo/trpc-client/client';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  });

  if (Object.keys(errors).length > 0) {
    console.log('errors =>', errors);
  }

  const { mutateAsync } = trpcClient.auth.register.useMutation();

  const onSubmit = async (data: RegisterSchema) => {
    console.log('data =>', data);

    const { user } = await mutateAsync(data);
    console.log('user =>', user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto flex max-w-xs flex-col gap-4'
    >
      <Input {...register('name')} name='name' placeholder='name' />
      <Input {...register('email')} name='email' placeholder='email' />
      <Input
        {...register('password')}
        type='password'
        name='password'
        placeholder='password'
      />

      <Button type='submit'>Submit</Button>
    </form>
  );
}
