'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useSession } from '@/lib/auth-client';
import { SplashScreen } from '@/components/shared/splash-screen';

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const pathname = usePathname();
  // const router = useRouter();
  // const isAuthRoutes = ['/login', '/register'].includes(pathname);

  // const { data: authCtx, error } = useSession();

  // console.log('authCtx =>', authCtx);

  //! if getting session error, redirect to login page
  // useEffect(() => {
  //   console.log('error =>', error);
  //   if (error && !isAuthRoutes) {
  //     router.replace('/login');
  //   }
  // }, [error, isAuthRoutes]);

  // if (!authCtx?.user && !isAuthRoutes) {
  //   return <SplashScreen />;
  // }

  return children;
};
